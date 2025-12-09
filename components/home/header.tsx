import { Colors } from "@/constants/theme";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {};

const Header = (props: Props) => {
  const handleCreatePost = () => {
    router.push("/create-post");
  };

  const handleProfilePress = () => {
    router.push("/profile/profile-menu");
  };

  return (
    <View style={styles.titleView}>
      <Text style={styles.title}>Forum</Text>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={handleCreatePost}>
          <Icon
            name="plus"
            size={40}
            color={Colors.main}
            style={{ alignSelf: "center", padding: 5 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleProfilePress}>
          <Icon
            name="account-circle"
            size={40}
            color={Colors.main}
            style={{ alignSelf: "center", padding: 5 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  titleView: {
    width: "100%",
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Syne_700Bold",
    fontSize: 28,
    marginTop: 20,
    marginBottom: 12,
  },
});
