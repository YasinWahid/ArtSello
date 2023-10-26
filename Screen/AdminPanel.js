import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, TouchableOpacity, Button,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const sampleUsers = [
  { id: 1, name: 'User 1', email: 'user1@example.com' },
  { id: 2, name: 'User 2', email: 'user2@example.com' },
  // Add more user objects as needed
];

const sampleProducts = [
  { id: 1, name: 'Product 1', price: 10.99 },
  { id: 2, name: 'Product 2', price: 19.99 },
  // Add more product objects as needed
];

// ManageUsers component
const ManageUsers = ({ users, onDeleteUser }) => {
    return (
      <View style={styles.container}>
        {users.map((user, index) => (
          <View style={styles.item} key={user.id}>
            <Text style={styles.name}>{`${index + 1}. ${user.name}`}</Text>
            <Text style={styles.email}>{user.email}</Text>
            <TouchableOpacity onPress={() => onDeleteUser(user.id)}>
              <Text style={styles.deleteButton}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };
  
  // ManageProducts component
  const ManageProducts = ({ products, onDeleteProduct }) => {
    return (
      <View style={styles.container}>
        {products.map((product, index) => (
          <View style={styles.item} key={product.id}>
            <Text style={styles.name}>{`${index + 1}. ${product.name}`}</Text>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
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
  const [users, setUsers] = useState(sampleUsers);
  const [products, setProducts] = useState(sampleProducts);

  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
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
        <Image source={require('../assets/man-product.png')} style={{ tintColor: color, width: 24, height: 24 }} />
      ),
    }}
  >
    {() => <ManageUsers users={users} onDeleteUser={handleDeleteUser} />}
  </Tab.Screen>
  <Tab.Screen
    name="Manage Products"
    options={{
      tabBarIcon: ({ color }) => (
        <Image source={require('../assets/man-user.jpg')} style={{ tintColor: color, width: 24, height: 24 }} />
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
        padding: 20,
      },
      header: {
        alignItems: 'center',
        marginBottom: 20,
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
    item: {
      marginBottom: 15,
      flexDirection: 'row',
      alignItems: 'center',
    },
    name: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      flex: 1,
    },
    email: {
      color: 'white', // Set the email text color to white
      fontSize: 14,
    },
    price: {
      fontSize: 16,
      color: '#C1EA5F',
      flex: 1,
    },
    deleteButton: {
        width: 21,
        height: 21,
      fontSize: 16,
      textAlign: 'center',
      color: 'white',
      marginLeft: 20,
      backgroundColor: 'red',
    },
  });

export default AdminPanel;
