import { Colors } from "@/constants/theme";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const TAGS = ["Design", "XD", "Figma", "Development", "Javascript", "CSS"];

type Props = {
  selectedTags: string[];
};

const ActiveTagsDropdown = ({ selectedTags }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isTagSelected = (tag: string) => selectedTags.includes(tag);

  return (
    <View style={styles.pickerContainer}>
      {/* --- Dropdown Header  --- */}
      <TouchableOpacity
        style={styles.dropdownHeader}
        onPress={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <View style={{ maxWidth: "90%" }}>
          <Text style={styles.tagsList}>{selectedTags.join(", ")}</Text>
        </View>

        <Icon
          name={isDropdownOpen ? "chevron-up" : "chevron-down"}
          size={24}
          color={"white"}
        />
      </TouchableOpacity>

      {/* --- Dropdown Menu --- */}
      {isDropdownOpen && (
        <View style={styles.dropdownBody}>
          {TAGS.map((tag) => (
            <View key={tag} style={styles.tagItem}>
              <Text style={styles.tagText}>{tag}</Text>
              <Icon
                name={isTagSelected(tag) ? "check" : ""}
                size={20}
                color={isTagSelected(tag) ? Colors.main : Colors.grey}
                style={styles.tagIcon}
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default ActiveTagsDropdown;

const styles = StyleSheet.create({
  pickerContainer: {
    marginTop: 20,
    marginRight: "auto",
  },
  dropdownHeader: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "90%",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: Colors.main,
  },
  dropdownBody: {
    padding: 10,
  },
  tagItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  tagIcon: {
    marginRight: 10,
  },
  tagText: {
    fontFamily: "Syne_400Regular",
    fontSize: 14,
  },
  tagsList: {
    fontFamily: "Syne_400Regular",
    fontSize: 16,
    paddingHorizontal: 12,
    color: "white",
  },
});
