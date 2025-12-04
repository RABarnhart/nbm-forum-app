import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/theme';
import PhotoPicker from '../photo-picker';
import * as ImagePicker from 'expo-image-picker';

type Props = {
  onStepComplete: (data: Inputs) => Promise<void>
}

type Inputs = {
  imageUri: string | undefined;
}

const PictureView = ({ onStepComplete }: Props) => {
  const handleProfileCreation = async () => {
        const data: Inputs = {
          imageUri: image
        };
        await onStepComplete(data); 
    };
    
    const handleSkip = () => {
        onStepComplete({ imageUri: undefined });
    };
  
  const [isImageSelected, setisImageSelected] = useState(false)
  const [image, setImage] = useState<string | undefined>(undefined);

  {/* --- Pick Image function --- */}
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access the media library is required.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setisImageSelected(true);
    }
  };

  return (
    <View>
      <Text style={styles.heading}>Upload a Profile Picture</Text>
      <Text style={styles.subtitle}>Let's put a name to a face. Upload a profile picture to complete your profile. This is an optional step. </Text>
      
      {/* --- Image Picker --- */}
      {!isImageSelected ? <PhotoPicker pickImage={pickImage} /> : 
      <View>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: image }} 
            style={styles.profileImage}/>
          <Pressable onPress={pickImage}>
            <Text style={styles.edit}> Edit profile picture</Text>
          </Pressable>
        </View>
      </View>}

      {/* --- Submission Button --- */}
      <Pressable style={styles.nextButton} onPress={handleProfileCreation}>
        <Text style={{ color: 'white', fontSize: 16 }}>Create my Account &rarr;</Text>
      </Pressable>
      <Pressable onPress={handleSkip}>
        <Text style={styles.skip}>Skip for now</Text>
      </Pressable>
    </View>
  )
}

export default PictureView

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'Syne_700Bold',
    fontSize: 25,
    marginTop: 20,
    marginBottom: 12,
    width: '100%'
  },
  subtitle: {
    fontFamily: 'Syne_400Regular',
    fontSize: 16,
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: Colors.main,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 30,
  },
  skip: { 
    fontSize: 16, 
    textDecorationLine: 'underline',
    alignSelf: 'center',
    padding: 20
  },
  imageContainer: {
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  profileImage: {
    width: 175,
    height: 175,
    borderRadius: 100
  },
  edit: {
    fontFamily: 'Syne_400Regular',
    fontSize: 16,
    color: Colors.main,
    textDecorationLine: 'underline',
    padding: 20
  }
})