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

export default function ForgotPassScreen({ navigation }) {

  const [emailText, setEmail] = useState('');

    return (
      <>
        <View style={{ backgroundColor: 'pink', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ backgroundColor: 'pink', flex: 0.6, width: Math.round(Dimensions.get('screen').width), justifyContent: 'flex-end', alignItems: 'center' }}>
            <Text style={{ fontSize: 32, margin: 30, fontWeight: "700" }}>Forgot password?</Text>
            <Text style={{ fontSize: 16, fontWeight: "100" }}>The new password will be sent to your email</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', marginBottom: 40 }}>
            <TextInput style={styles.TextInput}
            placeholder="Email"
            autoCapitalize = 'none'
            onChangeText={text => setEmail(text)}
            value={emailText}></TextInput>
            <Button title="Send new password" onPress={() => alert("Password send!")}></Button>
          </View>
          <View style={{ flex: 0.6, alignItems: "center", justifyContent: 'center', flexDirection: 'row', backgroundColor: 'pink', width: Math.round(Dimensions.get('screen').width) }}>
            <Button color="#599ee3" onPress={() => navigation.navigate("Log In")} title="Back to logging in"></Button>
          </View>
        </View>
      </>
    )
  }