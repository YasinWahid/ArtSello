import React, { Component } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { app } from '../firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

class MyListingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [], // Array to store the products
    };
  }

  async componentDidMount() {
    // Firebase Firestore Reference
    const db = getFirestore(app);

    try {
      // Query the 'products' collection to get all products
      const q = collection(db, 'products');
      const querySnapshot = await getDocs(q);

      // Map the query snapshot to an array of product data
      const products = querySnapshot.docs.map(async (doc) => {
        const productData = doc.data();
        // Get the download URL for the product's image from Firebase Storage
        const imageUrl = await this.getProductImage(productData.imageUrl);
        return {
          id: doc.id,
          ...productData,
          imageUrl,
        };
      });

      // Resolve the promises to fetch all product images
      const resolvedProducts = await Promise.all(products);

      this.setState({ products: resolvedProducts });
    } catch (error) {
      console.error('Error fetching products: ', error);
    }
  }

  // Function to get the download URL of a product image from Firebase Storage
  getProductImage = async (imagePath) => {
    const storage = getStorage(app);
    const imageRef = ref(storage, imagePath);

    try {
      const imageUrl = await getDownloadURL(imageRef);
      return imageUrl;
    } catch (error) {
      console.error('Error fetching product image: ', error);
      return ''; // Return an empty string if there's an error
    }
  };

  renderProductItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.handleProductItemClick(item)}>
        <View>
          {/* Display product information */}
          <Text>{item.productName}</Text>
          <Text>{item.productCategory}</Text>
          <Text>{item.productPrice}</Text>
          <Text>{item.productDescription}</Text>

          {/* Display product image */}
          {item.imageUrl ? (
            <Image source={{ uri: item.imageUrl }} style={{ width: 100, height: 100 }} />
          ) : (
            <Image source={{ uri: 'default_image_uri' }} style={{ width: 100, height: 100 }} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View>
        <Text>Products</Text>
        <FlatList
          data={this.state.products}
          renderItem={this.renderProductItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}

export default MyListingsScreen;
