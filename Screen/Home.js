import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import Paintings from './Paintings';
import FooterComponent from '../Nav/Footer';

const Home = ({ navigation }) => {
  const introImages = [
    { id: '1', image: require('../assets/intro1.png') },
    { id: '2', image: require('../assets/intro2.jpg') },
    { id: '3', image: require('../assets/intro3.jpg') },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FlatList
        data={introImages}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {}}>
            <Image source={item.image} style={styles.image} />
          </TouchableOpacity>
        )}
      />
      <Text style={styles.introText}>WELCOME TO ARTSELLO</Text>
      <Text style={styles.introText2}>Our Categories</Text>
      <TouchableOpacity style={styles.categories} onPress={() => navigation.navigate('Paintings')}>
        <Image
          source={require('../assets/intro3.jpg')}
          style={styles.categoryImage}
        />
        <View style={styles.imageOverlay}>
          <Text style={styles.categoryText}>Paintings</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.categories} onPress={() => navigation.navigate('Paintings')}>
        <Image
          source={require('../assets/intro3.jpg')}
          style={styles.categoryImage}
        />
        <View style={styles.imageOverlay}>
          <Text style={styles.categoryText}>Paintings</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.categories} onPress={() => navigation.navigate('Paintings')}>
        <Image
          source={require('../assets/intro3.jpg')}
          style={styles.categoryImage}
        />
        <View style={styles.imageOverlay}>
          <Text style={styles.categoryText}>Paintings</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.categories} onPress={() => navigation.navigate('Paintings')}>
        <Image
          source={require('../assets/intro3.jpg')}
          style={styles.categoryImage}
        />
        <View style={styles.imageOverlay}>
          <Text style={styles.categoryText}>Paintings</Text>
        </View>
      </TouchableOpacity>
        <TouchableOpacity style={styles.categories} onPress={() => navigation.navigate('Paintings')}>
        <Image
          source={require('../assets/intro3.jpg')}
          style={styles.categoryImage}
        />
        <View style={styles.imageOverlay}>
          <Text style={styles.categoryText}>Paintings</Text>
        </View>
      </TouchableOpacity>
      <FooterComponent/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#D8d8d8',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100, // Adjust this value according to your footer height
  },
  introText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
    color: 'brown',
  },
  introText2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 40,
    color: 'black',
  },
  image: {
    width: 300,
    height: 220,
    marginHorizontal: 3,
    borderRadius: 8,
  },
  categoryImage: {
    width: 300,
    height: 220,
    borderRadius: 8,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  categories: {
    marginBottom: 40,
  },
});

export default Home;
