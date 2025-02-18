import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Clipboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const VideoToTextOutput = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { textOutput } = route.params;

  const copyToClipboard = () => {
    Clipboard.setString(textOutput);
    alert('Text copied to clipboard!');
  };

  const selectAnotherVideo = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Text Output</Text>
      <Text style={styles.outputText}>{textOutput}</Text>
      <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
        <Ionicons name="copy-outline" size={24} color="white" style={styles.icon} />
        <Text style={styles.copyButtonText}>Copy</Text>
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
  outputText: {
    fontSize: 16,
    marginBottom: 20,
  },
  copyButton: {
    backgroundColor: '#b297eb',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  copyButtonText: {
    color: 'white',
    marginLeft: 8,
  },
  selectAnotherButton: {
    backgroundColor: '#b297eb',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selectAnotherButtonText: {
    color: 'white',
    marginLeft: 8,
  },
  icon: {
    marginRight: 5,
  },
});

export default VideoToTextOutput;