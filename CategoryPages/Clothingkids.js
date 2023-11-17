import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import FooterComponent from '../Nav/Footer';
import ClothingkidsProductPage from '../ProductPage/ClothingkidsProductPage';
import { styles } from '../styles/cat_pag_styles';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../firebase';

const KidsClothing = ({ navigation }) => {
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]);

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  const isProductInWishlist = (productId) => wishlist.includes(productId);

  useEffect(() => {
    // Retrieve product data from Firebase
    const db = getFirestore(app);
    const productsCollection = collection(db, 'products'); // Replace 'products' with your actual collection name

    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(productsCollection);
        const productsData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          // Assuming you have a 'imageUrl' and 'category' field in your Firestore documents
          const imageUrl = data.imageUrl; // Replace with the actual field name
          return { ...data, imageUrl };
        });

        // Filter products with the category 'Kids Clothing'
        const kidsClothingProducts = productsData.filter((product) => product.category === 'Kids Clothing');
        setProducts(kidsClothingProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>{/* Header content goes here */}</View>
        <View style={styles.pageContent}>
          <View style={styles.productList}>
            {products.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.productItem}
                onPress={() => navigation.navigate('ClothingkidsProductPage', { product: item })}
              >
                <View style={styles.imageContainer}>
                  <Image source={{ uri: item.imageUrl }} style={styles.productImage} resizeMode="cover" />
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
                </View>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <FooterComponent />
      </View>
    </ScrollView>
  );
};

const Stack = createStackNavigator();

const KidsClothingStack = () => (
  <Stack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#C1EA5F',
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'left',
    },
  }}>
    <Stack.Screen name="Kid's Clothings" component={KidsClothing} />
    <Stack.Screen name="ClothingkidsProductPage" component={ClothingkidsProductPage}  options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default KidsClothingStack;
