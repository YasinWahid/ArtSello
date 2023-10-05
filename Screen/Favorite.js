// FavoritePage.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FavoritePage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Products</Text>
      {/* Add your favorite products here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C1C1A'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#C1EA5F',
  },
});

export default FavoritePage;
