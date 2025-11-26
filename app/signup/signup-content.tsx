import DetailsView from '@/components/signup/pages/details-view'
import LocationView from '@/components/signup/pages/location-view'
import PasswordView from '@/components/signup/pages/password-view'
import PictureView from '@/components/signup/pages/picture-view'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SignUpStep } from '.'

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
          // TODO: change back to Detail view
          return <PictureView handleNext={handleNext} />;
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
