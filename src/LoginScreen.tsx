import React, { useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      const user = users.find((u) => u.email === email && u.password === password);

      if (user) {
        await AsyncStorage.setItem('userToken', JSON.stringify({ email: user.email }));
        navigation.navigate('Home');
      } else {
        Alert.alert("Error", "Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "An error occurred during login.");
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
        <Text style={styles.title}>Login</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={24} color="#aaa" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={24} color="#aaa" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.link}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
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
  image: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
  },
  content: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    maxWidth: 400,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    flex: 1, // Allow input to take remaining space
    backgroundColor: '#f0f0f0',
    paddingVertical: 15,
    paddingRight:15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 13,
  },
    inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#f0f0f0',
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
    icon: {
    paddingLeft: 15,
    paddingRight: 10,
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
  largeTitle: {
    fontSize: 36,
    fontWeight: 'bold',
  },
});

export default LoginScreen;