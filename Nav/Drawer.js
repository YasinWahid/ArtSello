import * as React from 'react';
import { Text, View, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StackNavigator } from './Stack';
import Home from '../Screen/Home';
import LoginScreen from '../Screen/LoginScreen';

import Paintings from '../CategoryPages/Paintings';
import KidsClothing from '../CategoryPages/Clothingkids';
import MensClothing from '../CategoryPages/Clothingmen';
import WomensClothing from '../CategoryPages/ClothingWomen';
import Jewellery from '../CategoryPages/Jewellery';
import Pottery from '../CategoryPages/Pottery';
import PrintedPhotography from '../CategoryPages/PrintedPhotography';
import Scarves from '../CategoryPages/Scarves';
import Sculptures from '../CategoryPages/Sculptures';
import TraditionalInstruments from '../CategoryPages/TraditionalInstruments';

import AboutUsScreen from '../Screen/About';
import PrivacyPolicyPage from '../Screen/Privacy';
import Profile from '../Screen/Profile';
import AddProductScreen from '../Screen/AddProduct';
import MyListingsScreen from '../Screen/MyListings';
import SettingsPage from '../Screen/Settings';

const Drawer = createDrawerNavigator();

const CustomHeader = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Image source={require('../assets/menu.png')} style={styles.menuIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
      <Image source={require('../assets/logo1.png')} style={styles.logo} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Image source={require('../assets/profile.png')} style={styles.profileIcon} />
      </TouchableOpacity>
    </View>
  );
};


function DrawerNavigator() {
  return (
    <Drawer.Navigator
    screenOptions={{
      header: (props) => <CustomHeader {...props} />,
      drawerStyle: {
        backgroundColor: '#C1EA5F',
      },
      drawerActiveBackgroundColor: '#8FBE41', 
      drawerActiveTintColor: 'white',
    }}>
       <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Kids Clothing " component={KidsClothing} />
          <Drawer.Screen name="Mens Clothing " component={MensClothing} />
          <Drawer.Screen name="Womens Clothing " component={WomensClothing} />
          <Drawer.Screen name="Jewellery " component={Jewellery} />
          <Drawer.Screen name="Paintings " component={Paintings} />
          <Drawer.Screen name="Pottery " component={Pottery} />
          <Drawer.Screen name="Printed Photography " component={PrintedPhotography} />
          <Drawer.Screen name="Scarves  " component={Scarves} />
          <Drawer.Screen name="Sculptures  " component={Sculptures} />
          <Drawer.Screen name="Traditional  Instruments" component={TraditionalInstruments} />
          <Drawer.Screen name="Privacy Policy" component={PrivacyPolicyPage} />
          <Drawer.Screen name="About Us" component={AboutUsScreen} />
          <Drawer.Screen name="AddProductScreen" component={AddProductScreen} options={{ drawerItemStyle: { display: 'none' }}}  />
          <Drawer.Screen name="Profile" component={Profile} options={{ drawerItemStyle: { display: 'none' }}}  />
          <Drawer.Screen name="MyListings" component={MyListingsScreen} options={{ drawerItemStyle: { display: 'none' }}}  />
          <Drawer.Screen name="Settings" component={SettingsPage} options={{ drawerItemStyle: { display: 'none' }}}  />
         </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: '#1C1C1A',
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
  profileIcon: {
    width: 40,
    height: 40,
    marginLeft: 45,
  },
  logo: {
    width: 160,
    height: 30,
    marginLeft: 80,
  },
});

export default DrawerNavigator;
