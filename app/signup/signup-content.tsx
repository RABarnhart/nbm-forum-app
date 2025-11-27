import DetailsView from '@/components/signup/pages/details-view'
import LocationView from '@/components/signup/pages/location-view'
import PasswordView from '@/components/signup/pages/password-view'
import PictureView from '@/components/signup/pages/picture-view'
import React from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { SignUpStep, SignupSteps } from '.'
import { router } from 'expo-router'
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '@/services/auth';
import { RegisterPayload } from '@/types/api'
import axios from 'axios';
import Loading from '@/components/loading'

type Props = {
  currentStep: SignUpStep,
  setCurrentStep: React.Dispatch<React.SetStateAction<SignUpStep>>
}

type FormData = {
  details: { 
    firstName: string; 
    lastName: string; 
    email: string;
    telephone: string;
  };
  address: { 
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
  password: { 
    password: string; 
    confirmPassword: string;
  };
  picture: { 
    imageUri: string | undefined; 
  };
};

const SignupContent = ({currentStep, setCurrentStep}: Props) => {

  {/* --- Form Data useState --- */}
  const [signupData, setSignupData] = React.useState<FormData>({
      details: {} as FormData['details'],
      address: {} as FormData['address'],
      password: {} as FormData['password'],
      picture: { imageUri: undefined },
    });

  {/* --- Update data from components --- */}
  const updateSignupData = (step: keyof FormData, data: any) => {
      setSignupData(prevData => ({
        ...prevData,
        [step]: data,
      }));
    };

  {/* --- Handle next button press --- */}
  const handleNext = () => {
    const currentIndex = SignupSteps.indexOf(currentStep);

    if (currentIndex < SignupSteps.length - 1) {
        const nextStep = SignupSteps[currentIndex + 1];
        setCurrentStep(nextStep);
      } else {
        console.log('Signup process complete!');
        router.replace('/welcome'); 
      }
  };

  {/* --- Content area --- */}
  const renderCurrentView = () => {
    console.log(`Current step is ${currentStep}`);
    switch (currentStep) {
      case 'Details':
        return <DetailsView 
          onStepComplete={(data) => updateSignupData('details', data)} 
          handleNext={handleNext} />;
      case 'Location':
        return <LocationView 
          onStepComplete={(data) => updateSignupData('address', data)} 
          handleNext={handleNext} />;
      case 'Password':
        return <PasswordView 
          onStepComplete={(data) => updateSignupData('password', data)}
          handleNext={handleNext} />;
      case 'Picture':
        return <PictureView onStepComplete={handleFormSubmission}/>;
      }
    }

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data: any) => {
      // Navigate on success
      console.log("Registration Successful:", data);
      router.replace('/home'); 
    },
    onError: (error: any) => {
      console.error("Signup failed:", error);
      if (axios.isAxiosError(error) && error.response) {
        // 409: Conflict
        if (error.response.status === 409) {
          Alert.alert("Registration Failed", "This account already exists with this email or phone number. Did you mean to log in?");
        } else {
          Alert.alert("Registration Failed", error.response.data.message);
        }
      }
    },
  });

  {/* --- Form Submission / Registration API call --- */}
  const handleFormSubmission = async (pictureData: FormData['picture']) => { 
    
    const finalDataSnapshot: FormData = { 
      ...signupData, 
      picture: pictureData
    };

    const finalPayload = {
      ...signupData.details,
      password: signupData.password.password,
      confirmPassword: signupData.password.confirmPassword,
      avatar: pictureData.imageUri || null, 
      address: signupData.address, 
    } as RegisterPayload;
    
    console.log('Final Payload:', finalPayload);
    
    registerMutation.mutate(finalPayload);
  };

  return (
    <>
      {registerMutation.isPending && (<Loading />)}
      <View style={styles.container}>
        {renderCurrentView()}
      </View>
    </>
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
