import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SignUpStep } from '@/app/signup'
import { Colors } from '@/constants/theme'
import { SubmitHandler, useForm } from 'react-hook-form'

type Props = {
  onNext:(nextStep:SignUpStep) => void
}
type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
};

const PasswordView = ({onNext}: Props) => {
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
        // This is where you would send the data to your API
        console.log('Form Submitted:', data);
        // Alert.alert('Success', 'Account details submitted!');
        onNext('Location');
      };

  return (
    <SafeAreaView>
      <Text>Password</Text>
      {/* --- Submission Button --- */}
      <Pressable style={styles.nextButton} onPress={handleSubmit(onSubmit)}>
        <Text style={{ color: 'white', fontSize: 16 }}>Next &rarr;</Text>
      </Pressable>
    </SafeAreaView>
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
})