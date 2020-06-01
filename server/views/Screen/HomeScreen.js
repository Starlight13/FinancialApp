import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FetchList from '../MyComponents/FetchList';
import MainLink from './MainLink';

const SCREEN_WIDTH = Math.round(Dimensions.get('screen').width);
const SCREEN_HEIGHT = Math.round(Dimensions.get('screen').height);



export default function HomeScreen({ navigation }) {
    const [monthExp, changeExp] = useState(0);
    const [isLoading, changeLoad] = useState(true);
    const trigger = false;

    useEffect(() => {
      fetch(MainLink()+":8080/getSum")
      .then((res) => res.json())
      .then((resJson) => changeExp(resJson[0].sum))
      .catch(err => console.log(err))
      .finally(() => changeLoad(false))
      console.log(monthExp);
    }, [trigger]);

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.SafeAreaView}>
          <View style={{ height: 100, flexDirection: "row", justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'white' }}>
            <Text style={styles.TextMoney}>Month Expances:{"\n"} {monthExp}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("My Account")}>
              <View
                            style={{
                                shadowOffset: { width: 0, height: 0, },
                                shadowColor: '#000',
                                shadowOpacity: 0.3,
                                shadowRadius: 3,
                                height: 60, 
                                width: 60, 
                                borderRadius: 40,
                                backgroundColor: 'white',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <FontAwesome5 name="qq" size={40} color='#ffb0b3'/>
                        </View>
            </TouchableOpacity>
          </View>
           <View style={{width: SCREEN_WIDTH, backgroundColor: 'white', alignItems: 'center', height: 60, justifyContent: "center"}}>
               <Text style={styles.Text}>Spendings history</Text>
               <View style={{flexDirection: 'row', flex:1, backgroundColor: '#ffe3e8', width: SCREEN_WIDTH}}>
                   <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                       <Text style={styles.Text}>Cost</Text>
                   </View>
                   <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                       <Text style={styles.Text}>Purchase name</Text>
                   </View>
                   <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                       <Text style={styles.Text}>Category</Text>
                   </View>
               </View>
           </View>

          <FetchList route='Home' trigger={trigger}/>
          <TouchableOpacity onPress={() => navigation.navigate("Add Spendings")} style={{ backgroundColor: 'pink', width: 50, height: 50, position: 'absolute', top: SCREEN_HEIGHT-150, left: SCREEN_WIDTH - 70, borderRadius: 50, alignItems: 'center', justifyContent: 'center', opacity: 0.6 }}>
          <View>
            <FontAwesome5 name="plus" size={30} color="white" />
          </View>
          </TouchableOpacity>
        </SafeAreaView>
      </>
    )
  }