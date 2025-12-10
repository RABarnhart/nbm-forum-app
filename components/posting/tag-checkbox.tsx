import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../../constants/theme";

type Props = {
  value: boolean;
  onValueChange: (newValue: boolean) => void;
  tagText: string;
};

const TagCheckbox = ({ value, onValueChange, tagText }: Props) => {
  const handlePress = () => {
    onValueChange(!value);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.row}>
        <Icon
          name={value ? "checkbox-marked" : "checkbox-blank-outline"}
          size={30}
          color={value ? Colors.main : Colors.grey}
          style={styles.icon}
        />
        <Text style={styles.text}>{tagText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TagCheckbox;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontFamily: "Syne_400Regular",
    fontSize: 18,
    color: Colors.darkGrey,
  },
});
