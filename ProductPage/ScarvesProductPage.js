import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import FooterComponent from '../Nav/Footer';
import { styles } from '../styles/cat_pro_styles';

const ProductCard = ({ imageSource, title, description, price }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleWishlist = () => {
    // Logic for handling wishlist button press
    console.log('Added to wishlist');
  };

  const handleContact = () => {
    // Logic for handling contact button press
    console.log('Contact button pressed');
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
    setName(text);
  };

  const handleEmailChange = (text) => {
    // Logic for handling email input change
    setEmail(text);
  };

  const handleSubmit = () => {
    // Logic for handling form submission
    console.log('Submit button pressed');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Rating:', rating);
    console.log('Review:', review);
  };

  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
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
      placeholderTextColor={styles.inputPlaceholder.color}

          multiline
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

const ScarvesProductPage = ({ route }) => {
  const { product } = route.params;
  const { image, name, price, description } = product;
  return (
    <ScrollView>
    <View style={styles.container}>
      <ProductCard
        imageSource={image}
        title={name}
        description={description}
        price={price}
      />
    </View>
    <FooterComponent/>
    </ScrollView>
  );
};


export default ScarvesProductPage;