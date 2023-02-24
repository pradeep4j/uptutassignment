import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
//import ProductList from '../products/ProductList';
//import Orders from '../products/Orders';
//import Search from '../products/Search';

const Homeuser = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [seletedTab, setSelectedTab] = useState(0);
  const getNameandEmail = async () => {
    // await AsyncStorage.clear();
    const UserId = await AsyncStorage.getItem('UserId');
    const email = await AsyncStorage.getItem('email');
    const name = await AsyncStorage.getItem('name');
    // console.log(name + '--' + email);
    // console.log(UserId + '-home');
    if (name !== null && email !== null) {
      // We have data!!
      setname(email);
      setemail(name);
    } else {
      const route = useRoute();
      const name = route.params.name;
      const email = route.params.email;
      setname(name);
      setemail(email);
    }
  };
  useEffect(() => {
    //alert('-')
    getNameandEmail();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {name}</Text>
    </View>
  );
};

export default Homeuser;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    bottom: 1,
    // marginTop: '5%',
    // height: '95%',
    bottom: 1
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    // marginTop: 150,
    padding: 12,
    color: 'orange',
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
