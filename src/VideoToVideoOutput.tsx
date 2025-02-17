import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { Video } from 'expo-av';
import * as Sharing from 'expo-sharing';

const VideoToVideoOutput = ({ route }) => {
  const { videoUrl } = route.params;
  const video = React.useRef(null);

  const handleDownload = async () => {
    try {
      const isSharingAvailable = await Sharing.isAvailableAsync();
      if (isSharingAvailable) {
        await Sharing.shareAsync(videoUrl, { mimeType: 'video/*' });
      } else {
        Alert.alert(
          'Download Complete',
          "The video file is already on your device. Sharing is not available."
        );
      }
    } catch (error) {
      console.error('Sharing error:', error);
      Alert.alert('Sharing Error', 'An error occurred while sharing the video.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Video Output</Text>
      <Video
        ref={video}
        style={styles.video}
        source={{ uri: videoUrl }}
        useNativeControls
        resizeMode="contain"
        isLooping
      />
      <Button title="Share Video" onPress={handleDownload} />
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
  video: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
});

export default VideoToVideoOutput;