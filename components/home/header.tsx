import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/theme'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {}

const Header = (props: Props) => {
  return (
    <View style={styles.titleView}>
        <Text style={styles.title}>Forum</Text>

        <View style={{flexDirection: 'row'}}>
        <TouchableOpacity>
        <Icon 
            name="plus" 
            size={40} 
            color={Colors.main} 
            style={{alignSelf: 'center', padding: 5}} />
        </TouchableOpacity>
        <TouchableOpacity>
        <Icon 
            name="account-circle" 
            size={40} 
            color={Colors.main} 
            style={{alignSelf: 'center', padding: 5}} />
        </TouchableOpacity>
        </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
        titleView: {
          width: '100%',
          paddingTop: 40,
          paddingBottom: 20,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        title: {
          fontFamily: 'Syne_700Bold',
          fontSize: 28,
          marginTop: 20,
          marginBottom: 12,
        },
})