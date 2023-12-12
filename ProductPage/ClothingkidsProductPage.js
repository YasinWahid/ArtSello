import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import FooterComponent from '../Nav/Footer';
import { styles } from '../styles/cat_pro_styles';
import { addToFavorites } from '../Screen/firestoreFunctions';
import { Linking } from 'react-native';

const ProductCard = ({ imageUrl, name, description, price, userContact }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviewerName, setReviewerName] = useState(''); // Renamed from 'name'
  const [email, setEmail] = useState('');

  const handleWishlist = () => {
    console.log('Added to wishlist');
    const productDetails = {
      name,
      description,
      price,
      imageUrl,
      userContact, 
      // Add other details as needed
    };

    addToFavorites(productDetails);
  };

  const handleContact = () => {
    // Logic for handling contact button press
    const phoneNumber = userContact; // Assuming the userContact object has a 'phone' field

    if (phoneNumber) {
      const dialpadUrl = `tel:${phoneNumber}`;
      Linking.openURL(dialpadUrl)
        .then(() => console.log('Dialpad opened successfully'))
        .catch((error) => console.error('Error opening dialpad:', error));
    } else {
      console.warn('No phone number available for contact');
    }
  };

  const handleStarRating = (selectedRating) => {
    // Logic for handling star rating selection
    setRating(selectedRating);
  };

  const handleReviewChange = (text) => {
    // Logic for handling review input change
    setReview(text);
  };

  const handleNameChange = (text) => {
    // Logic for handling name input change
    setReviewerName(text); // Updated from setName
  };

  const handleEmailChange = (text) => {
    // Logic for handling email input change
    setEmail(text);
  };

  const handleSubmit = () => {
    // Logic for handling form submission
    console.log('Submit button pressed');
    console.log('Name:', name);
    console.log('Email:', email); // Access contactInfo.email instead of email directly
    console.log('Rating:', rating);
    console.log('Review:', review);
    console.log('Contact Information:', userContact);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.price}> {price}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleWishlist}>
          <Text style={styles.buttonText}>Add to Wishlist</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleContact}>
          <Text style={styles.buttonText}>Contact</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.reviewContainer}>
        <Text style={styles.reviewTitle}>Give Rating & Review</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>Give Rating:  </Text>
          {[1, 2, 3, 4, 5].map((num) => (
            <TouchableOpacity
              key={num}
              onPress={() => handleStarRating(num)}
              style={styles.starButton}
            >
              <Ionicons
                name={num <= rating ? 'star' : 'star-outline'}
                size={20}
                color={num <= rating ? '#FFD700' : '#CCC'}
              />
            </TouchableOpacity>
          ))}
        </View>
         <Text style={styles.inputLabel}>Write your review</Text>
      
        <TextInput
          style={styles.reviewInput}
          placeholder="Please give your review here..."
          value={review}
          onChangeText={handleReviewChange}
          multiline
          placeholderTextColor={styles.inputPlaceholder.color}
        />
    <Text style={styles.inputLabel}>Name</Text>
    <TextInput
      style={styles.input}
      placeholder="Please enter your name..."
      value={name}
      onChangeText={handleNameChange}
      placeholderTextColor={styles.inputPlaceholder.color}
    />
        <Text style={styles.inputLabel}>Email</Text>
    <TextInput
      style={styles.input}
      placeholder="Please enter your email..."
      value={email}
      onChangeText={handleEmailChange}
      placeholderTextColor={styles.inputPlaceholder.color}
    />
        <TouchableOpacity  title="Submit" style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText2}>Submit</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};


const ClothingkidsProductPage = ({ route }) => {
  const { product } = route.params;
  const { imageUrl, name, price, description, userContact } = product;


  return (
    <ScrollView>
    <View style={styles.container}>
      <ProductCard
       imageUrl={imageUrl}
       name={name}
          description={description}
          price={price}
          userContact={userContact}
      />
    </View>
    <FooterComponent/>
    </ScrollView>
  );
};

export default ClothingkidsProductPage;