import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Control, Controller, FieldValues } from 'react-hook-form';

// Use generics to ensure type safety with any form structure
type CheckboxInputProps<TFormValues extends FieldValues> = {
    control: Control<TFormValues>;
    name: keyof TFormValues;
    rules?: any; 
    termsText: string;
};

const TermsCheckboxInput = <TFormValues extends FieldValues>({
    control,
    name,
    rules,
    termsText,
}: CheckboxInputProps<TFormValues>) => {
    
    // NOTE: Icon color set to your Colors.main for clarity when checked
    const CHECKED_COLOR = Colors.main;
    const UNCHECKED_COLOR = Colors.grey;

    return (
        <Controller
            control={control}
            name={name as any}
            rules={rules}
            // field: { onChange, value } provides the link to RHF state
            render={({ field: { onChange, value } }) => ( 
                <View style={styles.container}>
                    <View style={styles.row}>
                        <TouchableOpacity
                            // Call RHF's onChange with the toggled boolean value
                            onPress={() => onChange(!value)}
                        >
                            <Icon
                                name={value ? 'checkbox-marked' : 'checkbox-blank-outline'}
                                size={30}
                                color={value ? CHECKED_COLOR : UNCHECKED_COLOR}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                        <Text style={styles.text}>{termsText}</Text>
                    </View>
                </View>
            )}
        />
    );
};

export default TermsCheckboxInput;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 15,
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 10,
    },
    text: {
        flexShrink: 1, 
        fontFamily: 'Syne_400Regular', 
        fontSize: 14,
        color: Colors.grey,
    },
});