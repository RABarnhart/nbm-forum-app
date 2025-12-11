import { Colors } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {
  iconName?: string;
  text: string;
  onPress: () => void;
};

const ProgressButton = ({ iconName = "", text, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Icon name={iconName} size={20} color={"white"} />
    </TouchableOpacity>
  );
};

export default ProgressButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.main,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    width: 100,
  },
  text: {
    fontFamily: "Syne_400Regular",
    color: "white",
    fontSize: 16,
    paddingHorizontal: 10,
  },
});
