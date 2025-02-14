import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [containerWidth, setContainerWidth] = useState(screenWidth);
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.measure((x: any, y: any, width: React.SetStateAction<number>) => {
        setContainerWidth(width);
      });
    }
  }, []);

  const handleImageLoad = (event: { nativeEvent: { source: { width: any; height: any; }; }; }) => {
    const { width: imgWidth, height: imgHeight } = event.nativeEvent.source;
    setImageDimensions({ width: imgWidth, height: imgHeight });
  };

  const calculateImageHeight = () => {
    if (imageDimensions.width === 0 || imageDimensions.height === 0 || containerWidth === 0) {
      return 0;
    }
    const aspectRatio = imageDimensions.height / imageDimensions.width;
    return containerWidth * aspectRatio;
  };

  return (
    <View style={styles.container}>
      <Onboarding
        showPagination={false} // Removes the dot indicator
        pages={[
          {
            backgroundColor: '#e0e3f4',
            image: (
              <Image
                ref={imageRef}
                style={[styles.img, { height: calculateImageHeight(), width: containerWidth }]}
                source={require('../assets/download5.png')}
                resizeMode="contain"
                onLoad={handleImageLoad}
              />
            ),
            title: <Text style={styles.title}>VisioVox</Text>,
            subtitle: (
              <Text style={styles.subtitle}>
                See What They Say: {'\n'}
                Lip Reading for Enhanced Understanding.
              </Text>
            ),
          },
        ]}
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e3f4',
  },
  img: {
    marginTop: -330,
    borderRadius: 200,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom:10,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  button: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'purple',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});