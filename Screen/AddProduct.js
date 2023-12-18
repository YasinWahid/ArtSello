import React, { Component } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';
import { Picker } from '@react-native-picker/picker';
import { IconButton } from 'react-native-paper';

class AddProductScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      selectedCategory: 'Kids Clothing', // Initialize with the default category
      price: '',
      description: '',
      selectedImage: null,
      loading: false,
    };
  }
  
  async componentDidMount() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access media library was denied');
    }
  
    // Retrieve user details from route params
    const { userEmail, userContact } = this.props.route.params;
    // You can use userEmail and userContact as needed
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
    const { name, price, description, selectedImage, selectedCategory } = this.state;
    const { userEmail, userContact } = this.props.route.params; // Retrieve user details from route params
    const storage = getStorage(app);
    const imageName = new Date().getTime().toString();

    try {
      this.setState({ loading: true });
      // Upload the selected image to Firebase Storage
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      const imageRef = ref(storage, `images/${imageName}`);
      await uploadBytes(imageRef, blob);

      // Get the download URL for the uploaded image
      const imageUrl = await getDownloadURL(imageRef);

      const db = getFirestore(app);

      // Add user details to the product document
    const docRef = await addDoc(collection(db, 'products'), {
      name,
      category: selectedCategory,
      price,
      description,
      imageUrl,
      userEmail, // Include user email
      userContact, // Include user contact
    });

      console.log('Document written with ID: ', docRef.id);

      // Reset form fields and selected image
      this.setState({
        name: '',
        selectedCategory: 'Category 1', // Reset the selected category
        price: '',
        description: '',
        selectedImage: null,
        loading: false, // Reset loading state after successful upload
      });
    } catch (error) {
      console.error('Error adding document: ', error);
      this.setState({ loading: false }); // Reset loading state on error
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.title}>Product Name</Text>
        <TextInput
          value={this.state.name}
          onChangeText={(text) => this.setState({ name: text })}
          style={styles.input}
        />
         <Text style={styles.title}>Product Image</Text>
         <TouchableOpacity title="Select Image" style={styles.button} onPress={this.openImagePicker}>
          <Text style={styles.buttonText2}>Select Image</Text>
        </TouchableOpacity>
        
        {this.state.selectedImage && (
          <Image source={{ uri: this.state.selectedImage }} style={{ width: 200, height: 200 }} />
        )}
        
        <Text style={styles.title}>Product Category</Text>
        <Picker
          selectedValue={this.state.selectedCategory}
          onValueChange={(itemValue, itemIndex) => this.setState({ selectedCategory: itemValue })}
          style={styles.picker} >
          <Picker.Item label="Kids Clothing" value="Kids Clothing" />
          <Picker.Item label="Mens Clothing" value="Mens Clothing" />
          <Picker.Item label="Womens Clothing" value="Womens Clothing" />
          <Picker.Item label="Jewellery" value="Jewellery" />
          <Picker.Item label="Paintings" value="Paintings" />
          <Picker.Item label="Pottery" value="Pottery" />
          <Picker.Item label="Printed Photography" value="Printed Photography" />
          <Picker.Item label="Scarves" value="Scarves" />
          <Picker.Item label="Sculptures" value="Sculptures" />
          <Picker.Item label="Traditional Instruments" value="Traditional Instruments" />
        </Picker>

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
        <TouchableOpacity title="Add Product" style={styles.button} onPress={this.handleAddProduct}>
          <Text style={styles.buttonText2}>Add Product</Text>
        </TouchableOpacity>
        {this.state.loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#C1EA5F" />
          </View>
        )}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1A',
    padding: 20,
  },
  title: {
    color: '#C1EA5F',
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
    backgroundColor: '#C1EA5F',
    shadowColor: 'lime',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 10,
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
  },
  picker: {
    color: 'black',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddProductScreen;
