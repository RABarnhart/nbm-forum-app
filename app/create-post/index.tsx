import ProgressButton from "@/components/progress-button";
import { Colors } from "@/constants/theme";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {};

type Inputs = {
  title: string;
  content: string;
};

const Index = (props: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  /* --- Error Display --- */
  useEffect(() => {
    const titleError = errors.title;
    if (titleError) {
      Alert.alert("Oops!", titleError.message);
    }
  }, [errors.title]);

  useEffect(() => {
    const contentError = errors.content;
    if (contentError) {
      Alert.alert("Oops!", contentError.message);
    }
  }, [errors.content]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    router.push({
      pathname: `/create-post/category`,
      params: {
        postData: JSON.stringify(data),
      },
    });
  };

  return (
    <View style={styles.container}>
      {/* --- Back and Save Buttons --- */}
      <View style={styles.header}>
        <Pressable onPress={router.back}>
          <Icon name="window-close" size={30} />
        </Pressable>
        <View style={{ flex: 1 }} />
        <ProgressButton
          text={"Next"}
          iconName={"arrow-right"}
          onPress={handleSubmit(onSubmit)}
        />
      </View>

      <ScrollView>
        {/* --- Title --- */}
        <Controller
          control={control}
          name="title"
          rules={{
            required: "Title required",
          }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <TextInput
              style={styles.inputTitle}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter post title..."
              placeholderTextColor={Colors.darkGrey}
            />
          )}
        />

        {/* --- Content --- */}
        <Controller
          control={control}
          name="content"
          rules={{
            required: "Post content is required",
          }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <TextInput
              style={styles.inputContent}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              multiline
              placeholder="Enter your body text..."
              placeholderTextColor={Colors.darkGrey}
            />
          )}
        />
      </ScrollView>
    </View>
  );
};

export default Index;

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
  inputTitle: {
    fontFamily: "Syne_700Bold",
    fontSize: 25,
    marginTop: 30,
    marginBottom: 10,
  },
  inputContent: {
    fontFamily: "Syne_400Regular",
    height: "100%",
    alignContent: "flex-start",
  },
});
