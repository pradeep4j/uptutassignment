import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  LogBox,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../layout/Loader';
import { Base64 } from 'js-base64';
import Entypo from 'react-native-vector-icons/Entypo';
const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('pradeepmaurya@gmail.com');
  const [password, setPassowrd] = useState('123456');
  const [userId, setUserId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const validateEmail = email => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  const validate = async () => {
    if (!email.trim() && !password.trim() === '') {
      alert('Enter Email and Password');
      return;

    }
    if (validateEmail(email) === false) {
      alert('Email is invalid!');
      return;
    }
    if (!password.trim()) {
      alert('Please enter password!');
      return;
    }
    setModalVisible(true);
    await firestore()
      .collection('Users')
      .where('email', '==', email.trim())
      //.and('password', '==', password)
      .get()
      .then(querySnapshot => {
        setModalVisible(false);
        //alert(Base64.decode(querySnapshot.docs[0]._data.password) +'==='+ password.trim());
        if (querySnapshot.docs.length > 0) {
          if (
            querySnapshot.docs[0]._data.email === email.trim() &&
            Base64.decode(querySnapshot.docs[0]._data.password) ===
            password.trim()
          ) {
            AsyncStorage.setItem('UserId', querySnapshot.docs[0]._data.userId);
            AsyncStorage.setItem('email', querySnapshot.docs[0]._data.email);
            AsyncStorage.setItem('name', querySnapshot.docs[0]._data.name);
            navigation.navigate('Homeuser', {
              name: querySnapshot.docs[0]._data.name,
              email: querySnapshot.docs[0]._data.email,
            });
            ToastAndroid.show(
              'User Logged In successfully!',
              ToastAndroid.LONG,
            );
          } else {
            setModalVisible(false);
            ToastAndroid.show('Email/Password is wrong!', ToastAndroid.LONG);
          }
        } else {
          setModalVisible(false);
          ToastAndroid.show('Account does not exists!', ToastAndroid.LONG);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <ScrollView
      style={[styles.scrollview]}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Login {' '} <Entypo name="login" color="orange" size={30} /></Text>
        <TextInput
          placeholder="Enter your email"
          name="email"
          lable="Email"
          type="email"
          value={email}
          style={styles.inputStyle}
          onChangeText={txt => setEmail(txt)}
        />
        <TextInput
          placeholder="Enter your password"
          name="password"
          lable="Password"
          value={password}
          type="password"
          style={styles.inputStyle}
          secureTextEntry
          onChangeText={txt => setPassowrd(txt)}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={validate}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        <Text
          style={styles.signup}
          onPress={e => {
            navigation.navigate('Register');
          }}>
          Don't have account? Click here to signup
        </Text>
        <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
      </View>
    </ScrollView>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: "black",
    marginTop: 100,
    alignSelf: 'center',
  },
  inputStyle: {
    paddingLeft: 20,
    height: 50,
    alignSelf: 'center',
    marginTop: 40,
    borderWidth: 0.5,
    borderRadius: 10,
    width: '90%',
  },
  btn: {
    backgroundColor: 'orange',
    paddingLeft: 20,
    height: 50,
    marginTop: 40,
    borderWidth: 0.5,
    borderRadius: 10,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  btnText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000',
  },
  signup: {
    fontWeight: '400',
    fontSize: 18,
    color: '#090f69',
    textDecorationLine: 'underline',
    alignSelf: 'center',
    marginTop: 30,
  },
  scrollview: {
    marginHorizontal: 10,
  },
});
