import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import FooterComponent from '../Nav/Footer';

const Profile = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}> My Account</Text>
        <View style={styles.menu}>
          <Text style={styles.menuItem}>Name:</Text>
          <Text style={styles.menuItem}>Email:</Text>
          <Text style={styles.menuItem}>Gender:</Text>
          <Text style={styles.menuItem}>Address:</Text>
          <Text style={styles.menuItem}></Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Favorite</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
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
    backgroundColor: 'white',
    padding: 20,
    paddingBottom: '100%', 
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    letterSpacing: 2,
  },
  menu: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  menuItem: {
    fontWeight: 'bold',
    marginBottom: 10,
    letterSpacing: 2,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 20,
  },
  buttonText: {
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});

export default Profile;
