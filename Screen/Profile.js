import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import FooterComponent from '../Nav/Footer';
import AddProductScreen from './AddProduct';
import {  getAuth } from 'firebase/auth'; // Updated import statements
import { app } from '../firebase';
import LoginScreen from './LoginScreen';
import MyListingsScreen from './MyListings';

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
          <Text>Email: {auth.currentUser?.email}</Text>
          <Text>Name: {auth.currentUser?.fullName}</Text>
          <Text>Phone Number: {auth.currentUser?.password}</Text>
          <Text style={styles.menuItem}>Email: <Text style={styles.menuItem2}>hamza@gmail.com</Text></Text>
          <Text style={styles.menuItem}>Gender: <Text style={styles.menuItem2}>Male</Text></Text>
          <Text style={styles.menuItem}>Address: <Text style={styles.menuItem2}>****,Abbottabad, Kpk</Text></Text>
          <Text style={styles.menuItem}></Text>
        </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MyListings')}>
            <Text style={styles.buttonText}>My Listings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Favorite</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={() => navigation.navigate('AddProductScreen')} >Add Product</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Settings</Text>
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
    backgroundColor: '#E5FAFE',
    padding: 20,
    paddingBottom: '100%', 
  },
  heading: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 2,
    
  },
  menu: {
    backgroundColor: '#7F9EAA',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  menuItem: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    letterSpacing: 2,
    color: 'black',
  },
  menuItem2: {
    fontWeight: 'bold',
    marginBottom: 10,
    letterSpacing: 2,
    color: '#DCFBED',
  },
  buttonContainer: {
    flexDirection: 'column',
    
  },
  button: {
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#18A6D8',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 2,
    color: '#DCFBED',
    fontSize: 14,
  },
});

export default Profile;
