import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal, Button, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const HomeScreen = () => { // Remove the duplicate HomeScreen definition
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [conversionType, setConversionType] = useState('');
  const navigation = useNavigation();

  const handleButtonPress = (type) => {
    setConversionType(type);
    setModalVisible(true);
  };

  const handleSelectFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      aspect: [16, 9],
      quality: 1,
      videoMaxDuration: 60,
    });

    if (!result.canceled) {
      setSelectedVideo(result.assets[0]);
      setModalVisible(false);
      uploadVideo(result.assets[0].uri);
    }
  };

  const handleSelectFromCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      videoMaxDuration: 60,
    });

    if (!result.canceled) {
      setSelectedVideo(result.assets[0]);
      setModalVisible(false);
      uploadVideo(result.assets[0].uri);
    }
  };

  const uploadVideo = async (uri) => { // uri is the local file path
    setLoading(true);
    setTimeout(() => {
      console.log('Video uploaded:', uri);
      setLoading(false);

      if (conversionType === 'Video to Text') {
        navigation.navigate('VideoToTextOutput', { textOutput: 'This is the extracted text from the video.' });
      } else if (conversionType === 'Video to Audio') {
        navigation.navigate('VideoToAudioOutput', { audioUrl: uri }); // Pass the actual local file URI
      } else if (conversionType === 'Video to Video') {
        navigation.navigate('VideoToVideoOutput', { videoUrl: uri }); // Pass the actual local file URI
      }
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.largeTitle}>Select Your Choice!</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('Video to Text')}>
        <Text style={styles.buttonText}>{'Video to Text'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('Video to Audio')}>
        <Text style={styles.buttonText}>{'Video to Audio'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('Video to Video')}>
        <Text style={styles.buttonText}>{'Video to Video'}</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Video Source</Text>
            <Button title="Gallery" onPress={handleSelectFromGallery} />
            <Button title="Camera" onPress={handleSelectFromCamera} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#b297eb" />
          <Text>Uploading and processing...</Text>
        </View>
      )}

      {selectedVideo && !loading && (
        <View>
          <Text>Video Selected: {selectedVideo.fileName}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e3f4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#b297eb',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  largeTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    margin: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export default HomeScreen; 