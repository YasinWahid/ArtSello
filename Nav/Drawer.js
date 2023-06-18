import * as React from 'react';
import { Text, View, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../Screen/Home';

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


import ClothingkidsProductPage from '../ProductPage/ClothingkidsProductPage';
import ClothingmenProductPage from '../ProductPage/ClothingmenProductPage';
import ClothingWomenProductPage from '../ProductPage/ClothingWomenProductPage';
import JewelleryProductPage from '../ProductPage/JewelleryProductPage';
import PaintingsProductPage from '../ProductPage/PaintingsProductPage';
import PotteryProductPage from '../ProductPage/PotteryProductPage';
import PrintedPhotographyProductPage from '../ProductPage/PrintedPhotographyProductPage';
import ScarvesProductPage from '../ProductPage/ScarvesProductPage';
import SculpturesProductPage from '../ProductPage/SculpturesProductPage';
import TraditionalInstrumentsProductPage from '../ProductPage/TraditionalInstrumentsProductPage';

import AboutUsScreen from '../Screen/About';
import PrivacyPolicyPage from '../Screen/Privacy';
import Profile from '../Screen/Profile';
import AddProductScreen from '../Screen/AddProduct';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function MainHome() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ClothingkidsProductPage" component={ClothingkidsProductPage} />
      <Stack.Screen name="ClothingmenProductPage" component={ClothingmenProductPage} />
      <Stack.Screen name="ClothingWomenProductPage" component={ClothingWomenProductPage} />
      <Stack.Screen name="JewelleryProductPage" component={JewelleryProductPage} />
      <Stack.Screen name="Paintings" component={PaintingsProductPage} />
      <Stack.Screen name="PotteryProductPage" component={PotteryProductPage} />
      <Stack.Screen name="PrintedPhotographyProductPage" component={PrintedPhotographyProductPage} />
      <Stack.Screen name="ScarvesProductPage" component={ScarvesProductPage} />
      <Stack.Screen name="SculpturesProductPage" component={SculpturesProductPage} />
      <Stack.Screen name="TraditionalInstrumentsProductPage" component={TraditionalInstrumentsProductPage} />
    </Stack.Navigator>
  );
}

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

export default function MyDrawer() {
  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{ header: (props) => <CustomHeader {...props} /> }}>
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
        <Drawer.Screen name="Profile" component={Profile} options={{ drawerItemStyle: { display: 'none' }}}  />
        <Drawer.Screen name="ClothingkidsProductPage" component={MainHome}  options={{ drawerItemStyle: { display: 'none' }}} />
        <Drawer.Screen name="ClothingmenProductPage" component={MainHome}  options={{ drawerItemStyle: { display: 'none' }}} />
        <Drawer.Screen name="ClothingWomenProductPage" component={MainHome}  options={{ drawerItemStyle: { display: 'none' }}} />
        <Drawer.Screen name="JewelleryProductPage" component={MainHome}  options={{ drawerItemStyle: { display: 'none' }}} />
        <Drawer.Screen name="PaintingsProductPage" component={MainHome}  options={{ drawerItemStyle: { display: 'none' }}} />
        <Drawer.Screen name="PotteryProductPage" component={MainHome}  options={{ drawerItemStyle: { display: 'none' }}} />
        <Drawer.Screen name="PrintedPhotographyProductPage" component={MainHome}  options={{ drawerItemStyle: { display: 'none' }}} />
        <Drawer.Screen name="ScarvesProductPage" component={MainHome}  options={{ drawerItemStyle: { display: 'none' }}} />
        <Drawer.Screen name="SculpturesProductPage" component={MainHome}  options={{ drawerItemStyle: { display: 'none' }}} />
        <Drawer.Screen name="TraditionalInstrumentsProductPage" component={MainHome}  options={{ drawerItemStyle: { display: 'none' }}} />
        <Drawer.Screen name="AddProductScreen" component={AddProductScreen}  options={{ drawerItemStyle: { display: 'none' }}} />
       </Drawer.Navigator>
    </NavigationContainer>
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
    backgroundColor: 'black',
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
