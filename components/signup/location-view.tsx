import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SignUpStep } from '@/app/signup';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';

type Props = {
  onNext:(nextStep:SignUpStep) => void
}
type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
};

const LocationView = ({onNext}: Props) => {
  const [address, setAddress] = useState('');

  const handleNextPress = () => {
      // You can add validation logic here (e.g., check if address is not empty)
      // if (!address.trim()) {
      //     console.warn('Please enter an address.');
      //     // Optionally show an error message
      //     return; 
      // }

      console.log('Location data captured:', address);
      onNext('Password');
    }

  return (
    <SafeAreaView>
      <Text>Location</Text>

      {/* --- Submission Button --- */}
      <Pressable style={styles.nextButton} onPress={handleNextPress}>
        <Text style={{ color: 'white', fontSize: 16 }}>Next &rarr;</Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default LocationView

const styles = StyleSheet.create({
    nextButton: {
      backgroundColor: Colors.main,
      paddingVertical: 15,
      alignItems: 'center',
      marginTop: 30,
    },
})