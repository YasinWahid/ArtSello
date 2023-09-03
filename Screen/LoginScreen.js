import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View,Image } from 'react-native';
import {  getAuth,  signInWithEmailAndPassword } from 'firebase/auth'; // Updated import statements
import { app } from '../firebase';
import DrawerNavigator from '../Nav/Drawer';
import { color } from 'react-native-reanimated';


const auth = getAuth(app);

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate(DrawerNavigator);
      }
    });

    return unsubscribe;
  }, []);



  const handleLogin = () => {
    console.log('Login button clicked');
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Logged in with:', user.email);
        navigation.navigate(DrawerNavigator);
      })
      .catch(error => alert(error.message));
  }


  const handleRegistration = () => {
    // Navigate to the registration page when the "Register" button is clicked.
    navigation.navigate('RegScreen');
  }
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
     <Text style={styles.logo}>ArtSello</Text> 
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleRegistration}
        >
          <Text style={styles.text}>Don't have an Account?</Text>
          <Text style={styles.text2}>      Register Now</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  text: {
    color: 'white',
    fontSize: 16,
    alignItems: 'center',
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#87fa92',
    width: '100%',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#87fa92',
    fontWeight: '700',
    fontSize: 16,
  },
  logo: {
    fontWeight: 'bold',
    color: 'white',
    fontStyle: 'italic',
    fontSize: 80,
    marginBottom: 30,
  },
  text2: {
    color: '#87fa92',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
});
