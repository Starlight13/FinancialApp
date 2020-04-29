import 'react-native-gesture-handler';
import React from 'react';
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

const SCREEN_WIDTH = Math.round(Dimensions.get('screen').width);
const SCREEN_HEIGHT = Math.round(Dimensions.get('screen').height);



export default function HomeScreen({ navigation }) {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.SafeAreaView}>
          <View style={{ height: 100, flexDirection: "row", justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'white' }}>
            <Text style={styles.TextMoney}>Month Expances:{"\n"} $321</Text>
            <TouchableOpacity
              style={{
                shadowOffset: { width: 2, height: 2, },
                shadowColor: '#000',
                shadowOpacity: 0.3,
                shadowRadius: 2,
              }}
              onPress={() => navigation.navigate("My Account")}>
              <Image style={{ height: 60, width: 60, borderRadius: 40 }} source={{ uri: "https://html5css.ru/howto/img_avatar2.png" }} />
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

          <FetchList/>
          <TouchableOpacity onPress={() => navigation.navigate("Add Spendings")} style={{ backgroundColor: 'pink', width: 50, height: 50, position: 'absolute', top: SCREEN_HEIGHT-150, left: SCREEN_WIDTH - 70, borderRadius: 50, alignItems: 'center', justifyContent: 'center', opacity: 0.6 }}>
          <View>
            <FontAwesome5 name="plus" size={30} color="white" />
          </View>
          </TouchableOpacity>
        </SafeAreaView>
      </>
    )
  }