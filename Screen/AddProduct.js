import React, { Component } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import { app } from '../firebase';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

class AddProductScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: '',
      productCategory: '',
      productPrice: '',
      productDescription: '',
      selectedImage: null, // to store the selected image URI
    };
  }

  async componentDidMount() {
    // Request permission to access the media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access media library was denied');
    }
  }

  openImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      this.setState({ selectedImage: result.uri });
    }
  };

  handleAddProduct = async () => {
    const { productName, productCategory, productPrice, productDescription, selectedImage } = this.state;

    // Convert the selected image URI to a base64-encoded string
    const base64Image = await FileSystem.readAsStringAsync(selectedImage, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Firebase Storage Reference
    const storage = getStorage(app);

    // Generate a unique name for the image (e.g., using a timestamp)
    const imageName = new Date().getTime().toString();

    try {
      // Upload the base64-encoded image to Firebase Storage
      const imageRef = ref(storage, `images/${imageName}`);
      await uploadString(imageRef, `data:image/jpeg;base64,${base64Image}`, 'data_url');

      // Get the download URL for the uploaded image
      const imageUrl = await getDownloadURL(imageRef);

      // Firebase Firestore Reference
      const db = getFirestore(app);

      // Add a new document to the 'products' collection with the image URL
      const docRef = await addDoc(collection(db, 'products'), {
        productName,
        productCategory,
        productPrice,
        productDescription,
        imageUrl, // Store the image URL in Firestore
      });

      console.log('Document written with ID: ', docRef.id);

      // Reset form fields and selected image
      this.setState({
        productName: '',
        productCategory: '',
        productPrice: '',
        productDescription: '',
        selectedImage: null,
      });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  render() {
    return (
      <View>
        <Text>Product Name</Text>
        <TextInput
          value={this.state.productName}
          onChangeText={(text) => this.setState({ productName: text })}
        />

        {/* Add a button to open the image picker */}
        <Button title="Select Image" onPress={this.openImagePicker} />

        {/* Display the selected image */}
        {this.state.selectedImage && (
          <Image
            source={{ uri: this.state.selectedImage }}
            style={{ width: 200, height: 200 }}
          />
        )}

        <Text>Product Category</Text>
        <TextInput
          value={this.state.productCategory}
          onChangeText={(text) => this.setState({ productCategory: text })}
        />

        <Text>Product Price</Text>
        <TextInput
          value={this.state.productPrice}
          onChangeText={(text) => this.setState({ productPrice: text })}
        />

        <Text>Product Description</Text>
        <TextInput
          value={this.state.productDescription}
          onChangeText={(text) => this.setState({ productDescription: text })}
        />

        <Button title="Add Product" onPress={this.handleAddProduct} />
      </View>
    );
  }
}

export default AddProductScreen;
