import { StyleSheet, Text, View, TextStyle } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather'; 
import { Colors } from '@/constants/theme';

type Props = {
    message: string | null | undefined;
}

const ErrorBox = ({message}: Props) => {
  if (!message) return null;

  return (
    <View style={styles.errorBox}>
      <Icon 
        name="alert-circle" 
        size={20} 
        color={Colors.errorRed}
        style={styles.icon}
      />
      
      <Text style={styles.errorText}>
        {message}
      </Text>
    </View>
  );
};

export default ErrorBox

const styles = StyleSheet.create({
    errorBox: {
        flexDirection: 'row', 
        alignItems: 'center',
        backgroundColor: Colors.errorPink,
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 10,
    },
    icon: {
        marginRight: 8, 
    },
    errorText: {
        flexShrink: 1, 
        fontFamily: 'Syne_400Regular',
        fontSize: 14,
    },
});