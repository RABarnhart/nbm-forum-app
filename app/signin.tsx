import IconRocket from '@/assets/icons/icon-rocket';
import ErrorBox from '@/components/error-box';
import { Colors } from '@/constants/theme';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Feather';

type Props = {}

const signin = (props: Props) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1,  }}>
      <StatusBar style="dark" backgroundColor="#ffffff" translucent={false} />

      {/* --- Header Section --- */}
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => {router.replace("/welcome")}}>
            <Text style={{ fontSize: 30 }}>←</Text>
          </Pressable>
          <Text style={styles.title}>NBM</Text>
          <View style={{transform: [{ scale: .5 }, { rotate: '90deg' },],}}>
            <IconRocket color={Colors.main} />
          </View>
        </View>

        <Text style={styles.heading}>Log In</Text>
        <Text style={styles.subtitle}>Enter your details to log into your account.</Text>

        {/* --- Email --- */}
        <Text style={styles.inputHeader}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          placeholder="you@email.com.au"
          value={email}>
        </TextInput>

        {/* --- Password --- */}
        <Text style={styles.inputHeader}>Password</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Enter your password"
            secureTextEntry={!isPasswordVisible}>
          </TextInput>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Icon
            name={isPasswordVisible ? 'eye-off' : 'eye'} 
            size={24}
            color={Colors.grey} 
            />
          </TouchableOpacity>
        </View>

        <Pressable onPress={() => {/*router.replace("/forgot-password")*/}} style={{ alignSelf: 'flex-end' }}>
          <Text style={{ color: Colors.main, fontSize: 14, fontFamily: 'Syne_400Regular' }}>Forgot your password?</Text>
        </Pressable>

        {/* --- Error Messages --- */}
        <ErrorBox message={''/* Password and email do not match */} />

        {/* --- Submission Button --- */}
        <Pressable style={styles.signInButton} onPress={() => {router.replace("/")}}>
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
  )
}

export default signin

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
  },
  title: {
    marginLeft: 80, 
    fontFamily: 'Syne_700Bold', 
    fontSize: 25, 
    color: Colors.main
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
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.grey,
    padding: 10,
  },
  passwordInputContainer:{
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
    iconContainer: {
    alignItems: 'center',
    position: 'absolute',
    right: 10,
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