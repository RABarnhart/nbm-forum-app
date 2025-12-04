import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { Colors } from '@/constants/theme'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {}

const ProfileMenu = (props: Props) => {
  const handlePersonalInfoPress = () => {
    router.push('/profile/personal-information-page')
  }
  const handleLocationPress = () => {
    router.push('/profile/location-page')
  }
  const handleUpdatePasswordPress = () => {
    router.push('/profile/update-password-page')
  }
  const handleDeleteAccountPress = () => {
    console.log('Delete Account Pressed')
  }

  return (
    <View style={styles.container}>

        {/* --- Title and Back Arrow --- */}
        <View style={styles.header}>
            <Pressable onPress={router.back}>
            <Text style={{ fontSize: 30 }}>←</Text>
            </Pressable>
        </View>
        <View style={styles.logo}>
            <Text style={styles.title}>Profile</Text>
        </View>

        {/* --- Settings --- */}
        <View>
            <Text style={styles.heading}>Settings</Text>
            <TouchableOpacity style={styles.button} onPress={handlePersonalInfoPress}>
                <Icon name="account" size={35} color={Colors.main} style={{marginHorizontal: 10}} />
                <Text style={styles.buttonText}>Personal Information</Text>
                <Icon name="chevron-right" size={35} color={Colors.grey} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLocationPress}>
                <Icon name="map-marker" size={35} color={Colors.main} style={{marginHorizontal: 10}} />
                <Text style={styles.buttonText}>Location</Text>
                <Icon name="chevron-right" size={35} color={Colors.grey} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleUpdatePasswordPress}>
                <Icon name="lock" size={35} color={Colors.main} style={{marginHorizontal: 10}} />
                <Text style={styles.buttonText}>Update Password</Text>
                <Icon name="chevron-right" size={35} color={Colors.grey} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleDeleteAccountPress}>
                <Icon name="trash-can" size={35} color={Colors.main} style={{marginHorizontal: 10}} />
                <Text style={styles.buttonText}>Delete Account</Text>
                <Icon name="chevron-right" size={35} color={Colors.grey} />
            </TouchableOpacity>
        </View>

        {/* --- Legal --- */}
        <View>
            <Text style={styles.heading}>Legal</Text>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
                <Icon name="book-open-variant" size={35} color={Colors.main} style={{marginHorizontal: 10}} />
                <Text style={styles.buttonText}>Terms of Service</Text>
                <Icon name="chevron-right" size={35} color={Colors.grey} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
                <Icon name="book-open-blank-variant" size={35} color={Colors.main} style={{marginHorizontal: 10}} />
                <Text style={styles.buttonText}>Privacy Policy</Text>
                <Icon name="chevron-right" size={35} color={Colors.grey} />
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default ProfileMenu

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 70,
    flex: 1,
    paddingHorizontal: 25,
  },
  header: {
    flexDirection: 'row',
    fontSize: 24,
    alignItems: 'center',
    height: 27,
    marginBottom: 15
  },
  title: {
    fontFamily: 'Syne_700Bold', 
    fontSize: 28, 
    paddingTop: 25
  },
  heading: {
    fontFamily: 'Syne_700Bold', 
    fontSize: 20, 
    marginTop: 30,
    marginBottom: 10
  },
  logo: {
    position: 'absolute',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    top: 45,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    height: 60,
    backgroundColor: Colors.lightGrey
  },
  buttonText: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Syne_400Regular',
    color: Colors.darkGrey
  },
})