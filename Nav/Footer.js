import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

const FooterComponent = () => {
  const handleTextClick = () => {
    // Add your logic here for when the text is clicked
    console.log('Text clicked!');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo2.png')}
        style={styles.logo}
      />
      <Text style={styles.textheader}>Our Categories</Text>
      <TouchableOpacity onPress={handleTextClick} style={styles.box}>
        <Text style={styles.text}>   Paintings</Text>
      </TouchableOpacity>
        <TouchableOpacity onPress={handleTextClick} style={styles.box}>
        <Text style={styles.text}>   Pottery</Text>
      </TouchableOpacity>
        <TouchableOpacity onPress={handleTextClick} style={styles.box}>
        <Text style={styles.text}>   Sculptures</Text>
      </TouchableOpacity>

      <Text style={styles.textheader}>Useful Links</Text>
      <TouchableOpacity onPress={handleTextClick} style={styles.box}>
        <Text style={styles.text}>   About Us</Text>
      </TouchableOpacity>
        <TouchableOpacity onPress={handleTextClick} style={styles.box}>
        <Text style={styles.text}>   Privacy Policies</Text>
      </TouchableOpacity>
          <Text style={styles.end}> @2020-2024 | ArtSello.com,Inc.</Text>
    </View>
  );
};

const styles = {
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  logo: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    width: 200,
    height: 50,
    resizeMode: 'stretch',

  },
  box: {
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 14,
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  textheader: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  end: {
    fontSize: 12,
    marginTop: 10,
    fontWeight: 'bold',
   textAlign: 'center',
    color: 'white',
  },
};


export default FooterComponent;