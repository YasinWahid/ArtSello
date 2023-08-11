import React, { useState } from 'react';
import { View, TextInput, Button, Image, TouchableOpacity, Text,StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const AddProductScreen = () => {
  const [assets, setAssets] = useState([]);
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const handleImageSelection = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to select an image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      multiple: true, // Allow multiple image selection
    });

    if (!result.canceled) {
      setAssets(result.assets); // Store selected assets in the assets state variable
    }
  };

  const handleCategorySelection = (categoryValue) => {
    setCategory(categoryValue);
    setShowCategoryDropdown(false);
  };

  const handleAddProduct = () => {
    // Add logic to save the product details and assets to a database or perform desired actions
    console.log('Product details:', {
      assets,
      category,
      name,
      price,
      description,
    });
  };

  const categoryData = [
    { label: 'Kids Clothing', value: 'kidsClothing' },
    { label: 'Mens Clothing', value: 'MensClothing' },
    { label: 'Womens Clothing', value: 'WomensClothing' },
    { label: 'Jewellery', value: 'Jewellery' },
    { label: 'Paintings', value: 'Paintings' },
    { label: 'Pottery', value: 'Pottery' },
    { label: 'Printed Photography', value: 'PrintedPhotography' },
    { label: 'Scarves', value: 'Scarves' },
    { label: 'Sculptures', value: 'Sculptures' },
    { label: 'Traditional Instruments', value: 'TraditionalInstruments' },
  ];

  return (
    <View style={styles.container}>
      <Button title="Select Image" onPress={handleImageSelection}/>
      {assets.map((asset) => (
        <Image key={asset.uri} source={{ uri: asset.uri }} style={{ width: '100%', height: 200 }} />
      ))}
      <Text style={styles.inputLabel}>Choose Your Category</Text>
      <TouchableOpacity
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }}
        onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
      >
        <Text>{category || 'Choose Category'}</Text>
        {showCategoryDropdown && (
          <View style={{ marginTop: 10 }}>
            {categoryData.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={{ padding: 10 }}
                onPress={() => handleCategorySelection(item.value)}
              >
                <Text>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </TouchableOpacity>
      <Text style={styles.inputLabel}>Enter Product Name</Text>
      <TextInput
        placeholder="Product Name"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
      />
      <Text style={styles.inputLabel}>Enter Product Price</Text>
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={(text) => setPrice(text)}
        style={styles.input}
      />
      <Text style={styles.inputLabel}>Enter Product Description</Text>
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
        style={styles.desInput}
      />
      <Button style={styles.buttonText} title="Add Product" onPress={handleAddProduct}  />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5FAFE',
    padding: 20,
    paddingBottom: '100%', 
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  desInput: {
    width: '100%',
    height: 200,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default AddProductScreen;
