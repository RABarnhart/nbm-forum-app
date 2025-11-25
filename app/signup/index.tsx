import IconRocket from '@/assets/icons/icon-rocket'
import SignupProgressBar from '@/components/signup/signup-progress-bar'
import { Colors } from '@/constants/theme'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SignupContent from './signup-content'

type Props = {}

export type SignUpStep = 'Details' | 'Location' | 'Password' | 'Picture';

export const SignupSteps: SignUpStep[] = ['Details', 'Location', 'Password', 'Picture'];

const SignupLayout = (props: Props) => {
    const [currentStep, setCurrentStep] = useState<SignUpStep>('Details')

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

    const handleBack = () => {
        const currentIndex = SignupSteps.indexOf(currentStep);

        if (currentIndex > 0) {
            const prevStep = SignupSteps[currentIndex - 1];
            setCurrentStep(prevStep);
        } else {
            router.replace("/welcome");
        }
    };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, alignContent: 'center'}}>
      <StatusBar style="dark" backgroundColor="#ffffff" translucent={false} />

      {/* --- Title and Back Arrow --- */}
      <View style={styles.header}>
        <Pressable onPress={handleBack}>
          <Text style={{ fontSize: 30 }}>←</Text>
        </Pressable>
        <Text style={styles.title}>NBM</Text>
        <View style={{transform: [{ scale: .5 }, { rotate: '90deg' },],}}>
          <IconRocket color={Colors.main} />
        </View>
      </View>

      {/* --- Progress Bar --- */}
      <SignupProgressBar currentStepIndex={
         SignupSteps.indexOf(currentStep)} />

      {/* --- Current Page Contents --- */}
      <SignupContent currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    handleNext={handleNext}
                    handleBack={handleBack} />
      </SafeAreaView>
    </View>
  )
}

export default SignupLayout

const styles = StyleSheet.create({
    header: {
    flexDirection: 'row',
    fontSize: 24,
    alignItems: 'center',
    height: 50,
    marginLeft: 30,
    marginBottom: 15
  },
    title: {
    marginLeft: 80, 
    fontFamily: 'Syne_700Bold', 
    fontSize: 25, 
    color: Colors.main
  },
})