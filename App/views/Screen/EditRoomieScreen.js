import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    TextInput,
    Button,
    Dimensions,
    Alert
} from 'react-native';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MainLink from './MainLink';

const SCREEN_WIDTH = Math.round(Dimensions.get('screen').width);



export default function EditRoomieScreen({navigation, route}) {
    const {handler} = route.params;
    const {userId} = route.params;
    const {roomie} = route.params;
    const [userInfo, setUserInfo] = useState([{}]);

    const createTwoButtonAlert = () =>
    Alert.alert(
      "Roomie Deletion",
      "Are you sure you want to delete roomie?\n Your roomie will miss you...",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        { text: "SURE!", onPress: () => {
            console.log(userInfo[0].userid);
            fetch(MainLink()+'deleteRoomie', {
                method: 'GET',
                headers: {
                    user: userId,
                    roomie: userInfo[0].userid,
                }
            });
            handler();
            alert('Roomie deleted.')
            navigation.navigate('Roomie')
        } }
      ],
      { cancelable: false }
    );


    useEffect(() => {
        console.log(userId)
        setUserInfo(roomie);
    }, []);


    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.SafeAreaView}>
                <View style={{ flexDirection: 'row', backgroundColor: 'white', height: 90 }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                        <FontAwesome5 name="qq" size={40} color='#ffb0b3' />
                    </View>
                    <View style={{ justifyContent: 'center', flex: 2, alignItems: 'flex-start' }} >
                        <Text style={styles.TextMoney}>@{userInfo[0].username}</Text>
                        <Text style={{ fontWeight: "700", color: 'grey', marginVertical: 3 }}>{userInfo[0].email}</Text>
                        <Text style={{ fontWeight: "400", color: 'grey', marginVertical: 3 }}>User id: {userInfo[0].userid}</Text>
                    </View>
                </View>
                <ScrollView style={{ backgroundColor: "pink" }}>
                    <View style={{ backgroundColor: 'pink', flex: 1, alignItems: 'flex-start' }}>
                        <TouchableOpacity style={styles.AccountOption} onPress={() => createTwoButtonAlert()} >
                            <FontAwesome5 name="user-slash" size={20} color='grey' style={{ marginLeft: 10 }} />
                            <Text style={styles.TextAccountOption}>Delete roomie</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}