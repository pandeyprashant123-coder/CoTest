import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker
import { Entypo } from '@expo/vector-icons';

const ImagePickerComponent = ({ onSelectImage, loading }) => {
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1
      });

      // console.log(result.assets[0].uri);

      if (!result.canceled) {
        onSelectImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  return (
    <TouchableOpacity
      onPress={pickImage}
      disabled={loading}
      style={styles.button}
    >
        <Entypo name='image' size={35} color='#ffffff'/>
    </TouchableOpacity>
  );
};

export default ImagePickerComponent;

const styles = StyleSheet.create({
  button: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  },
  disabledButton: {
    opacity: 0.5
  }
});
