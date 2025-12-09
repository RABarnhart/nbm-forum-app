import { Colors } from "@/constants/theme";
import { CommentType } from "@/types/api";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {
  data: CommentType;
};

const Comment = ({ data }: Props) => {
  let replies = data.comments;

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            width: 2,
            backgroundColor: Colors.lightGrey,
            height: "80%",
            marginRight: 20,
            alignSelf: "center",
          }}
        />

        <View style={{ width: "100%" }}>
          {/* --- Author and Date --- */}
          <View style={{ flexDirection: "row", marginTop: 15 }}>
            <Text style={styles.name}>
              {data.user.firstName} {data.user.lastName}
            </Text>
            <Icon
              name="circle-medium"
              size={13}
              color={Colors.main}
              style={{ alignSelf: "center", marginHorizontal: 5 }}
            />
            <Text style={styles.date}>{data.createdAt.slice(0, 10)}</Text>
          </View>

          {/* --- Content --- */}
          <Text style={styles.content}>{data.text}</Text>

          {/* --- Reply --- */}
          <TextInput
            style={styles.input}
            placeholder="Write a reply ..."
            placeholderTextColor={Colors.darkGrey}
          />
        </View>
      </View>

      {/* --- Replies --- */}
      {replies.map((reply, index) => (
        <View style={{ marginLeft: 30 }}>
          <Comment key={index} data={reply} />
        </View>
      ))}
    </>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  name: {
    fontFamily: "Syne_700Bold",
    fontSize: 14,
    color: Colors.darkGrey,
  },
  date: {
    fontFamily: "Syne_400Regular",
    fontSize: 14,
    color: Colors.darkGrey,
  },
  content: {
    fontFamily: "Syne_400Regular",
    fontSize: 14,
    color: Colors.darkGrey,
  },
  input: {
    backgroundColor: Colors.lightGrey,
    fontFamily: "Syne_400Regular",
    fontSize: 14,
    height: 35,
    paddingHorizontal: 20,
    marginTop: 10,
  },
});
