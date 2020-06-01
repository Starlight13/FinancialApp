import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActionSheetIOS,
  Switch,
  Dimensions
} from 'react-native';

import styles from './styles'
import MainLink from './MainLink';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const SCREEN_WIDTH = Math.round(Dimensions.get('screen').width);
const SCREEN_HEIGHT = Math.round(Dimensions.get('screen').height);

export default function AddSpendScreen({ navigation }) {
    const [result, setResult] = useState("Choose Category");
    
  
    const onPress = () =>
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Cancel", "Clothes", "Food", "Fun", "Home", "Transport", "Other"],
          cancelButtonIndex: 0
        },
        buttonIndex => {
          if (buttonIndex === 0) {
          } else if (buttonIndex === 1) {
            setResult("Clothes");
          } else if (buttonIndex === 2) {
            setResult("Food");
          } else if (buttonIndex === 3) {
            setResult("Fun")
          } else if (buttonIndex === 4) {
            setResult("Home")
          } else if (buttonIndex === 5){
            setResult("Transport")
          } else if (buttonIndex === 6){
            setResult("Other")
          }
        }
      );
  
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const [nameText, changeName] = useState("");
    const [priceText, changePrice] = useState("");
    const [infoText, changeInfo] = useState("")

    const postResult = () => {
      var headers = {
        "name": nameText,
        "price": priceText,
        "category": result,
        "info": infoText,
        "roomiebool": isEnabled
      }
      fetch(MainLink()+":8080/addSpend", {
        headers: headers
      })
      .then((response) => response.json())
      .finally(() => navigation.navigate('Home', {screen: 'Home'}))
    }
    return (
      postResult,
      <>
        <View style={{ flex: 1, backgroundColor: 'pink', alignItems: 'center', justifyContent: 'space-around' }}>
        <View>
            <Text style={styles.Text}>Name:</Text>
            <TextInput style={styles.TextInput} 
                        textAlign="center" 
                        placeholder="What did you buy?" 
                        keyboardType="decimal-pad" 
                        onChangeText={text => changeName(text)}
                        value={nameText}></TextInput>
          </View>
          <View>
            <Text style={styles.Text}>Cost:</Text>
            <TextInput style={styles.TextInput} 
                        textAlign="center" 
                        placeholder="How much?" 
                        keyboardType="decimal-pad"
                        onChangeText={text => changePrice(text)}
                        value={priceText}></TextInput>
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
            <TextInput style={styles.TextInputLong} 
                        multiline="true"  
                        placeholder="Notes"
                        onChangeText={text => changeInfo(text)}
                        value={infoText}/>
          </View>
          <TouchableOpacity onPress={() => {postResult()}} style={{ backgroundColor: 'white', width: 50, height: 50, position: 'absolute', top: SCREEN_HEIGHT-170, left: SCREEN_WIDTH - 70, borderRadius: 50, alignItems: 'center', justifyContent: 'center', shadowOffset: { width: -2, height: -2, },
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowRadius: 2, }}>
          <View>
            <FontAwesome5 name="plus" size={30} color="pink" />
          </View>
          </TouchableOpacity>
        </View>
      </>
    )
  }