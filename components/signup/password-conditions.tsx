import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/theme'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {}

const PasswordConditions = (props: Props) => {
    return (
    <View>
        <View style={styles.conditionsBox}>
            <Text style={styles.text}>Your password must...</Text>
            <View style={styles.row}>
                <Icon 
                name="numeric" 
                size={30} 
                color={Colors.main}
                style={styles.icon}
                />
                <Text style={styles.text}>Include at least one number (eg. 1)</Text>
            </View>
            <View style={styles.row}>
                <Icon 
                name="bash" 
                size={30} 
                color={Colors.main}
                style={styles.icon}
                />
                <Text style={styles.text}>Include at least one symbol (eg. #)</Text>
            </View>
            <View style={styles.row}>
                <Icon 
                name="format-letter-case" 
                size={30} 
                color={Colors.main}
                style={styles.icon}
                />
                <Text style={styles.text}>Include at least one upper and lowercase character</Text>
            </View>
        </View>
    </View>
  )
}

export default PasswordConditions

const styles = StyleSheet.create({
    conditionsBox: {
        backgroundColor: Colors.lightGrey,
        borderRadius: 10,
        marginVertical: 30,
        padding: 15,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 1
    },
    icon: {
        marginRight: 8, 
        },
    text: {
        fontFamily: 'Syne_400Regular',
    }
})