import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import FooterComponent from '../Nav/Footer';
import { styles } from '../styles/cat_pag_styles';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { app } from '../firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addToFavorites } from '../Screen/firestoreFunctions';
import ProductPage from '../ProductPage/ProductPage';


const TraditionalInstruments = ({ navigation }) => {
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]);
  const [userDetails, setUserDetails] = useState(null);

  const toggleWishlist = async (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
  
      // Find the selected product
      const selectedProduct = products.find((product) => product.id === productId);
  
      // Fetch the userContact from the Users collection
      try {
        const userRef = doc(getFirestore(app), 'Users', userDetails?.uid);
        const userDoc = await getDoc(userRef);
  
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const userContact = userData.contact;
  
          // Extract only the required data
          const { description, imageUrl, name, price } = selectedProduct;
  
          // Add userContact to the selected product
          const productWithUserContact = { description, imageUrl, name, price, userContact };
  
          // Call addToFavorites function to add the specific data to the wishlist
          await addToFavorites(productWithUserContact, userDetails?.uid);
        } else {
          console.log('User document does not exist');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }
  };

  const isProductInWishlist = (productId) => wishlist.includes(productId);

  useEffect(() => {
    const db = getFirestore(app);
    const productsCollection = collection(db, 'products');

    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(productsCollection);
        const productsData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id; // Get the Firestore document ID
          const imageUrl = data.imageUrl;
          return { id, ...data, imageUrl };
        });

        // Filter products with the category 'Kids Clothing' and userEmail not matching
        const filteredProducts = productsData.filter(
          (product) => product.category === 'Traditional Instruments' && product.userEmail !== userDetails?.email
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, 'Users', user.uid);

        try {
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserDetails(userData);
          } else {
            console.log('User document does not exist');
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      } else {
        // Handle the case when the user is not logged in
        setUserDetails(null);
      }
    });

    fetchProducts();

    // Cleanup the auth state listener when the component unmounts
    return () => unsubscribe();
  }, [userDetails?.email, wishlist]);

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
                  onPress={() => navigation.navigate('ProductPage', { productId: item.id, product: item })}

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

const TraditionalInstrumentsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Traditional Instruments" component={TraditionalInstruments} />
  </Stack.Navigator>
);

export default TraditionalInstrumentsStack;