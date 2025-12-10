import TagCheckbox from "@/components/posting/tag-checkbox";
import ProgressButton from "@/components/progress-button";
import { CreatePostPayload } from "@/types/api";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {};
type PageData = {
  title: string;
  content: string;
};
type Inputs = {
  tags: string[];
};

const TAGS = ["Design", "XD", "Figma", "Development", "Javascript", "CSS"];

const Category = (props: Props) => {
  const params = useLocalSearchParams();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      tags: [],
    },
  });

  /* --- Error Display --- */
  useEffect(() => {
    const tagsError = errors.tags;
    if (tagsError) {
      Alert.alert("Oops!", tagsError.message);
    }
  }, [errors.tags]);

  /* --- Tag Toggle --- */
  const handleTagToggle = (
    currentTags: string[],
    tagToToggle: string,
    isSelected: boolean,
  ): string[] => {
    if (isSelected) {
      return [...currentTags, tagToToggle].filter(
        (value, index, self) => self.indexOf(value) === index,
      );
    } else {
      return currentTags.filter((tag) => tag !== tagToToggle);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    let finalPayload: CreatePostPayload = {
      title: "",
      content: "",
      tags: [],
    };

    /* --- Data Parsing --- */
    if (params.postData && typeof params.postData === "string") {
      try {
        const titleContentObject = JSON.parse(params.postData);

        finalPayload = {
          ...titleContentObject,
          ...data,
        };
      } catch (e) {
        console.error("Error parsing navigation data in onSubmit:", e);
      }

      router.push({
        pathname: `/create-post/submit-post`,
        params: {
          postData: JSON.stringify(finalPayload),
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* --- Back and Save Buttons --- */}
      <View style={styles.header}>
        <Pressable onPress={router.back}>
          <Icon name="arrow-left" size={30} />
        </Pressable>
        <View style={{ flex: 1 }} />
        <ProgressButton
          text={"Next"}
          iconName={"arrow-right"}
          onPress={handleSubmit(onSubmit)}
        />
      </View>

      <Text style={styles.heading}>Select a Category</Text>

      <View>
        {/* --- Checkboxes --- */}
        <Controller
          control={control}
          name="tags"
          rules={{
            validate: (value) =>
              value.length >= 1 || "At least one category is required.",
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <View>
              {/* --- Checkboxes Mapping --- */}
              {TAGS.map((tagText) => {
                const isSelected = value.includes(tagText);

                return (
                  <TagCheckbox
                    key={tagText}
                    tagText={tagText}
                    value={isSelected}
                    onValueChange={(newValue) => {
                      const newTagsArray = handleTagToggle(
                        value,
                        tagText,
                        newValue,
                      );
                      onChange(newTagsArray);
                    }}
                  />
                );
              })}
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Category;

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
  heading: {
    fontFamily: "Syne_700Bold",
    fontSize: 24,
    marginTop: 20,
    marginBottom: 10,
  },
});
