import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Splash from './components/screens/Splash';
import Register from './components/screens/Register';
import Login from './components/screens/Login';
import Homeuser from './components/screens/Homeuser';
import Logout from './components/screens/Logout';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <StackScreenNavigator />
    </NavigationContainer >
  );
};
const StackScreenNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={Splash}>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ title: 'Welcome' }} //,headerTransparent: true}}
      // options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: 'Login' }}
      />
      <Stack.Screen
        name="Homeuser"
        //component={props => <Login {...props}/>}
        component={BottomTabsNaigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ title: 'Create an Account' }}
      />
      <Stack.Screen
        name="BottomTabsNaigator"
        component={BottomTabsNaigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
const DrawerNavigatorUser = () => {
  const [nameuser, setnameuser] = useState('');
  const [emailuser, setemailuser] = useState('');

  const getNameandEmailUser = async () => {
    const username = await AsyncStorage.getItem('name');
    const useremail = await AsyncStorage.getItem('email');
    if (username !== null && useremail !== null) {
      // We have data!!
      setnameuser(username);
      setemailuser(useremail);
    }
  }
  useEffect(() => {
    getNameandEmailUser();
  }, []);

  return (
    <Drawer.Navigator initialRouteName="Homeuser" >
      <Drawer.Screen
        name="User Home"
        component={Homeuser}
        options={{ title: 'Welcome ' + nameuser, headerTintColor: 'black' }}
      // options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{
          tabBarLabel: () => { return null },
        }} //,headerTransparent: true}}
      // options={{headerShown: false}}
      />

    </Drawer.Navigator>
  );
};
const BottomTabsNaigator = () => {
  return (
    <Tab.Navigator initialRouteName="Homeuser"
      screenOptions={{
        tabBarActiveTintColor: '#000000',

      }}>
      <Tab.Screen name="Home" component={Homeuser} options={{
        tabBarLabel: () => { return null },
        // headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Feather name="home" color={focused ? "orange" : "black"} size={30} />
        ),
      }} />

      <Tab.Screen name="User" component={DrawerNavigatorUser} options={{
        tabBarLabel: () => { return null },
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Entypo name="menu" color={focused ? "orange" : "black"} size={30} />
        ),
      }} />
      {/* <Tab.Screen name="Logout" component={Logout} options={{
        tabBarLabel: () => { return null },
        tabBarIcon: ({ focused }) => (
          <Entypo name="log-out" color={focused ? "orange" : "black"} size={30} />

        ),
      }} /> */}
    </Tab.Navigator>
  );
}
export default AppNavigator;
