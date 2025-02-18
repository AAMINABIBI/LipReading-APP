import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import * as Sharing from 'expo-sharing';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const VideoToVideoOutput = () => {
  const { videoUrl } = useRoute().params;
  const video = React.useRef(null);
  const navigation = useNavigation();

  const handleDownload = async () => {
    try {
      const isSharingAvailable = await Sharing.isAvailableAsync();
      if (isSharingAvailable) {
        await Sharing.shareAsync(videoUrl, { mimeType: 'video/*' });
      } else {
        Alert.alert('Sharing', 'Sharing is not available on this device.');
      }
    } catch (error) {
      console.error('Sharing error:', error);
      Alert.alert('Sharing Error', 'An error occurred while sharing the video.');
    }
  };

  const selectAnotherVideo = () => {
    navigation.navigate('Home');
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
      <TouchableOpacity style={styles.button} onPress={handleDownload}>
        <Ionicons name="share-outline" size={24} color="white" style={styles.icon} />
        <Text style={styles.buttonText}>Share</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.selectAnotherButton} onPress={selectAnotherVideo}>
        <Ionicons name="videocam-outline" size={24} color="white" style={styles.icon} />
        <Text style={styles.selectAnotherButtonText}>Select Another Video</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: 'purple',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  selectAnotherButton: {
    backgroundColor: '#b297eb',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  selectAnotherButtonText: {
    color: 'white',
    marginLeft: 8,
  },
  icon: {
    marginRight: 5,
  },
});

export default VideoToVideoOutput;