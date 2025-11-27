import DetailsView from '@/components/signup/pages/details-view'
import LocationView from '@/components/signup/pages/location-view'
import PasswordView from '@/components/signup/pages/password-view'
import PictureView from '@/components/signup/pages/picture-view'
import React from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { SignUpStep, SignupSteps } from '.'
import { router } from 'expo-router'

type Props = {
  currentStep: SignUpStep,
  setCurrentStep: React.Dispatch<React.SetStateAction<SignUpStep>>
}

type FormData = {
  details: { 
    firstName: string; 
    lastName: string; 
    email: string;
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

  {/* --- Form Submission --- */}
  const handleFormSubmission = async (pictureData: FormData['picture']) => { 
    
    updateSignupData('picture', pictureData);

    const finalPayload = {
      ...signupData.details, 
      telephone: "0400000000",
      password: signupData.password.password,
      confirmPassword: signupData.password.confirmPassword,
      avatar: pictureData.imageUri || null, 
      address: signupData.address, 
    };
    
    console.log('Final Payload:', finalPayload);
    
    // ----------------------------------------------------
    // API CALL IMPLEMENTATION
    // ----------------------------------------------------
    
    try {
      // Replace with your actual API endpoint
      // const response = await axios.post('YOUR_API_ENDPOINT_HERE', finalPayload); 
      // console.log("Account Created!", response.data);
      
      // Navigate on success
      router.replace('/loading'); 
      
    } catch (error) {
      console.error("Signup failed:", error);
      Alert.alert("Sign up failed");
    }
  };

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
