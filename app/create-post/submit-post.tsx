import ActiveTagsDropdown from "@/components/posting/active-tags-dropdown";
import ProgressButton from "@/components/progress-button";
import { Colors } from "@/constants/theme";
import { createPost } from "@/services/posts";
import { CreatePostPayload } from "@/types/api";
import { useMutation,  useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {};

const SubmitPost = (props: Props) => {
    const queryClient = useQueryClient();

    const createPostMutation = useMutation({
    mutationFn: (payload: CreatePostPayload) =>
      createPost({
        payload: payload
      }),
    onError: (error) => {
      console.error("Failed to post comment:", error);
    },
  });

  const params = useLocalSearchParams();
  let postData: CreatePostPayload = {
    title: "",
    content: "",
    tags: [],
  };

  /* --- Data Parsing --- */
  if (params.postData && typeof params.postData === "string") {
    try {
      console.log("data to parse: ", params.postData);
      const parsedData = JSON.parse(params.postData);
      if (
        typeof parsedData.title === "string" &&
        typeof parsedData.content === "string" &&
        Array.isArray(parsedData.tags)
      ) {
        postData = parsedData;
      }
    } catch (e) {
      console.error("Failed to parse post data from navigation params", e);
    }
  }

  const { handleSubmit } = useForm<CreatePostPayload>({
    defaultValues: postData,
  });

  const onSubmit: SubmitHandler<CreatePostPayload> = (data) => {
    console.log("Post submitted to API:", data);
    createPostMutation.mutate(data)

    router.push("/home");
  };

  return (
    <View style={styles.container}>
      {/* --- Header and Submission Button --- */}
      <View style={styles.header}>
        <Pressable onPress={router.back}>
          <Icon name="arrow-left" size={30} />
        </Pressable>
        <View style={{ flex: 1 }} />
        <ProgressButton
          text={"Post"}
          iconName={"arrow-right"}
          onPress={handleSubmit(onSubmit)}
        />
      </View>

      {/* --- Review ---*/}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ActiveTagsDropdown selectedTags={postData.tags} />
        <Text style={styles.title}>{postData.title}</Text>
        <Text style={styles.content}>{postData.content}</Text>
      </ScrollView>
    </View>
  );
};

export default SubmitPost;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    paddingVertical: 70,
    paddingHorizontal: 30,
  },
  header: {
    flexDirection: "row",
    fontSize: 24,
    alignItems: "center",
    height: 27,
    marginBottom: 15,
  },
  scrollContent: {
    paddingBottom: 50,
  },
  title: {
    fontFamily: "Syne_700Bold",
    fontSize: 25,
    marginTop: 30,
    marginBottom: 10,
  },
  content: {
    fontFamily: "Syne_400Regular",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 30,
  },
  tagsHeader: {
    fontFamily: "Syne_700Bold",
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5,
    color: Colors.main || "black",
  },
  tagsList: {
    fontFamily: "Syne_400Regular",
    fontSize: 16,
    color: Colors.grey || "gray",
  },
});
