import ErrorBox from "@/components/error-box";
import ProgressButton from "@/components/progress-button";
import PasswordConditions from "@/components/signup/password-conditions";
import PasswordInput from "@/components/signup/password-input";
import { Colors } from "@/constants/theme";
import { router } from "expo-router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {};

type Inputs = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

const PASSWORD_REGEX =
  /^(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const UpdatePasswordPage = (props: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    Alert.alert(
      "Dang it! 😫",
      "There is no API endpoint for editing user information",
    );
    console.log("Password changed: ", data);
    router.back();
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
          text={"Save"}
          iconName={"check"}
          onPress={handleSubmit(onSubmit)}
        />
      </View>

      <Text style={styles.heading}>Update Password</Text>

      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {/* --- Current Password --- */}
        <Text style={styles.inputHeader}>Current Password</Text>
        <PasswordInput
          control={control}
          name="currentPassword"
          rules={{
            required: "Please enter your current password",
            validate: (value) =>
              // TODO: Validate with current password
              value === getValues("currentPassword") ||
              "Current password is incorrect",
          }}
          placeholder={"Enter your current password"}
        />

        <View style={{ height: 20 }} />

        {/* --- Create New Password --- */}
        <Text style={styles.inputHeader}>Create a new Password</Text>
        <PasswordInput
          control={control}
          name="newPassword"
          rules={{
            required: "Please enter a new password",
            pattern: PASSWORD_REGEX,
            validate: (value) =>
              value != getValues("currentPassword") ||
              "Your new password cannot be the same as your old password",
          }}
          placeholder={"Enter your password"}
        />

        {/* --- Confirm New Password --- */}
        <Text style={styles.inputHeader}>Confirm new Password</Text>
        <PasswordInput
          control={control}
          name="confirmNewPassword"
          rules={{
            required: "Please confirm your password",
            validate: (value) =>
              value === getValues("newPassword") || "Passwords do not match",
          }}
          placeholder={"Re-enter your password"}
        />

        {/* --- Password Condition --- */}
        <PasswordConditions />

        {/* --- Error Messages --- */}
        {errors.currentPassword?.type === "required" && (
          <ErrorBox message={errors.currentPassword.message} />
        )}

        {errors.newPassword && (
          <ErrorBox message={errors.newPassword.message} />
        )}

        {errors.newPassword?.type === "pattern" && (
          <View>
            {/* No Number */}
            {!/(?=.*[0-9])/.test(watch("newPassword")) && (
              <ErrorBox message="New password must include at least one number" />
            )}
            {/* No Symbol */}
            {!/(?=.*[^A-Za-z0-9])/.test(watch("newPassword")) && (
              <ErrorBox message="New password must include at least one symbol" />
            )}
            {/* No Lowercase */}
            {!/(?=.*[a-z])/.test(watch("newPassword")) && (
              <ErrorBox message="New password must include at least one lowercase letter" />
            )}
            {/* No Uppercase */}
            {!/(?=.*[A-Z])/.test(watch("newPassword")) && (
              <ErrorBox message="New Password must include at least one uppercase letter" />
            )}
          </View>
        )}

        {errors.confirmNewPassword && (
          <ErrorBox message={errors.confirmNewPassword.message} />
        )}
      </ScrollView>
    </View>
  );
};

export default UpdatePasswordPage;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
    paddingTop: 70,
    paddingHorizontal: 35,
    flex: 1,
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
    fontSize: 20,
    marginTop: 30,
    marginBottom: 10,
  },
  inputHeader: {
    fontFamily: "Syne_700Bold",
    fontSize: 16,
    paddingTop: 10,
    paddingVertical: 5,
  },
  input: {
    height: 50,
    margin: 2,
    width: "100%",
    borderWidth: 1,
    borderColor: Colors.main,
    padding: 10,
  },
});
