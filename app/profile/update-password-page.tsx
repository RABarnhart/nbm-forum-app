import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {}

const UpdatePasswordPage = (props: Props) => {
  return (
    <View style={{ flex: 1 }}>
        <View style={styles.container}>

            {/* --- Title and Back Arrow --- */}
            <View style={styles.header}>
                <Pressable onPress={router.back}>
                    <Icon name="window-close" size={30} />
                </Pressable>
            </View>
        </View>
    </View>
  )
}

export default UpdatePasswordPage

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingTop: 60,
    },
    header: {
        flexDirection: 'row',
        fontSize: 24,
        alignItems: 'center',
        height: 27,
        marginLeft: 30,
        marginBottom: 15
    },
})