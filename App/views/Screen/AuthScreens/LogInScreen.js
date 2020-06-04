import 'react-native-gesture-handler';
import  React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  Button,
} from 'react-native';
import styles from '../styles';
import MainLink from '../MainLink'



export default LogInScreen = (props) => {

  const [emailText, changeEmail] = useState("");
  const [passwordText, changePassword] = useState("");



  return (
    <>
      <View style={{ backgroundColor: 'pink', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ backgroundColor: 'pink', flex: 0.6, width: Math.round(Dimensions.get('screen').width), justifyContent: 'flex-end', alignItems: 'center' }}>
          <Text style={{ fontSize: 32, margin: 30, fontWeight: "700" }}>Welcome!</Text>
          <Text style={{ fontSize: 16, fontWeight: "100" }}>First, log into your account</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <TextInput style={styles.TextInput}
            placeholder="Email"
            autoCapitalize = 'none'
            onChangeText={text => changeEmail(text)}
            value={emailText}></TextInput>
          <TextInput style={[styles.TextInput]}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={text => changePassword(text)}
            value={passwordText}></TextInput>
          <Button title="Log in" onPress={() => {

            fetch(MainLink() + "signIn", {
              method: 'GET',
              headers: {
                email: emailText,
                password: passwordText,
              }
            })
              .then((resp) => resp.json())
              .then(json => {
                if ( json[0].userid === -1) {
                  alert("Incorrect email or password")
                }
                else {
                  console.log('Gotten user' + json[0].userid)
                  props.route.params.handler(json[0].userid)
                }
              })
              .catch((err) => {
                console.log(err);
                
              });
            }
          }></Button>
        </View>
        <View style={{ flex: 0.6, alignItems: "center", justifyContent: 'center', flexDirection: 'row', backgroundColor: 'pink', width: Math.round(Dimensions.get('screen').width) }}>
          <Text style={{ fontSize: 16 }}>Not registered yet?</Text>
          <Button title="Register" onPress={() => props.navigation.navigate("Sign Up")}></Button>
        </View>
      </View>
    </>
  )
}