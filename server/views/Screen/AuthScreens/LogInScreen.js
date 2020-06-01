import 'react-native-gesture-handler';
import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  Button,
} from 'react-native';
import styles from '../styles';


export default LogInScreen = (props) => {
    return (
      <>
        <View style={{ backgroundColor: 'pink', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ backgroundColor: 'pink', flex: 0.6, width: Math.round(Dimensions.get('screen').width), justifyContent: 'flex-end', alignItems: 'center' }}>
            <Text style={{ fontSize: 32, margin: 30, fontWeight: "700" }}>Welcome!</Text>
            <Text style={{ fontSize: 16, fontWeight: "100" }}>First, log into your account</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <TextInput style={styles.TextInput} placeholder="Email"></TextInput>
            <TextInput style={[styles.TextInput]} placeholder="Password"></TextInput>
            <Button title="Log in" onPress={() => props.route.params.handler()}></Button>
            <Button color="#599ee3" title="Forgot password?" onPress={() => props.navigation.navigate("Forgot Password")}></Button>
          </View>
          <View style={{ flex: 0.6, alignItems: "center", justifyContent: 'center', flexDirection: 'row', backgroundColor: 'pink', width: Math.round(Dimensions.get('screen').width) }}>
            <Text style={{ fontSize: 16 }}>Not registered yet?</Text>
            <Button title="Register" onPress={() => props.navigation.navigate("Sign Up")}></Button>
          </View>
        </View>
      </>
    )
  }