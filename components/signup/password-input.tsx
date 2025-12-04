import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Control, Controller, FieldValues, Noop, ValidationRule } from 'react-hook-form'
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from '@/constants/theme';

type Props<TFormValues extends FieldValues> = {
    control: Control<TFormValues>,
    name: keyof TFormValues,
    rules: {required?: string,
      pattern?: ValidationRule<RegExp> | undefined
      validate?: ((value: string) => true | string) | undefined
    },
    placeholder?: string,
}

const PasswordInput = <TFormValues extends FieldValues>({control, name, rules, placeholder}: Props<TFormValues>) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
      <Controller
        control={control as any}
        name={name as any}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder={placeholder}
              secureTextEntry={!isPasswordVisible}>
            </TextInput>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Icon
              name={!isPasswordVisible ? 'eye-off' : 'eye'} 
              size={24}
              color={Colors.grey} 
              />
            </TouchableOpacity>
          </View>
        )}
      />
  )
}

export default PasswordInput

const styles = StyleSheet.create({
    input: {
        height: 55,
        width: '99%',
        borderWidth: 1,
        borderColor: Colors.grey,
        padding: 10,
  },
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
  },
    iconContainer: {
        alignItems: 'center',
        position: 'absolute',
        right: 10,
        padding: 10,
  },
})