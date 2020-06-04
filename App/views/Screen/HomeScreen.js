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
  ActivityIndicator
} from 'react-native';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FetchList from '../MyComponents/FetchList';
import MainLink from './MainLink';

const SCREEN_WIDTH = Math.round(Dimensions.get('screen').width);
const SCREEN_HEIGHT = Math.round(Dimensions.get('screen').height);



export default function HomeScreen(props) {


    const user = props.route.params.userId;
  
    const [monthExp, changeExp] = useState(0);
    const [isLoading, changeLoad] = useState(true);

    useEffect(() => {
      fetchExp();
    }, []);

    const fetchExp = async () => {
      fetch(MainLink()+"getSum",{
        method: 'GET',
        headers: {
          user: user,
        }
      })
      .then((res) => res.json())
      .then((resJson) => changeExp(resJson[0].sum))
      .catch(err => console.log(err))
      .finally(() => changeLoad(false))
    }
    if (isLoading === true)
            return (
                <View style={styles.CenteredView}>
                    <ActivityIndicator />
                </View>)
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.SafeAreaView}>
          <View style={{ height: 100, flexDirection: "row", justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'white' }}>
            <Text style={styles.TextMoney}>Month Expances:{"\n"} ${monthExp}</Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("My Account")}>
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
                       <Text style={styles.Text}>Info</Text>
                   </View>
                   <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                       <Text style={styles.Text}>Category</Text>
                   </View>
               </View>
           </View>
           <View style={{flex: 1}}>            
          <FetchList route='Home' handler = {fetchExp} user = {user} roomie={-1}/>
          </View>     
          <View style={{ alignItems: 'center'}}>
          <TouchableOpacity onPress={() => props.navigation.navigate("Add Spendings")} style={{ backgroundColor: 'pink', width: 50, height: 50, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
          <View>
            <FontAwesome5 name="plus" size={30} color="white" />
          </View>
          </TouchableOpacity>
          </View>
        </SafeAreaView>
      </>
    )
  }