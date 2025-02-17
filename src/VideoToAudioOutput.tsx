import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import * as Sharing from 'expo-sharing';

const VideoToAudioOutput = ({ route }) => {
  const { audioUrl } = route.params;

  const handleDownload = async () => {

    setImmediate(async()=>{
        try {
           // console.log('Audio URL:', audioUrl);
           // console.log("Audio URL Data Type:", typeof audioUrl);
          const isSharingAvailable = await Sharing.isAvailableAsync();
          if (isSharingAvailable) {
            await Sharing.shareAsync(audioUrl, { mimeType: 'audio/*' });
          } else {
            Alert.alert(
              'Download Complete',
              "The audio file is already on your device. Sharing is not available."
            );
          }
        } catch (error) {
          console.error('Sharing error:', error);
          Alert.alert('Sharing Error', 'An error occurred while sharing the audio.');
        }
    },500)
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Audio Output</Text>
      <Text>Audio URL: {audioUrl}</Text>
      <Button title="Share Audio" onPress={handleDownload} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default VideoToAudioOutput;