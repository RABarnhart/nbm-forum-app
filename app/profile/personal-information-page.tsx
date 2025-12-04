import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

type Props = {}

const PersonalInformationPage = (props: Props) => {
  return (
    <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>

            {/* --- Title and Back Arrow --- */}
            <View style={styles.header}>
                <Pressable onPress={router.back}>
                <Text style={{ fontSize: 30 }}>←</Text>
                </Pressable>
            </View>
        </View>
    </ScrollView>
  )
}

export default PersonalInformationPage

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