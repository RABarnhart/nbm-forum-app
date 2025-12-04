import { Alert, Pressable, Image, StyleSheet, Text, View, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '@/constants/theme';
import ProgressButton from '@/components/progress-button';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import ErrorBox from '@/components/error-box';

type Props = {}

type Inputs = {
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
}

const EMAIL_REGEX = /^\S+@\S+$/i;
const PHONE_NUMBER_REGEX = /^\d{4}[-\s]?\d{3}[-\s]?\d{3}$/;

const PersonalInformationPage = (props: Props) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            telephone: ''
        },
    });

    const [image, setImage] = useState<string | undefined>(undefined);

    {/* --- Pick Image function --- */}
      const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (!permissionResult.granted) {
          Alert.alert('Permission required', 'Permission to access the media library is required.');
          return;
        }
    
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
    };

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        // TODO: Mutate API
        console.log("Details changed: ", data);
        router.back();
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false} bounces={false}>

            {/* --- Back and Save Buttons --- */}
            <View style={styles.header}>
                <Pressable onPress={router.back}>
                    <Icon name="window-close" size={30} />
                </Pressable>
                <View style={{flex: 1}} />
                <ProgressButton text={"Save"} iconName={"check"} onPress={handleSubmit(onSubmit)}/>
            </View>

            <Text style={styles.heading}>Personal Information</Text>

            {/* --- Change Avatar --- */}
            <View>
                <View style={styles.imageContainer}>
                <Image 
                    source={{ uri: image }} 
                    style={styles.profileImage}/>
                <Pressable onPress={pickImage}>
                    <Text style={styles.edit}> Edit profile picture</Text>
                </Pressable>
                </View>
            </View>

            {/* --- Change Name --- */}
            <Text style={styles.inputHeader}>Your name</Text>
            <Controller
                control={control}
                name="firstName"
                rules={{ required: 'Please enter a first name' }}
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

            {/* --- Change Email --- */}
            <Text style={styles.inputHeader}>Email</Text>
            <Controller
                control={control}
                name="email"
                rules={{ required: 'Please enter an email', pattern: EMAIL_REGEX }}
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

            {/* Telephone */}
            <Text style={styles.inputHeader}>Phone number</Text>
            <Controller
                control={control}
                name="telephone"
                rules={{ required: 'Oops! please enter a phone number', pattern: PHONE_NUMBER_REGEX }}
                render={({ field: { onChange, onBlur, value }, fieldState:{error} }) => (
                <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="0400-000-000"
                    keyboardType="phone-pad"
                    autoCapitalize="none"
                />
                )}
            />

            {/* --- Error Messages --- */}
            <View style={{height: 10}} />
            <ErrorBox message={errors.firstName?.message} />
            <ErrorBox message={errors.lastName?.message} />
            <ErrorBox message={
                    errors.email?.type === 'pattern' 
                    ? 'Invalid email format'
                    : errors.email?.message} />
            <ErrorBox message={
                    errors.telephone?.type === 'pattern' 
                    ? 'Invalid phone number format'
                    : errors.telephone?.message} />
            <View style={{height: 50}} />

        </ScrollView>
    )
}

export default PersonalInformationPage

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingVertical: 70,
        paddingHorizontal: 35,
        flex: 1
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
        marginBottom: 10,
    },
    inputHeader: {
        fontFamily: 'Syne_700Bold',
        fontSize: 16,
        paddingTop: 10,
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
    imageContainer: {
        marginVertical: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileImage: {
        width: 175,
        height: 175,
        borderRadius: 100
    },
    edit: {
        fontFamily: 'Syne_400Regular',
        fontSize: 16,
        color: Colors.main,
        textDecorationLine: 'underline',
        padding: 20
    }
})