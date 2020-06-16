import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  Dimensions
} from 'react-native';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MainLink from './MainLink';

const SCREEN_WIDTH = Math.round(Dimensions.get('screen').width);



export default function AccountScreen(props) {

  const [userInfo, setUserInfo] = useState([{}]);

  const [hideUsernameChange, setHideUsernameChange] = useState(true);
  const [hidePasswordChange, setPasswordChange] = useState(true);

  const [changedUsername, setUsername] = useState('');
  const [changedPassword, setPassword] = useState('');

  const [passValidation, setPassValidation] = useState(false);
  const [usernameValidation, setUsernameValidation] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    console.log(props.route.params.userId);
    const response = await fetch(MainLink() + 'getUserInfo', {
      method: 'GET',
      headers: {
        user: props.route.params.userId,
      }
    });
    setUserInfo(await response.json());
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.SafeAreaView}>
        <View style={{ flexDirection: 'row', backgroundColor: 'white', height: 90 }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <FontAwesome5 name="qq" size={40} color='#ffb0b3' />
          </View>
          <View style={{ justifyContent: 'center', flex: 2, alignItems: 'flex-start' }} >
            <Text style={styles.TextMoney}>@{userInfo[0].username}</Text>
            <Text style={{ fontWeight: "700", color: 'grey', marginVertical: 3 }}>{userInfo[0].email}</Text>
            <Text style={{ fontWeight: "400", color: 'grey', marginVertical: 3 }}>User id: {userInfo[0].userid}</Text>
          </View>
        </View>
        <ScrollView style={{ backgroundColor: "pink" }}>
          <View style={{ backgroundColor: 'pink', flex: 1, alignItems: 'flex-start' }}>
            <TouchableOpacity style={styles.AccountOption} onPress={() => setHideUsernameChange(!hideUsernameChange)} >
              <FontAwesome5 name="user-edit" size={20} color='grey' style={{ marginLeft: 10 }} />
              <Text style={styles.TextAccountOption}>Change username</Text>
            </TouchableOpacity>
            {
              !hideUsernameChange ?
                <>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: SCREEN_WIDTH, marginVertical: 7 }}>
                    <TextInput style={styles.TextInput}
                      placeholder="Enter new username"
                      onChangeText={text => {setUsername(text)
                        setUsernameValidation(/^[0-9a-zA-Z]+$/.test(changedUsername))
                      }}
                      value={changedUsername}></TextInput>
                    <Button title="Change Username" onPress={() => {
                      if (usernameValidation) {
                        let data = {
                          user: props.route.params.userId,
                          username: changedUsername
                        }
                        fetch(MainLink() + "changeUsername", {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify(data)
                        });
                        alert(`Username changed to @${changedUsername}`);
                        fetchData();
                      }
                      else ("Username should only contain letters and numbers")

                    }}></Button>
                  </View>
                </>
                : <View></View>
            }
            <TouchableOpacity style={styles.AccountOption} onPress={() => setPasswordChange(!hidePasswordChange)}>
              <FontAwesome5 name="key" size={20} color='grey' style={{ marginLeft: 10 }} />
              <Text style={styles.TextAccountOption}>Change password</Text>
            </TouchableOpacity>
            {
              !hidePasswordChange ?
                <>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: SCREEN_WIDTH, marginVertical: 7 }}>
                    <TextInput style={styles.TextInput}
                      placeholder="Enter new password"
                      autoCapitalize='none'
                      onChangeText={text => {setPassword(text)
                        setPassValidation(changedPassword.length >= 8)
                      }}
                      value={changedPassword}></TextInput>
                    <Button title="Change Password" onPress={() => {
                      if (passValidation) {
                        let data = {
                          user: props.route.params.userId,
                          password: changedPassword
                        }
                        fetch(MainLink() + "changePass", {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify(data)
                        });
                        alert('Password Changed!')
                      }
                      else {
                        alert("Password should be at least 8 symbols long")
                      }
                    }}></Button>
                  </View>
                </>
                : <View></View>
            }
            <TouchableOpacity style={styles.AccountOption} onPress={() => {
              props.route.params.handler(-1)
            }
            }
            >
              <FontAwesome5 name="sign-out-alt" size={20} color='grey' style={{ marginLeft: 10 }} />
              <Text style={styles.TextAccountOption}>Sign out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}