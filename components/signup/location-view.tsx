import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SignUpStep } from '@/app/signup';
import { Colors } from '@/constants/theme';

type Props = {
  handleNext:(nextStep:SignUpStep) => void
}
type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
};

const LocationView = ({handleNext}: Props) => {
  const [address, setAddress] = useState('');

  const handleSubmit = () => {
    // Send data out
      console.log('Location data captured:', address);
      handleNext('Password');
    }

  return (
    <View>
      <Text style={styles.heading}>Where are you located?</Text>
      <Text style={styles.subtitle}>Add your address. Select your address from the suggested address below.</Text>
      <Text style={styles.inputHeader}>Enter your address</Text>

      {/* --- Address Input --- */}
      <TextInput
        style={styles.input}
        onChangeText={setAddress}
        value={address}
        placeholder="Start typing..."
      />

      {/* --- Submission Button --- */}
      <Pressable style={styles.nextButton} onPress={handleSubmit}>
        <Text style={{ color: 'white', fontSize: 16 }}>Next &rarr;</Text>
      </Pressable>
    </View>
  )
}

export default LocationView

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
  inputHeader: {
    fontFamily: 'Syne_700Bold',
    fontSize: 16,
    paddingVertical: 5   
  },
  input: {
    height: 50,
    margin: 2,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.grey,
    padding: 10,
  },
    nextButton: {
      backgroundColor: Colors.main,
      paddingVertical: 15,
      alignItems: 'center',
      marginTop: 30,
    },
})