import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'; // Updated import statements
import { app } from '../firebase';

const auth = getAuth(app);

const RegistrationScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // You can save additional user information like full name and phone number to your database here.
        console.log('Registered with:', user.email);
        navigation.navigate('Login'); // Navigate to the login page after successful registration.
      })
      .catch(error => alert(error.message));
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
         <Text style={styles.logo}>ArtSello</Text> 
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Full Name"
          value={fullName}
          onChangeText={text => setFullName(text)}
          style={styles.input}
        />
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
        <TextInput
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
          style={styles.input}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignUp}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.text}>Already have an Account?</Text>
          <Text style={styles.text2}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default RegistrationScreen;

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
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#87fa92',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
  },
  text: {
    color: 'white',
    fontSize: 16,
    alignItems: 'center',
  },
  text2: {
    color: '#87fa92',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
  logo: {
    fontWeight: 'bold',
    color: 'white',
    fontStyle: 'italic',
    fontSize: 80,
    marginBottom: 30,
  },
});
