import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/LoginScreen';
import OnboardingScreen from './src/OnboardingScreen';
import SignUpScreen from './src/SignUpScreen';
import HomeScreen from './src/HomeScreen';


const Stack = createNativeStackNavigator();


export default function App() {
  return (

      <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
          headerShown:false}}>
        <Stack.Screen name="OnBoarding" component={OnboardingScreen}></Stack.Screen>
        <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
        <Stack.Screen name="SignUp" component={SignUpScreen}></Stack.Screen>
        <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
   
  );
}

const styles = StyleSheet.create({

});
