import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid
} from 'react-native';
import React, { useState, useEffect } from 'react';
import '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';
import Loader from '../layout/Loader';
import uuid from 'react-native-uuid';
import { Base64 } from 'js-base64';
import messaging from '@react-native-firebase/messaging';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Register = () => {
  const navigation = useNavigation();
  const route = useRoute();
  let admin = '';
  if (route.params) admin = route.params.admin;
  //alert(admin)
  const [email, setEmail] = useState('');
  const [password, setPassowrd] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const getFCMToken = async () => {
    try {
      const createdToken = await messaging().getToken();
      setToken(createdToken);
      console.log(createdToken);
    } catch (error) {
      console.log(error);
    }
  };
  const validateEmail = email => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  useEffect(() => {
    getFCMToken();
  }, []);
  const validate = async () => {
    if (!name.trim()) {
      alert('Please enter name!');
      return;
    }

    if (!email.trim()) {
      alert('Please enter email!');
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
    if (!confirmPassword.trim()) {
      alert('Please enter confirm password!');
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords don't match.")
      return;
    }
    if (!mobile.trim()) {
      alert('Please enter mobile');
      return;
    }
    const userId = uuid.v4();
    setModalVisible(true);
    await firestore()
      .collection('Users')
      .doc(userId)
      .set({
        name: name.trim(),
        email: email.trim(),
        password: Base64.encode(password.trim()),
        mobile: mobile.trim(),
        token: token,
        userId: userId,
      })
      .then(() => {
        setModalVisible(false);
        ToastAndroid.show('User Added Successfully!', ToastAndroid.LONG);
        navigation.goBack();
      })
      .catch(error => {
        setModalVisible(false);
        console.log(error.message);
      });
  };
  return (
    <ScrollView style={styles.scrollView}>
      <View style={[styles.container]}>
        <Text style={styles.title}> <AntDesign name="adduser" color="orange" size={30} />Sign Up</Text>
        <TextInput
          placeholder="Enter your username"
          name="name"
          lable="Username"
          type="text"
          value={name}
          required
          style={styles.inputStyle}
          onChangeText={txt => setName(txt)}
        />
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
        <TextInput
          placeholder="Confirm Password"
          name="confirmpassword"
          lable="Confirm Password"
          value={confirmPassword}
          type="password"
          style={styles.inputStyle}
          secureTextEntry
          onChangeText={txt => setConfirmPassword(txt)}
        />
        <TextInput
          placeholder="Enter your phone number"
          name="mobile"
          lable="Phone Number"
          value={mobile}
          maxLength={10}
          style={styles.inputStyle}
          keyboardType={'numeric'}
          numeric    // This prop makes the input to get numeric 
          onChangeText={txt => setMobile(txt)}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={validate}>
          <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>
        <Text
          style={styles.signup}
          onPress={e => {
            navigation.navigate('Login');
          }}>
          Already have an account? Click here to Login
        </Text>
        <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
      </View>
    </ScrollView>
  );
};

export default Register;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: '#000',
    marginTop: 40,
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
  scrollView: {
    marginHorizontal: 20,
  },
});
