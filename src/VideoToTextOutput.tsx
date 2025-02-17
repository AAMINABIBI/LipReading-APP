import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Clipboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Install: npx expo install @expo/vector-icons

const VideoToTextOutput = ({ route }) => {
  const { textOutput } = route.params;

  const copyToClipboard = () => {
    Clipboard.setString(textOutput);
    alert('Text copied to clipboard!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Text Output</Text>
      <Text style={styles.outputText}>{textOutput}</Text>
      <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
        <Ionicons name="copy-outline" size={24} color="white" />
        <Text style={styles.copyButtonText}>Copy</Text>
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
  },
  copyButtonText: {
    color: 'white',
    marginLeft: 8,
  },
});

export default VideoToTextOutput;