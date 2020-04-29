import 'react-native-gesture-handler';
import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';



export default function AccountScreen() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.SafeAreaView}>
          <View style={{ flexDirection: 'row', backgroundColor: 'white', height: 90 }}>
            <View style={{ flex: 1 }} >
              <Image style={styles.Avatar} source={{ uri: "https://html5css.ru/howto/img_avatar2.png" }} />
            </View>
            <View style={{ justifyContent: 'center', flex: 2, alignItems: 'flex-start' }} >
              <Text style={styles.TextMoney}>@testUser1</Text>
              <Text style={{ fontWeight: "700", color: 'grey', marginVertical: 10 }}>o.romanishina@gmail.com</Text>
            </View>
          </View>
          <ScrollView style={{backgroundColor:"pink"}}>
          <View style={{ backgroundColor: 'pink', flex: 1, alignItems: 'flex-start' }}>
            <TouchableOpacity style={styles.AccountOption}>
              <FontAwesome5 name="user-edit" size={20} color='grey' style={{ marginLeft: 10 }} />
              <Text style={styles.TextAccountOption}>Change username</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.AccountOption}>
              <Text style={styles.TextAccountOption}>Change E-mail</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.AccountOption}>
              <FontAwesome5 name="camera" size={20} color='grey' style={{ marginLeft: 10 }} />
              <Text style={styles.TextAccountOption}>Change profile picture</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.AccountOption}>
              <FontAwesome5 name="key" size={20} color='grey' style={{ marginLeft: 10 }} />
              <Text style={styles.TextAccountOption}>Change password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.AccountOption}>
              <FontAwesome5 name="sign-out-alt" size={20} color='grey' style={{ marginLeft: 10 }} />
              <Text style={styles.TextAccountOption}>Sign out</Text>
            </TouchableOpacity>
          </View>
          </ScrollView>
        </SafeAreaView>
      </>
    )
  }