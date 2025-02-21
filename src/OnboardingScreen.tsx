// 

import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useVideoPlayer, VideoView } from 'expo-video';
import React, { useCallback } from 'react';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const OnboardingScreen = () => {
  const navigation = useNavigation();

  const videoSource = require('../assets/VisioVox.mp4');
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
  });

  useFocusEffect(
    useCallback(() => {
      if (player) {
        player.play();
      }
      return () => {
        if (player) {
          player.pause();
        }
      };
    }, [player])
  );

  return (
    <View style={styles.container}>
      <Onboarding
        showPagination={false}
        pages={[
          {
            backgroundColor: '#4d1d60',
            image: (
              <View style={styles.videoContainer}>
                <VideoView style={styles.video} player={player} />
                <TouchableOpacity 
                  style={styles.swipeButton} 
                  onPress={() => { /* Handle swipe or navigation here */ }}
                >
                  <Text style={styles.swipeButtonText}>Swipe to Next....</Text>
                </TouchableOpacity>
              </View>
            ),
            title: "",
            subtitle: "",
          },
          {
            backgroundColor: '#e0e3f4',
            title: (
              <Text style={styles.title}>
                VisioVox
              </Text>
            ),
            subtitle: (
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                  <Ionicons name="log-in-outline" size={24} color="white" style={styles.icon} />
                  <Text style={styles.buttonText}>Go to Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
                  <Ionicons name="person-add-outline" size={24} color="white" style={styles.icon} />
                  <Text style={styles.buttonText}>Go to Signup</Text>
                </TouchableOpacity>
              </View>
            ),
            image: (<View />)
          },
        ]}
      />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4d1d60"
  },
  title: {
    fontSize: 68,
    color: '#9400D3',
    textShadowColor: 'rgba(148, 0, 211, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    marginHorizontal: 20,
    color: 'black',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: 'purple',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 8,
  },
  icon: {
    marginRight: 5,
  },
  videoContainer: {
    width: screenWidth,
    height: screenHeight * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#4d1d60"
  },
  video: {
    width: '100%',
    height: '100%',
  },
 
  swipeButton: {
    backgroundColor: 'rgba(0,0,0,0.2)', // Semi-transparent black
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    opacity:0.7,
   top:100, // Space below video
    alignSelf: 'center', // Center the button
  },
  swipeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});