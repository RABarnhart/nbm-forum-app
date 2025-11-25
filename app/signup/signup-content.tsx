import { Colors } from '@/constants/theme'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import LocationView from '@/components/signup/location-view'
import DetailsView from '@/components/signup/details-view'
import PasswordView from '@/components/signup/password-view'
import PictureView from '@/components/signup/picture-view'
import { SignUpStep, SignupSteps } from '.'

type Props = {
  currentStep: SignUpStep,
  setCurrentStep: React.Dispatch<React.SetStateAction<SignUpStep>>
  handleNext: () => void
  handleBack: () => void
}
type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  picture: string;
  password: string;
};

const SignupContent = ({currentStep, setCurrentStep, handleNext, handleBack}: Props) => {

    const renderCurrentView = () => {
      console.log(`Current step is ${currentStep}`);
      switch (currentStep) {
        case 'Details':
          return <DetailsView handleNext={handleNext} />;
        case 'Location':
          return <LocationView handleNext={handleNext} />;
        case 'Password':
          return <PasswordView handleNext={handleNext} />;
        case 'Picture':
          return <PictureView handleNext={handleNext} />;
      }
    }

    return (
        <View style={styles.container}>
          {renderCurrentView()}
        </View>
    );
}

export default SignupContent

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    padding: 35,
  },
});
