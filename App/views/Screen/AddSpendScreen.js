import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActionSheetIOS,
  Switch,
  Dimensions,
  Picker,
  ScrollView,
  Platform
} from 'react-native';

import styles from './styles'
import MainLink from './MainLink';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const SCREEN_WIDTH = Math.round(Dimensions.get('screen').width);
const SCREEN_HEIGHT = Math.round(Dimensions.get('screen').height);

export default function AddSpendScreen(props) {

  const user = props.route.params.userId;
  const [result, setResult] = useState("-");

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
        } else if (buttonIndex === 5) {
          setResult("Transport")
        } else if (buttonIndex === 6) {
          setResult("Other")
        }
      }
    );



  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [nameText, changeName] = useState("");
  const [priceText, changePrice] = useState("");
  const [infoText, changeInfo] = useState("")

  const [nameValidation, setNameValidation] = useState(false);
  const [priceValidation, setPriceValidation] = useState(false);

  const postResult = () => {
    if (nameValidation && priceValidation) {
      let data = {
        user: user,
        name: nameText,
        price: priceText,
        category: result,
        info: infoText == ''? 'no info' : infoText,
        roomiebool: isEnabled
      }
      console.log(data);
      fetch(MainLink() + "addSpend", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
        .then((response) => response.json())
        .finally(() => props.navigation.navigate('Home', { screen: 'Home' }))
    }
    else if(!nameValidation){
      alert('Item name should be at least 3 symbols long')
    }
    else{
      alert('Price should be an integer')
    }
  }
  return (
    postResult,
    <>
      <ScrollView style={{ flex: 1, backgroundColor: "pink" }}>
        <View style={{ flex: 1, backgroundColor: 'pink', alignItems: 'center', justifyContent: 'space-around', }}>
          <View style={{ marginTop: 24 }}>
            <Text style={styles.Text}>Name:</Text>
            <TextInput style={styles.TextInput}
              textAlign="center"
              placeholder="What did you buy?"
              onChangeText={text => {changeName(text)
                setNameValidation(nameText.length >= 3);
              }}
              value={nameText}></TextInput>
          </View>
          <View>
            <Text style={styles.Text}>Cost:</Text>
            <TextInput style={styles.TextInput}
              textAlign="center"
              placeholder="How much?"
              keyboardType="decimal-pad"
              onChangeText={text => {changePrice(text)
                setPriceValidation(/^-?\d*(\.\d+)?$/.test(priceText));
              }}
              value={priceText}></TextInput>
            <Text style={styles.Text}>Category:</Text>
          </View>
          <View style={{
            width: 200,
            height: 40,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 10,
            margin: 15,
            alignItems: 'center',
            justifyContent: 'center'
          }}>

            {Platform.OS == 'ios'
              ?
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
              :
              <Picker
                selectedValue={result}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) => setResult(itemValue)}
              >
                <Picker.Item label="Choose category" value="-" />
                <Picker.Item label="Clothes" value="Clothes" />
                <Picker.Item label="Food" value="Food" />
                <Picker.Item label="Fun" value="Fun" />
                <Picker.Item label="Home" value="Home" />
                <Picker.Item label="Transport" value="Transport" />
                <Picker.Item label="Other" value="Other" />
              </Picker>}

          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 230 }}>
            <Text style={styles.Text}>Share with Roomie</Text>
            <Switch
              trackColor={{ false: "#fff", true: "#bffdb1" }}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <View>
            <Text style={[styles.Text, { marginTop: 30 }]}>Additional info:</Text>
            <TextInput style={styles.TextInputLong}
              placeholder="Notes"
              onChangeText={text => changeInfo(text)}
              value={infoText} />
          </View>
          <TouchableOpacity onPress={() => { postResult() }} style={{
            backgroundColor: 'white', width: 50, height: 50, borderRadius: 50, alignItems: 'center', justifyContent: 'center', shadowOffset: { width: -2, height: -2, },
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 2,
          }}>
            <View>
              <FontAwesome5 name="plus" size={30} color="pink" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  )
}