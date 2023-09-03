import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './Drawer'; // Import the drawer navigator from the DrawerNavigator.js file

function MainNavigation() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}

export default MainNavigation;
