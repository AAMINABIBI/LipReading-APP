import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/LoginScreen';
import OnboardingScreen from './src/OnboardingScreen';
import SignUpScreen from './src/SignUpScreen';
import HomeScreen from './src/HomeScreen';
import VideoToTextOutput from './src/VideoToTextOutput';
import VideoToAudioOutput from './src/VideoToAudioOutput';
import VideoToVideoOutput from './src/VideoToVideoOutput';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="OnBoarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="VideoToTextOutput"
          component={VideoToTextOutput}
          options={{ headerShown: true, title: 'Text Output',  
            
           }}
        />
        <Stack.Screen
          name="VideoToAudioOutput"
          component={VideoToAudioOutput}
          options={{ headerShown: true, title: 'Audio Output' }}
        />
        <Stack.Screen
          name="VideoToVideoOutput"
          component={VideoToVideoOutput}
          options={{ headerShown: true, title: 'Video Output' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});