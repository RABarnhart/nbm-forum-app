import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SignUpStep } from '@/app/signup';
import { Colors } from '@/constants/theme';

type Props = {
  onStepComplete: (data: Inputs) => void;
  handleNext:(nextStep:SignUpStep) => void
}
type Inputs = {
  street: string;
  number: string; 
  city: string;
  state: string;
  postalCode: string;
  fullAddress: string;
  streetName: string;
  streetNumber: string;
  googlePlaceId: string;
  lng: number;
  lat: number;
  country: string; 
  suburb: string;
  postcode: string;
};

const LocationView = ({ onStepComplete, handleNext }: Props) => {
  const [addressData, setAddressData] = useState<Inputs>({
    street: "", 
    number: "0", 
    city: "Brisbane",
    state: "Default State", 
    postalCode: "4000",
    fullAddress: "Unknown Address",
    streetName: "Default Street Name",
    streetNumber: "0",
    googlePlaceId: "default_id",
    lng: 0,
    lat: 0,
    country: "Australia", 
    suburb: "Default Suburb",
    postcode: "0000"
  });
  
  const updateAddressField = (field: keyof Inputs, value: string | number) => {
    setAddressData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
      onStepComplete({...addressData});
      console.log('Location data captured:', addressData.street);
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
        onChangeText={(text) => updateAddressField('street', text)}
        value={addressData.street}
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