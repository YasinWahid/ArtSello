import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import FooterComponent from '../Nav/Footer';

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
          multiline
        />
    <Text style={styles.inputLabel}>Name</Text>
    <TextInput
      style={styles.input}
      value={name}
      onChangeText={handleNameChange}
    />
        <Text style={styles.inputLabel}>Email</Text>
    <TextInput
      style={styles.input}
      value={email}
      onChangeText={handleEmailChange}
    />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const JewelleryProductPage = ({ route }) => {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCFBED',
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingBottom: '100%',
  },
  image: {
    width: 350,
    height: 300,
    borderRadius: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  reviewContainer: {
    width: 350,
    marginTop: 40,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  ratingText: {
    marginRight: 5,
    fontWeight: 'bold',
  },
  starButton: {
    marginRight: 5,
  },
  reviewInput: {
    width: '100%',
    height: 200,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
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
  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default JewelleryProductPage;