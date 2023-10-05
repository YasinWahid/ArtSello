import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import FooterComponent from '../Nav/Footer';
import AddProductScreen from './AddProduct';
import {  getAuth } from 'firebase/auth'; // Updated import statements
import { app } from '../firebase';
import LoginScreen from './LoginScreen';
import MyListingsScreen from './MyListings';
import FavoritePage from './Favorite';
import SettingsPage from './Settings';

const auth = getAuth(app);

const Profile = ({ navigation }) => {
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login")
      })
      .catch(error => alert(error.message))
  }
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}> My Account</Text>
        <View style={styles.menu}>
          <Text style={styles.menuItem}>Name: <Text style={styles.menuItem2}>Hamza Khan</Text></Text>
          <Text style={styles.menuItem}>Email: <Text style={styles.menuItem2}>hamza@gmail.com</Text></Text>
          <Text style={styles.menuItem}>Contact: <Text style={styles.menuItem2}>030******77</Text></Text>
          <Text style={styles.menuItem}></Text>
        </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MyListings')}>
            <Text style={styles.buttonText}>My Listings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={() => navigation.navigate('Favorite')}>Favorite</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={() => navigation.navigate('AddProductScreen')} >Add Product</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={() => navigation.navigate('Settings')}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}  onPress={handleSignOut}>
            <Text style={styles.buttonText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FooterComponent/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#1C1C1A',
    padding: 20,
    paddingBottom: '100%', 
  },
  heading: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 2,
    
  },
  menu: {
    backgroundColor: '#1C1C1A',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    elevation: 9,
    shadowColor: '#C1EA5F', // Shadow color
    shadowOpacity: 1,
  },
  menuItem: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    letterSpacing: 2,
    color: 'white',
  },
  menuItem2: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    letterSpacing: 2,
    color: '#C1EA5F',
  },
  buttonContainer: {
    flexDirection: 'column',
    marginTop: 10,
    
  },
  button: {
    marginBottom: 20,
    backgroundColor: '#1C1C1A',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    elevation: 9,
    shadowColor: '#C1EA5F', // Shadow color
    shadowOpacity: 1, // Shadow opacity
  },
  buttonText: {
    textAlign: 'center',
    letterSpacing: 2,
    color: '#C1EA5F',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default Profile;
