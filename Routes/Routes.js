import 'react-native-gesture-handler';
import React from 'react';
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
import SplitBillScreen from './Screen/SplitBillScreen';


const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();




function HomeStackScreen({ navigation }) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="My Account" component={AccountScreen} options={{
        headerLeft: () => (
          <Button
            onPress={() => navigation.goBack()}
            title="Home"
            color="pink"
          />
        )
      }} />
      <HomeStack.Screen name="Add Spendings" component={AddSpendScreen} options={{
        headerLeft: () => (
          <Button
            onPress={() => navigation.goBack()}
            title="Cancel"
            color="pink"
          />
        ),
        headerRight: () => (
          <Button
            onPress={() =>
                fetch('http://192.168.0.15:8080')
                  .then((response) => response.json())
                  .then((json) => alert(json.name))
                  .catch((error) => console.error(error))
                  .finally(() => console.log("Hello to you"))
              
            }
            title="Add"
            color='pink'
          />
        ),
      }} />
    </HomeStack.Navigator>
  )
}

export default function Routes() {
    return (
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
    
                if (route.name === 'Home') {
                  iconName = 'wallet'
                } else if (route.name === 'SplitBill') {
                  iconName = 'money-check-alt';
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
            <Tab.Screen name="Home" component={HomeStackScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Roomie" component={RoomieScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Statistics" component={StatisticsScreen} options={{ headerShown: false }} />
            <Tab.Screen name="SplitBill" component={SplitBillScreen} options={{ title: "Split the bill" }} />
          </Tab.Navigator>
        </NavigationContainer>
      );
}