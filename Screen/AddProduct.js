import React, { Component } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { app } from '../firebase';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadString, getDownloadURL, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

class AddProductScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      category: '',
      price: '',
      description: '',
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

    if (!result.canceled) {
      // Use the assets array to access selected assets
      this.setState({ selectedImage: result.assets[0].uri });
    }
  };

  handleAddProduct = async () => {
    const { name, category, price, description, selectedImage } = this.state;
// try to implement a new method instead of base64
    // Convert the selected image URI to a base64-encoded string
    const base64Image = await FileSystem.readAsStringAsync(selectedImage, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Firebase Storage Reference
    const storage = getStorage(app);

    // Generate a unique name for the image (e.g., using a timestamp)
    const imageName = new Date().getTime().toString();

    try {
      // change the base64 method to another to uplaod the image
      // Upload the base64-encoded image to Firebase Storage
      const imageRef = ref(storage, `images/${imageName}`);
      await uploadString(imageRef, `data:image/png;base64,${base64Image}`, 'data_url');

      // Get the download URL for the uploaded image
      const imageUrl = await getDownloadURL(imageRef);

      // Firebase Firestore Reference
      const db = getFirestore(app);

      // Add a new document to the 'products' collection with the image URL
      const docRef = await addDoc(collection(db, 'products'), {
        name,
        category,
        price,
        description,
        imageUrl, // Store the image URL in Firestore
      });

      console.log('Document written with ID: ', docRef.id);

      // Reset form fields and selected image
      this.setState({
        name: '',
        category: '',
        price: '',
        description: '',
        selectedImage: null,
      });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Product Name</Text>
        <TextInput
          value={this.state.name}
          onChangeText={(text) => this.setState({ name: text })}
          style={styles.input}
        />

        {/* Add a button to open the image picker */}
        <TouchableOpacity  title="Select Image" style={styles.button} onPress={this.openImagePicker}>
          <Text style={styles.buttonText2}>Select Image</Text>
        </TouchableOpacity>
        {/* Display the selected image */}
        {this.state.selectedImage && (
          <Image
            source={{ uri: this.state.selectedImage }}
            style={{ width: 200, height: 200 }}
          />
        )}

        <Text style={styles.title}>Product Category</Text>
        <TextInput
          value={this.state.category}
          onChangeText={(text) => this.setState({ category: text })}
          style={styles.input}
        />

        <Text style={styles.title}>Product Price</Text>
        <TextInput
          value={this.state.price}
          onChangeText={(text) => this.setState({ price: text })}
          style={styles.input}
        />

        <Text style={styles.title}>Product Description</Text>
        <TextInput
          value={this.state.description}
          onChangeText={(text) => this.setState({ description: text })}
          style={styles.input}
        />

         <TouchableOpacity  title="Add Product" style={styles.button} onPress={this.handleAddProduct}>
          <Text style={styles.buttonText2}>Add Product</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1A', // Set background color
    padding: 20,
  },
  title: {
    color: '#C1EA5F', // Set title color
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#C1EA5F', // Set button color
    shadowColor: 'lime', // Add shadow
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 10, // Android shadow
    padding: 8,
    borderRadius: 2,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText2: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default AddProductScreen;