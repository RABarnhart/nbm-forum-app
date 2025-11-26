import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/theme'
import Icon from 'react-native-vector-icons/Feather';

type Props = {
    pickImage: () => Promise<void>
}

const PhotoPicker = ({ pickImage }: Props) => {
  return (
    <Pressable style={styles.pickerBox} onPress={pickImage}>
        <View style={styles.row}>
            <Icon name="upload" size={30} color={Colors.darkGrey} style={{padding: 30}} />
            <View>
                <Text style={styles.heading}>Select a file</Text>
                <Text style={styles.subheading}>JPG or PNG, file size no more {"\n"}than 10mb</Text>
            </View>
        </View>
    </Pressable>
  )
}

export default PhotoPicker

const styles = StyleSheet.create({
    pickerBox: {
        borderWidth: 2,
        borderColor: Colors.darkGrey,
        borderStyle: 'dashed',
        width: '100%',
        height: '25%',
        marginTop: 10,
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    heading: {
        fontFamily: 'Syne_700Bold',
        color: Colors.darkGrey,
        fontSize: 16,
        paddingBottom: 2
    },
    subheading: {
        fontFamily: 'Syne_400Regular',
        color: Colors.darkGrey,
        fontSize: 16
    }
})