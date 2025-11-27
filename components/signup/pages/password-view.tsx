import { SignUpStep } from '@/app/signup'
import { Colors } from '@/constants/theme'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import ErrorBox from '../../error-box'
import PasswordConditions from '../password-conditions'
import PasswordInput from '../password-input'
import TermsCheckbox from '../terms-checkbox'

type Props = {
  onStepComplete: (data: Inputs) => void
  handleNext: (nextStep: SignUpStep) => void
}

type Inputs = {
  password: string;
  confirmPassword: string;
  termsAndConditions: boolean;
};

const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const PasswordView = ({ onStepComplete, handleNext }: Props) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        getValues,
        watch
      } = useForm({
        defaultValues: {
          password: '',
          confirmPassword: '',
          termsAndConditions: false
        },
      });
    
      const onSubmit: SubmitHandler<Inputs> = (data) => {
        onStepComplete(data);
        console.log('Password captured:', data);
        handleNext('Picture');
      };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>Let's Secure your Account</Text>
      <Text style={styles.subtitle}>Let's keep your NBM account safe with a secure password.</Text>
      
      {/* --- Create Password --- */}
      <Text style={styles.inputHeader}>Create a Password</Text>
      <PasswordInput 
        control={control}
        name="password"
        rules={{ 
            required: 'Please enter a password',
            pattern: PASSWORD_REGEX, 
        }}
        placeholder={"Enter your password"}/>

      {/* --- Confirm Password --- */}
      <Text style={styles.inputHeader}>Confirm Password</Text>
      <PasswordInput
        control={control}
        name="confirmPassword"
        rules={{ 
            required: 'Please confirm your password',
            validate: (value) => 
                value === getValues('password') || 'Passwords do not match',
        }}
        placeholder={"Re-enter your password"}/>

      <PasswordConditions />

      {/* --- Terms and Conditions Checkbox (Controller) --- */}
      <TermsCheckbox
        control={control}
        name="termsAndConditions"
        rules={{ 
            validate: (value: boolean) => value === true || 'You must agree to the terms and conditions to proceed.' 
        }}
        termsText="By ticking this box, I agree to the terms and conditions of NBM."
      />

      {/* --- Error Messages --- */}
      {errors.termsAndConditions && (
          <ErrorBox message={errors.termsAndConditions.message} />
      )}

      {errors.password?.type === 'required' && (
        <ErrorBox message={errors.password.message} />
      )}

      {errors.password?.type === 'pattern' && (
        <View>
          {/* No Number */}
          {!/(?=.*[0-9])/.test(watch('password')) && (
            <ErrorBox message="Password must include at least one number" />
          )}
          {/* No Symbol */}
          {!/(?=.*[^A-Za-z0-9])/.test(watch('password')) && (
            <ErrorBox message="Password must include at least one symbol" />
          )}
          {/* No Lowercase */}
          {!/(?=.*[a-z])/.test(watch('password')) && (
            <ErrorBox message="Password must include at least one lowercase letter" />
          )}
          {/* No Uppercase */}
          {!/(?=.*[A-Z])/.test(watch('password')) && (
            <ErrorBox message="Password must include at least one uppercase letter" />
          )}
        </View>
      )}

      {/* 3. Second Password: Match Error */}
      {errors.confirmPassword && (
          <ErrorBox message={errors.confirmPassword.message} />
      )}

      {/* --- Submission Button --- */}
      <Pressable style={styles.nextButton} onPress={handleSubmit(onSubmit)}>
        <Text style={{ color: 'white', fontSize: 16 }}>Next &rarr;</Text>
      </Pressable>
    </ScrollView>
  )
}

export default PasswordView

const styles = StyleSheet.create({
  nextButton: {
    backgroundColor: Colors.main,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 30,
  },  
  heading: {
    fontFamily: 'Syne_700Bold',
    fontSize: 23,
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
})