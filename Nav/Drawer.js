import * as React from 'react';
import { Text, View, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../Screen/Home';
import Profile from '../Screen/Profile';
import Paintings from '../Screen/Paintings';
import AboutUsScreen from '../Screen/About';
import PrivacyPolicyPage from '../Screen/Privacy';

const Drawer = createDrawerNavigator();

function mainHome() {
  return (
      <Home/>
  
  );
}

const CustomHeader = ({ navigation }) => {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image source={require('../assets/menu.png')} style={styles.menuIcon} />
        </TouchableOpacity>
        <Image source={require('../assets/logo1.png')} style={styles.logo} />
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={require('../assets/profile.png')} style={styles.profileIcon} />
        </TouchableOpacity>
      </View>
    );
  };

export default function MyDrawer() {
  return (
    <NavigationContainer>
      <Drawer.Navigator  screenOptions={{ header: (props) => <CustomHeader {...props} /> }}>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Paintings" component={Paintings} />
        <Drawer.Screen name="Privacy Policy " component={PrivacyPolicyPage} />
        <Drawer.Screen name="About Screen" component={AboutUsScreen} />
        <Drawer.Screen name="Profile" component={Profile} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: 'black',
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
  profileIcon: {
    width: 40,
    height: 40,
    marginLeft: 40,
  },
  logo: {
    width: 160,
    height: 30,
    marginLeft: 50,
  },
});