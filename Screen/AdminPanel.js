import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, TouchableOpacity, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, doc, deleteDoc, where,updateDoc,} from 'firebase/firestore';
import { firestore } from '../firebase';
import { getAuth, deleteUser, fetchSignInMethodsForEmail, signInWithEmailAndPassword } from 'firebase/auth';

const Tab = createBottomTabNavigator();

const ManageUsers = ({ users, onDeleteUser, onBlockUser }) => {
  return (
    <View style={styles.container}>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Username</Text>
        <Text style={styles.headerText}>Email</Text>
        <Text style={styles.headerText}>Profile Picture</Text>
        <Text style={styles.headerText}>Actions</Text>
      </View>
      {users.map((user) => (
        <View style={styles.tableContent} key={user.id}>
          <View style={styles.userInfo}>
            <Text style={styles.name}>{user.username}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
          <Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => onBlockUser(user.id)}>
              <Text style={styles.blockButton}>B</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDeleteUser(user.id, user.email)}>
              <Text style={styles.deleteButton}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const ManageProducts = ({ products, onDeleteProduct }) => {
  return (
    <View style={styles.container}>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Title</Text>
        <Text style={styles.headerText}>Price</Text>
        <Text style={styles.headerText}>Image</Text>
        <Text style={styles.headerText}>Actions</Text>
      </View>
      {products.map((product, index) => (
        <View style={styles.tableContent} key={product.id}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>${product.price}</Text>
          <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
          <TouchableOpacity onPress={() => onDeleteProduct(product.id)}>
            <Text style={styles.deleteButton}>X</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const AdminPanel = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      // Fetch Users from Firebase
      const usersCollection = collection(firestore, 'Users');
      const usersSnapshot = await getDocs(usersCollection);
      const userList = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(userList);
    };

    const getProducts = async () => {
      // Fetch Products from Firebase
      const productsCollection = collection(firestore, 'products');
      const productsSnapshot = await getDocs(productsCollection);
      const productList = productsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(productList);
    };

    getUsers();
    getProducts();
  }, []);

  const handleDeleteUser = async (userId, userEmail) => {
    try {
      const auth = getAuth();
  
      // Delete user from Firebase Authentication using the provided email
      await deleteUser(auth, userEmail);
  
      // Delete user document from Firestore
      const userRef = doc(firestore, 'Users', userId);
      await deleteDoc(userRef);
  
      // Update state to reflect the deletion
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  
      console.log(`User with ID ${userId} and email ${userEmail} has been deleted.`);
    } catch (error) {
      console.error('Error deleting user:', error.message);
      // Handle the error appropriately (e.g., show an error message to the user)
    }
  };
  
  
  

  const handleBlockUser = async (userId) => {
    try {
      const userRef = doc(firestore, 'Users', userId);

      // Assuming you have a 'blocked' field in your user document
      await updateDoc(userRef, {
        blocked: true,
      });

      // Update the state to reflect the blocked status
      const updatedUsers = users.map((user) =>
        user.id === userId ? { ...user, blocked: true } : user
      );
      setUsers(updatedUsers);

      console.log(`User with ID ${userId} has been blocked.`);
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      // Delete the product document from the 'products' collection
      const productRef = doc(firestore, 'products', productId);
      await deleteDoc(productRef);

      // Update the state to reflect the deletion
      const updatedProducts = products.filter((product) => product.id !== productId);
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/logo1.png')} style={styles.logo} />
        </View>
      </View>
      <Text style={styles.adminPanelHeader}>Admin Panel</Text>
      <Tab.Navigator>
        <Tab.Screen
          name="Manage Users"
          options={{
            tabBarIcon: ({ color }) => (
              <Image
                source={require('../assets/man-product.png')}
                style={{ tintColor: color, width: 24, height: 24 }}
              />
            ),
          }}
        >
          {() => (
            <ManageUsers
              users={users}
              onDeleteUser={(userId, userEmail) => handleDeleteUser(userId, userEmail)}
              onBlockUser={(userId) => handleBlockUser(userId)}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Manage Products"
          options={{
            tabBarIcon: ({ color }) => (
              <Image
                source={require('../assets/man-user.jpg')}
                style={{ tintColor: color, width: 24, height: 24 }}
              />
            ),
          }}
        >
          {() => <ManageProducts products={products} onDeleteProduct={handleDeleteProduct} />}
        </Tab.Screen>
        <Tab.Screen
          name="Logout"
          options={{
            tabBarIcon: ({ color }) => (
              <Text style={{ color: 'red', fontSize: 24 }}>X</Text>
            ),
          }}
        >
          {() => <Button title="Logout" onPress={handleLogout} color="red" />}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1A',
    padding: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    borderBottomWidth: 2,
    borderBottomColor: '#C1EA5F',
  },
  tableContent: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#C1EA5F',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: '#1C1C1A', // Text color for header text
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    width: 160,
    height: 30,
  },
  adminPanelHeader: {
    color: '#C1EA5F',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  name: {
    color: 'black',
    fontSize: 16,
    flex: 1,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C1EA5F',
    flex: 1,
    marginLeft: 30,
  },
  email: {
    color: 'black',
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 25,
  },
  deleteButton: {
    width: 24,
    height: 24,
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'red',
  },
  item: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 50,
  },
  productDetails: {
    flex: 1,
  },
  userInfo: {
    flex: 2, // Adjust as needed
    marginRight: 10,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 50,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blockButton: {
    width: 24,
    height: 24,
    textAlign: 'center',
    color: 'white',
    marginRight: 5,
    backgroundColor: 'lightblue',
  },
});

export default AdminPanel;
