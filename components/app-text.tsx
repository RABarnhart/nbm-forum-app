import { Colors, Fonts } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, TextStyle, View } from "react-native";

type TextVariant = "title" | "heading" | "subheading" | "body" | "detail";

type Props = {
  children: React.ReactNode;
  textStyle: TextVariant;
  underline?: boolean;
  color?: string;
  darkMode?: boolean;
};

const AppText = ({
  children,
  textStyle,
  underline = false,
  color,
  darkMode = false,
}: Props) => {
  const themeColors = darkMode ? Colors.dark : Colors.light;
  const textColor: TextStyle = {
    color: color || themeColors.text,
  };
  const variantStyle = styles[textStyle];
  const optionalStyle: TextStyle = {
    textDecorationLine: underline ? "underline" : "none",
  };

  /* --- Combine all styles --- */
  const combinedStyles = [variantStyle, textColor, optionalStyle];

  return (
    <View>
      <Text style={combinedStyles}>{children}</Text>
    </View>
  );
};

export default AppText;

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontFamily: Fonts.syne.bold,
  } as TextStyle, // Use 'as TextStyle' to satisfy TypeScript for custom font families
  heading: {
    fontSize: 24,
    marginBottom: 10,
    fontFamily: Fonts.syne.bold,
  } as TextStyle,
  subheading: {
    fontSize: 18,
    fontFamily: Fonts.syne.regular,
  } as TextStyle,
  body: {
    fontSize: 16,
    fontFamily: Fonts.syne.regular,
  } as TextStyle,
  detail: {
    fontSize: 12,
    fontFamily: Fonts.syne.regular,
  } as TextStyle,
});
