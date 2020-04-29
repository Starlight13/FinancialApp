import { StyleSheet, Dimensions } from 'react-native';

const SCREEN_WIDTH = Math.round(Dimensions.get('screen').width);

export default StyleSheet.create({
    SafeAreaView: {
      flex: 1,
    },
    ScrollView: {
      flex: 1,
      backgroundColor: 'pink'
    },
    Text: {
        fontSize: 18, 
        fontWeight: "100"
    },
    BarText: {
        fontSize: 14,
        textAlign: 'center',
        width: 70
    },
    AccountOption: {
      backgroundColor: 'white',
      width: SCREEN_WIDTH,
      borderBottomWidth: 2,
      borderBottomColor: '#f0eeec',
      flexDirection: 'row',
      alignItems: 'center'
    },
    TextAccountOption: {
        margin: 10, 
        fontSize: 20, 
        color: 'grey' 
    },
    TextMoney: {
      color: 'pink',
      fontWeight: '900',
      fontSize: 24,
      textAlign: 'center'
    },
    MyView: {
      flex: 0.4,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'aquamarine',
      shadowOffset: { height: 5, width: 0 },
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 10,
      zIndex: 1
    },
    Avatar: {
      height: 70,
      width: 70,
      borderRadius: 60,
      margin: 10,
    },
    TextInput: {
      width: 200,
      height: 40,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 10,
      margin: 15,
    },
    TextInputLong: {
        width: 300,
        height: 100,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        margin: 15,
      },
    CenteredView: {
        flex:1,
        justifyContent: "center",
        alignItems: 'center'
    }
  });