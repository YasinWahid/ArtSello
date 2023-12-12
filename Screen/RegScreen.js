import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { getFirestore, doc, setDoc, getDoc, updateDoc } from '@firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const RegistrationScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const openImagePickerProfile = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setProfilePicture(result.uri);
    }
  };

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Upload the selected image to Firebase Storage
      const response = await fetch(profilePicture);
      const blob = await response.blob();
      const imageName = `profile_${user.uid}`;
      const imageRef = ref(storage, `profileImages/${imageName}`);
      await uploadBytes(imageRef, blob);
  
      // Get the download URL for the uploaded image
      const imageUrl = await getDownloadURL(imageRef);
  
      // Save additional user information to Firestore
      const userDocRef = doc(db, 'Users', user.uid);
      await setDoc(userDocRef, {
        uid: user.uid, // Include user UID
        username: fullName,
        email: email,
        contact: phoneNumber,
        profilePicture: imageUrl,
      });
  
      console.log('Registered with:', user.email);
      navigation.navigate('Login');
    } catch (error) {
      alert(error.message);
    }
  };
  
  
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.logo}>ArtSello</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Full Name"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          style={styles.input}
          keyboardType="phone-pad"
        />
        
        <Text style={styles.title}>Profile Picture</Text>
        <TouchableOpacity title="Select Image" style={styles.button} onPress={openImagePickerProfile}>
          <Text style={styles.buttonText2}>Select Profile Picture</Text>
        </TouchableOpacity>

        {profilePicture && (
          <View style={styles.profilePictureContainer}>
            <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.text}>Already have an Account?</Text>
          <Text style={styles.text2}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

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
  profilePictureContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: '#C1EA5F',
    borderWidth: 2,
    marginTop: 10,
  },
});
