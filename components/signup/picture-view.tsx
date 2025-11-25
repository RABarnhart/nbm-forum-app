import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SignUpStep } from '@/app/signup';
import { Colors } from '@/constants/theme';
import { router } from 'expo-router';

type Props = {
  onNext:(nextStep:SignUpStep) => void
}
type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
};

const PictureView = ({onNext}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [profilePicUri, setProfilePicUri] = useState('');

  const handleProfileCreation = () => {
    router.replace('/home');
  }

  return (
    <View>
      <Text>Picture</Text>
      {/* --- Submission Button --- */}
      <Pressable style={styles.nextButton} onPress={handleProfileCreation}>
        <Text style={{ color: 'white', fontSize: 16 }}>Next &rarr;</Text>
      </Pressable>
    </View>
  )
}

export default PictureView

const styles = StyleSheet.create({
    nextButton: {
      backgroundColor: Colors.main,
      paddingVertical: 15,
      alignItems: 'center',
      marginTop: 30,
    },
})