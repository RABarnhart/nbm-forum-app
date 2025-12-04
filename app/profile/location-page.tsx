import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProgressButton from '@/components/progress-button';
import { Colors } from '@/constants/theme';

type Props = {}

type Inputs = {
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

const LocationPage = (props: Props) => {
    const [addressData, setAddressData] = useState<Inputs>({
        street: "123 Computer st", 
        number: "0", 
        city: "Brisbane",
        state: "Default State", 
        postalCode: "4000",
        fullAddress: "Unknown Address",
        streetName: "Default Street Name",
        streetNumber: "0",
        googlePlaceId: "default_id",
        lng: 0,
        lat: 0,
        country: "Australia", 
        suburb: "Default Suburb",
        postcode: "0000"
    });

    const handleSave = () => {
        // TODO: Mutate data in API
        console.log("Updated Address: ", addressData);
        router.back();
    }

  return (
    <View style={{ flex: 1 }}>
        <View style={styles.container}>

            {/* --- Back and Save Buttons --- */}
            <View style={styles.header}>
                <Pressable onPress={router.back}>
                    <Icon name="window-close" size={30} />
                </Pressable>
                <View style={{flex: 1}} />
                <ProgressButton text={"Save"} iconName={"check"} onPress={handleSave}/>
            </View>

            {/* --- Change Location --- */}
            <Text style={styles.heading}>Location</Text>
            <Text style={styles.inputHeader}>Your address</Text>
            
            {/* --- Address Input --- */}
            <TextInput
            style={styles.input}
            // TODO: replace with Google API
            onChangeText={() => {}/*(text) => setAddress('street', text)*/}
            value={addressData.street}
            placeholder="Start typing..."
            />
            
        </View>
    </View>
  )
}

export default LocationPage

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white',
        paddingTop: 70,
        paddingHorizontal: 35
    },
    header: {
        flexDirection: 'row',
        fontSize: 24,
        alignItems: 'center',
        height: 27,
        marginBottom: 15
    },
    heading: {
        fontFamily: 'Syne_700Bold', 
        fontSize: 20, 
        marginTop: 30,
        marginBottom: 10
    },
    inputHeader: {
        fontFamily: 'Syne_700Bold',
        fontSize: 16,
        paddingTop: 20,
        paddingVertical: 5   
      },
    input: {
        height: 50,
        margin: 2,
        width: '100%',
        borderWidth: 1,
        borderColor: Colors.main,
        padding: 10,
    },
})