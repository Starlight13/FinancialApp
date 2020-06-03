import 'react-native-gesture-handler';
import React , {useState} from 'react';
import {
  Button,
} from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import HomeScreen from './Screen/HomeScreen';
import AccountScreen from './Screen/AccountScreen';
import AddSpendScreen from './Screen/AddSpendScreen';
import RoomieScreen from './Screen/RoomieScreen';
import StatisticsScreen from './Screen/StatisticsScreen';
import MainLink from './Screen/MainLink';
import LogInScreen from './Screen/AuthScreens/LogInScreen';
import SignUpScreen from './Screen/AuthScreens/SignUpScreen';
import ForgotPassScreen from './Screen/AuthScreens/ForgotPassScreen';




const HomeStack = createStackNavigator();
const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();



const  HomeStackScreen = (props) => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} initialParams={{userId: props.route.params.userId}} options={{ headerShown: false }} />
      <HomeStack.Screen name="My Account" component={AccountScreen} initialParams={{handler: props.route.params.handler, userId: props.route.params.userId}} options={{
        headerLeft: () => (
          <Button
            onPress={() => props.navigation.navigate('Home', {screen: 'Home'})}
            title="Home"
            color="pink"
          />
        )
      }} />
      <HomeStack.Screen name="Add Spendings" component={AddSpendScreen} options={{
        headerLeft: () => (
          <Button
            onPress={() => props.navigation.navigate('Home', {screen: 'Home'})}
            title="Back"
            color="pink"
          />
        )
      }} />
    </HomeStack.Navigator>
  )
}

export default function Routes() {
    const [isLoggedIn, changeLog] = useState(false);
    const [userId, changeUser] = useState(-1);

    const _handler = (userid) => {
      console.log(userId)
      if(userId == -1){
        changeUser(userid);
      }
      else{
        changeUser(-1);
      };
      console.log(userId);
      changeLog(!isLoggedIn);
    }

    return (
      isLoggedIn === false 
      ?
      <NavigationContainer>
        <AuthStack.Navigator>
         <AuthStack.Screen name="Log In" component={LogInScreen} initialParams={{handler: _handler}} options={{ headerShown: false }} />
         <AuthStack.Screen name="Sign Up" component={SignUpScreen} options={{ headerShown: false }} />
         <AuthStack.Screen name="Forgot Password" component={ForgotPassScreen} options={{ headerShown: false }} />
        </AuthStack.Navigator>
      </NavigationContainer> 
      :
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
    
                if (route.name === 'Home') {
                  iconName = 'wallet'
                } else if (route.name === 'Roomie') {
                  iconName = 'user-friends'
                } else if (route.name === "Statistics") {
                  iconName = 'chart-bar'
                }
                return <FontAwesome5 name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: 'pink',
              inactiveTintColor: 'gray',
            }}
          >
            <Tab.Screen name="Home" component={HomeStackScreen} initialParams={{handler: _handler, userId: userId}} options={{ headerShown: false }} />
            <Tab.Screen name="Roomie" component={RoomieScreen} initialParams={{userId: userId}}  options={{ headerShown: false }} />
            <Tab.Screen name="Statistics" component={StatisticsScreen} initialParams={{userId: userId}}  options={{ headerShown: false }} />
          </Tab.Navigator>
        </NavigationContainer>
      );
}