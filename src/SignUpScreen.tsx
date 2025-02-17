import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);

    if (!fullName || !email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      // Check if email already exists
      const existingUser = users.find(user => user.email === email);
      if (existingUser) {
        Alert.alert("Error", "Email already exists. Please login.");
        setLoading(false);
        return;
      }

      const newUser = {
        fullName,
        email,
        password, // In a real app, hash the password!
      };

      users.push(newUser);
      await AsyncStorage.setItem('users', JSON.stringify(users));

      Alert.alert("Success", "Signup successful. Please login.");
      navigation.navigate('Login'); // Navigate to Login screen
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert("Error", "An error occurred during signup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.largeTitle}>Sign Up</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#aaa"
          onChangeText={setFullName}
          value={fullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Signing up...' : 'Sign Up'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.link}
          onPress={() => navigation.navigate('Login')} // Navigate to Login screen
        >
          <Text style={styles.linkText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e3f4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    maxWidth: 400,
    alignItems: 'center',
  },
  largeTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize:20
  },
  button: {
    backgroundColor: '#b297eb',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    marginTop: 15,
  },
  linkText: {
    color: '#333',
    textDecorationLine: 'underline',
  },
});

export default SignupScreen;