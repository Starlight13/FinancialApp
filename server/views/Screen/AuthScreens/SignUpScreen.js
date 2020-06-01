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

export default function SignUpScreen({ navigation }) {
    return (
      <>
        <View style={{ backgroundColor: 'pink', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ backgroundColor: 'pink', flex: 0.6, width: Math.round(Dimensions.get('screen').width), justifyContent: 'flex-end', alignItems: 'center' }}>
            <Text style={{ fontSize: 32, margin: 30, fontWeight: "700" }}>Sign Up!</Text>
            <Text style={{ fontSize: 16, fontWeight: "100" }}>Enter valid information to sign up</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', marginBottom: 40 }}>
            <TextInput style={styles.TextInput} placeholder="Email"></TextInput>
            <TextInput style={styles.TextInput} placeholder="Password"></TextInput>
            <TextInput style={styles.TextInput} placeholder="Username"></TextInput>
            <Button title="Sign up" onPress={() => navigation.navigate("Log In")}></Button>
          </View>
          <View style={{ flex: 0.6, alignItems: "center", justifyContent: 'center', flexDirection: 'row', backgroundColor: 'pink', width: Math.round(Dimensions.get('screen').width) }}>
            <Text style={{ fontSize: 16 }}>Already registered?</Text>
            <Button title="Log in" onPress={() => navigation.navigate("Log In")}></Button>
          </View>
        </View>
      </>
    )
  }