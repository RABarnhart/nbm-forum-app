import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/theme'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import ErrorBox from '../../error-box'
import { router } from 'expo-router'
import { SignUpStep } from '@/app/signup'

type Props = {
  onStepComplete: (data: Inputs) => void;
  handleNext: (nextStep:SignUpStep) => void;
}
type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
};

const DetailsView = ({ onStepComplete, handleNext }: Props) => {
  const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm({
      defaultValues: {
        firstName: '',
        lastName: '',
        email: '',
      },
    });
  
    const onSubmit: SubmitHandler<Inputs> = (data) => {
      onStepComplete(data);
      console.log('Details captured:', data);
      handleNext('Location');
    };

  return (
    <View style={{height: '100%'}}>
      <Text style={styles.heading}>Create your Account</Text>
      <Text style={styles.subtitle}>Enter your details below to start creating your brand new account.</Text>

      {/* First Name */}
      <Text style={styles.inputHeader}>Your name</Text>
      <Controller
        control={control}
        name="firstName"
        rules={{ required: 'Please enter a lastname' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Enter your first name here"
          />
        )}
      />

      {/* Last Name */}
      <Controller
        control={control}
        name="lastName"
        rules={{ required: 'Please enter a last name' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Enter your last name here"
          />
        )}
      />

      {/* Email */}
      <Text style={styles.inputHeader}>Email</Text>
      <Controller
        control={control}
        name="email"
        rules={{ required: 'Oops! It looks like you have not entered an email. This is a required step.', pattern: /^\S+@\S+$/i }}
        render={({ field: { onChange, onBlur, value }, fieldState:{error} }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="you@email.com.au"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />

      {/* --- Error Messages --- */}
      <ErrorBox message={errors.firstName?.message} />
      <ErrorBox message={errors.lastName?.message} />
      <ErrorBox message={
            errors.email?.type === 'pattern' 
              ? 'Invalid email format'
              : errors.email?.message} />

      {/* --- Submission Button --- */}
      <Pressable style={styles.nextButton} onPress={handleSubmit(onSubmit)}>
        <Text style={{ color: 'white', fontSize: 16 }}>Next &rarr;</Text>
      </Pressable>

      {/* --- Footer Section --- */}
      <View style={styles.footer}>
        <Text style={{ color: Colors.main, fontSize: 14 }}>Already have an account? </Text>
        <Pressable onPress={() => {router.replace("/signin")}}>
          <Text style={{ color: Colors.main, fontSize: 14, textDecorationLine: 'underline' }}>Log in here.</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default DetailsView

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
    footer: {
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
  }
})