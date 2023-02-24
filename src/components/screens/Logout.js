import {
        View,
        Text,
        StyleSheet,
        TouchableOpacity,
        Pressable,
        Image,
        ScrollView,
} from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
const Logout = () => {
        const navigation = useNavigation();
        // const { clearCart } = useContext(CartContext);
        const logout = () => {
                const email = AsyncStorage.getItem('email');
                const name = AsyncStorage.getItem('name');
                const UserId = AsyncStorage.getItem('UserId');
                //console.log(name + '--' + email + 'logout');
                AsyncStorage.removeItem('email');
                AsyncStorage.removeItem('name');
                AsyncStorage.removeItem('UserId');
                AsyncStorage.clear();
                console.log(UserId + '-' + email + '-' + email);
                console.log('userlogout');
                navigation.navigate('Login');
        };
        useEffect(() => {
                logout();
        }, []);

        return (
                <></>
        );
};

export default Logout;
const styles = StyleSheet.create({});
