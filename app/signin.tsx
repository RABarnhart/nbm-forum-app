import IconRocket from '@/assets/icons/icon-rocket';
import ErrorBox from '@/components/error-box';
import { Colors } from '@/constants/theme';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PasswordInput from '@/components/signup/password-input'; 
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { signIn } from '@/services/auth';
import Loading from '@/components/loading';
import { SignInPayload, SignInResponse } from '@/types/api';
import { saveToken, saveUserId } from '@/services/token';

type Inputs = {
  email: string;
  password: string;
};

const EMAIL_REGEX = /^\S+@\S+$/i;

const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: '',
      password: ''
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data: SignInPayload) => {
    signInMutation.mutate(data);
  };

  const signInMutation = useMutation({
    mutationFn: signIn,
    onSuccess: async (data: SignInResponse) => {
      // Navigate on success
      console.log("Sign in successful!");
      if (data.accessToken)
        {
          await saveToken(data.accessToken);
          await saveUserId(data.user.id.toString());
        } 
      router.replace('/home'); 
    },
    onError: (error: any) => {
      if (axios.isAxiosError(error) && error.response) {
        // Can check for specific error codes
        if (error.response.status === 404) {
          Alert.alert("Sign in Failed", "Account not found");
        } else if (error.response.data.message === "Password does not meet") {
          Alert.alert("Sign in Failed", "Incorrect password")
        } else {
          Alert.alert("Sign in Failed", error.response.data.message)
        }
      }
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {signInMutation.isPending && (<Loading />)}
      <StatusBar style="dark" backgroundColor="white" translucent={false} />

      {/* --- Title and Back Arrow --- */}
      <View style={styles.header}>
        <Pressable onPress={() => {router.replace("/welcome")}}>
          <Text style={{ fontSize: 30 }}>←</Text>
        </Pressable>
      </View>
      <View style={styles.logo}>
        <Text style={styles.title}>NBM</Text>
        <View style={{transform: [{ scale: .5 }, { rotate: '90deg' },],}}>
          <IconRocket color={Colors.main} />
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.heading}>Log In</Text>
        <Text style={styles.subtitle}>Enter your details to log into your account.</Text>

        {/* --- Email Controller --- */}
        <Text style={styles.inputHeader}>Email</Text>
        <Controller
          control={control}
          name="email"
          rules={{ 
            required: 'Email is required',
            pattern: {
              value: EMAIL_REGEX,
              message: 'Invalid email address'
            }
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="you@email.com.au"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />
        {errors.email && <ErrorBox message={errors.email.message} />}

        {/* --- PasswordInput Component --- */}
        <Text style={styles.inputHeader}>Password</Text>
        <PasswordInput
          control={control}
          name="password" // The field name for the sign-in password
          rules={{ required: 'Password is required' }}
          placeholder={"Enter your password"}
        />
        {errors.password && <ErrorBox message={errors.password.message} />}

        <Pressable onPress={() => {/*router.replace("/forgot-password")*/}} style={{ alignSelf: 'flex-end' }}>
          <Text style={{ color: Colors.main, fontSize: 14, fontFamily: 'Syne_400Regular' }}>Forgot your password?</Text>
        </Pressable>

        {/* --- Submission Button --- */}
        <Pressable style={styles.signInButton} onPress={handleSubmit(onSubmit)}>
          <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Syne_400Regular' }}>Log In &rarr;</Text>
        </Pressable>

        {/* --- Footer Section --- */}
        <View style={styles.footer}>
          <Text style={{ color: Colors.main, fontFamily: 'Syne_400Regular', fontSize: 14 }}>Don't have an account? </Text>
          <Pressable onPress={() => {router.replace("/signup")}}>
            <Text style={{ color: Colors.main, fontSize: 14, fontFamily: 'Syne_400Regular', textDecorationLine: 'underline' }}>Create one here.</Text>
          </Pressable>
        </View>
      </View>
                
    </SafeAreaView>
  );
};

export default SignIn

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    padding: 35,
  },
  header: {
    flexDirection: 'row',
    fontSize: 24,
    alignItems: 'center',
    height: 50,
    marginLeft: 30,
  },
  title: {
    fontFamily: 'Syne_700Bold', 
    fontSize: 25, 
    color: Colors.main
  },
  logo: {
    position: 'absolute',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    top: 45,
  },
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
    paddingVertical: 5,
  },
  input: {
    height: 55,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.grey,
    padding: 10,
  },
  signInButton: {
    backgroundColor: Colors.main,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  footer: {
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
  }
});