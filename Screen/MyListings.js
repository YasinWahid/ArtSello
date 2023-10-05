import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
// Initialize Firebase (You should initialize Firebase with your config)
import { app } from '../firebase';

const MyListingsScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Function to toggle products in the wishlist
  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  // Function to check if a product is in the wishlist
  const isProductInWishlist = (productId) => wishlist.includes(productId);

  // Function to fetch products from Firestore
  const fetchProducts = async () => {
    const db = getFirestore(app);
    const productsCollection = collection(db, 'products');

    try {
      const querySnapshot = await getDocs(productsCollection);
      const productsData = [];

      querySnapshot.forEach((doc) => {
        const product = doc.data();
        productsData.push({
          id: doc.id,
          ...product,
        });
      });

      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products: ', error);
    }
  };

  // Fetch products from Firestore on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <View style={styles.productItemContent}>
        <Image source={{ uri: item.imageUrl }} style={styles.productImage} resizeMode="cover" />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>{item.price}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.wishlistButton,
          { backgroundColor: isProductInWishlist(item.id) ? 'red' : 'rgba(0, 0, 0, 0.6)' },
        ]}
        onPress={() => toggleWishlist(item.id)}
      >
        <Ionicons
          name={isProductInWishlist(item.id) ? 'heart' : 'heart-outline'}
          size={24}
          color="#fff"
          style={styles.wishlistIcon}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
    <View >
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      
    </View>
    
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1A',
    padding: 16,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  productItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#C1EA5F',
  },
  productPrice: {
    fontSize: 16,
    color: 'white',
  },
  wishlistButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wishlistIcon: {
    fontSize: 24,
  },
});

export default MyListingsScreen;
