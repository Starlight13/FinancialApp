import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  Button,
} from 'react-native';
import styles from '../styles';
import MainLink from '../MainLink'

export default function SignUpScreen({ navigation }) {

  const [emailText, changeEmail] = useState("");
  const [passwordText, changePassword] = useState("");
  const [usernameText, changeUsername] = useState("");
  const [emailValidation, setEmailValidation] = useState(false);
  const [passValidation, setPassValidation] = useState(false);
  const [usernameValidation, setUsernameValidation] = useState(false);

  const  validate = () => {
  }

  return (
    <>
      <View style={{ backgroundColor: 'pink', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ backgroundColor: 'pink', flex: 0.6, width: Math.round(Dimensions.get('screen').width), justifyContent: 'flex-end', alignItems: 'center' }}>
          <Text style={{ fontSize: 32, margin: 30, fontWeight: "700" }}>Sign Up!</Text>
          <Text style={{ fontSize: 16, fontWeight: "100" }}>Enter valid information to sign up</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', marginBottom: 40 }}>
          <TextInput style={styles.TextInput}
            placeholder="Email"
            autoCapitalize='none'
            onChangeText={text => {changeEmail(text)
              setEmailValidation(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailText))
            }}
            value={emailText}></TextInput>
          <TextInput style={styles.TextInput}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={text => {changePassword(text)
            setPassValidation(passwordText.length >= 8)
            }}
            value={passwordText}></TextInput>
          <TextInput style={styles.TextInput}
            placeholder="Username"
            onChangeText={text => {changeUsername(text)
              setUsernameValidation(/^[0-9a-zA-Z]+$/.test(usernameText))
            }}
            value={usernameText}></TextInput>
          <Button title="Sign up" onPress={async () => {
            if (passValidation && emailValidation && usernameValidation) {
              let data = {
                email: emailText,
                password: passwordText,
                username: usernameText
              }
              fetch(MainLink() + "ifEmailExists", {
                method: 'GET',
                headers: {
                  email: emailText,
                }
              })
                .then((resp) => resp.json())
                .then(json => {
                  if (json[0].userid === -1) {
                    console.log(JSON.stringify(data));
                    fetch(MainLink() + "signUp", {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(data)
                    })
                      .then(() => alert(`Sign up successful!\nWelcome, ${usernameText}!`))
                      .then(() => navigation.navigate("Log In"))
                      .catch((err) => {
                        console.log(err);

                      });
                  }
                  else {
                    alert('User with this email already exists')
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }
            else {
              alert(!emailValidation ? 'Enter a valid email' :
                !passValidation ? 'Password should be at least 8 symbols long' : 'Username should only contain letters and numbers')
            }
          }}></Button>
      </View>
      <View style={{ flex: 0.6, alignItems: "center", justifyContent: 'center', flexDirection: 'row', backgroundColor: 'pink', width: Math.round(Dimensions.get('screen').width) }}>
        <Text style={{ fontSize: 16 }}>Already registered?</Text>
        <Button title="Log in" onPress={() => navigation.navigate("Log In")}></Button>
      </View>
    </View>
    </>
  )
}