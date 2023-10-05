import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../Screen/Home';
import LoginScreen from '../Screen/LoginScreen';



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

import AddProductScreen from '../Screen/AddProduct';
import DrawerNavigator from './Drawer';
import RegistrationScreen from '../Screen/RegScreen';
import MyListingsScreen from '../Screen/MyListings';
import FavoritePage from '../Screen/Favorite';
import SettingsPage from '../Screen/Settings';

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login"  screenOptions={{
        headerMode: 'none', 
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="RegScreen" component={RegistrationScreen} />
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
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
      <Stack.Screen name="AddProductScreen" component={AddProductScreen} />
      <Stack.Screen name="MyListings" component={MyListingsScreen} />
      <Stack.Screen name="Favorite" component={FavoritePage} />
      <Stack.Screen name="Settings" component={SettingsPage} />

    </Stack.Navigator>
      </NavigationContainer>
  );
}

export default StackNavigator;
