import { Colors } from "@/constants/theme";
import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

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
  return (
    <Controller
      control={control}
      name={name as any}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <View style={styles.container}>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => onChange(!value)}>
              <Icon
                name={value ? "checkbox-marked" : "checkbox-blank-outline"}
                size={30}
                color={value ? Colors.main : Colors.grey}
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
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  text: {
    flexShrink: 1,
    fontFamily: "Syne_400Regular",
    fontSize: 14,
    color: Colors.grey,
  },
});
