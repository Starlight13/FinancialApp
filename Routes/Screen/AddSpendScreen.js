import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActionSheetIOS,
  Switch
} from 'react-native';

import styles from './styles'


export default function AddSpendScreen() {
    const [result, setResult] = useState("Choose Category");
  
    const onPress = () =>
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Cancel", "Food", "Clothes", "Home", "Transport", "Other"],
          cancelButtonIndex: 0
        },
        buttonIndex => {
          if (buttonIndex === 0) {
          } else if (buttonIndex === 1) {
            setResult("Food");
          } else if (buttonIndex === 2) {
            setResult("Clothes");
          } else if (buttonIndex === 3) {
            setResult("Home")
          } else if (buttonIndex === 4) {
            setResult("Transport")
          } else if (buttonIndex === 5)
            setResult("Other")
        }
      );
  
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  
    return (
      <>
        <View style={{ flex: 1, backgroundColor: 'pink', alignItems: 'center', justifyContent: 'space-around' }}>
        <View>
            <Text style={styles.Text}>Name:</Text>
            <TextInput style={styles.TextInput} textAlign="center" placeholder="What did you buy?" keyboardType="decimal-pad"></TextInput>
          </View>
          <View>
            <Text style={styles.Text}>Cost:</Text>
            <TextInput style={styles.TextInput} textAlign="center" placeholder="How much?" keyboardType="decimal-pad"></TextInput>
          </View>
          <View>
            <Text style={styles.Text} >Category:</Text>
            <TouchableOpacity style={{
              width: 200,
              height: 40,
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 10,
              margin: 15,
              alignItems: 'center'
            }}
              onPress={onPress}>
              <Text style={result === "Choose Category" ? { color: "#cfcfcf" } : { color: "black" }}>{result}</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 230}}>
            <Text style={styles.Text}>Share with Roomie</Text>
            <Switch
              trackColor={{ false: "#fff", true: "#bffdb1" }}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <View>
            <Text style={styles.Text}>Additional info:</Text>
            <TextInput style={styles.TextInputLong} multiline="true"  placeholder="Notes"/>
          </View>
        </View>
      </>
    )
  }