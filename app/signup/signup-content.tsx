import { Colors } from '@/constants/theme'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import LocationView from '@/components/signup/location-view'
import DetailsView from '@/components/signup/details-view'
import PasswordView from '@/components/signup/password-view'
import PictureView from '@/components/signup/picture-view'
import { SignUpStep, SignupSteps } from '.'

type Props = {}
type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  picture: string;
  password: string;
};

const SignupContent = () => {
  const [currentStep, setCurrentStep] = useState<SignUpStep>('Details');

  const handleNext = () => {
    const currentIndex = SignupSteps.indexOf(currentStep);

    if (currentIndex < SignupSteps.length - 1) {
        const nextStep = SignupSteps[currentIndex + 1];
        setCurrentStep(nextStep);
      } else {
        console.log('Signup process complete!');
        router.replace('/welcome'); 
      }
  }

    const renderCurrentView = () => {
      console.log(`Current step is ${currentStep}`);
      switch (currentStep) {
        case 'Details':
          return <DetailsView onNext={handleNext} />;
        case 'Location':
          return <LocationView onNext={handleNext} />;
        case 'Password':
          return <PasswordView onNext={handleNext} />;
        case 'Picture':
          return <PictureView onNext={handleNext} />;
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
