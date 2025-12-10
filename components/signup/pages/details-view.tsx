import { SignUpStep } from "@/app/signup";
import { Colors } from "@/constants/theme";
import { router } from "expo-router";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import ErrorBox from "../../error-box";

type Props = {
  onStepComplete: (data: Inputs) => void;
  handleNext: (nextStep: SignUpStep) => void;
};
type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
};

const EMAIL_REGEX = /^\S+@\S+$/i;
const PHONE_NUMBER_REGEX = /^\d{4}[-\s]?\d{3}[-\s]?\d{3}$/;

const DetailsView = ({ onStepComplete, handleNext }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      telephone: "",
    },
  });

  const formatPhoneNumber = (rawPhoneNumber: string): string => {
    return rawPhoneNumber.replace(/\D/g, "");
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const cleanedData = {
      ...data,
      telephone: formatPhoneNumber(data.telephone),
    };

    onStepComplete(cleanedData);
    console.log("Details captured:", cleanedData);
    handleNext("Location");
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={styles.container}
      >
        <Text style={styles.heading}>Create your Account</Text>
        <Text style={styles.subtitle}>
          Enter your details below to start creating your brand new account.
        </Text>

        {/* First Name */}
        <Text style={styles.inputHeader}>Your name</Text>
        <Controller
          control={control}
          name="firstName"
          rules={{ required: "Please enter a first name" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholderTextColor={Colors.grey}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter your first name here"
            />
          )}
        />

        {/* Last Name */}
        <Controller
          control={control}
          name="lastName"
          rules={{ required: "Please enter a last name" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter your last name here"
              placeholderTextColor={Colors.grey}
            />
          )}
        />

        {/* Email */}
        <Text style={styles.inputHeader}>Email</Text>
        <Controller
          control={control}
          name="email"
          rules={{ required: "Please enter an email", pattern: EMAIL_REGEX }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="you@email.com.au"
              placeholderTextColor={Colors.grey}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />

        {/* Telephone */}
        <Text style={styles.inputHeader}>Phone number</Text>
        <Controller
          control={control}
          name="telephone"
          rules={{
            required: "Oops! please enter a phone number",
            pattern: PHONE_NUMBER_REGEX,
          }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="0400-000-000"
              placeholderTextColor={Colors.grey}
              keyboardType="number-pad"
              autoCapitalize="none"
            />
          )}
        />

        {/* --- Error Messages --- */}
        <ErrorBox message={errors.firstName?.message} />
        <ErrorBox message={errors.lastName?.message} />
        <ErrorBox
          message={
            errors.email?.type === "pattern"
              ? "Invalid email format"
              : errors.email?.message
          }
        />
        <ErrorBox
          message={
            errors.telephone?.type === "pattern"
              ? "Invalid phone number format"
              : errors.telephone?.message
          }
        />

        {/* --- Submission Button --- */}
        <Pressable style={styles.nextButton} onPress={handleSubmit(onSubmit)}>
          <Text style={{ color: "white", fontSize: 16 }}>Next &rarr;</Text>
        </Pressable>
      </ScrollView>
      {/* --- Footer Section --- */}
      <View style={styles.footer}>
        <Text style={{ color: Colors.main, fontSize: 14 }}>
          Already have an account?{" "}
        </Text>
        <Pressable
          onPress={() => {
            router.replace("/signin");
          }}
        >
          <Text
            style={{
              color: Colors.main,
              fontSize: 14,
              textDecorationLine: "underline",
            }}
          >
            Log in here.
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default DetailsView;

const styles = StyleSheet.create({
  container: {
    paddingRight: 2,
    flex: 1,
    height: "100%",
  },
  heading: {
    fontFamily: "Syne_700Bold",
    fontSize: 25,
    marginTop: 20,
    marginBottom: 12,
    width: "100%",
  },
  subtitle: {
    fontFamily: "Syne_400Regular",
    fontSize: 16,
    marginBottom: 20,
  },
  inputHeader: {
    fontFamily: "Syne_700Bold",
    fontSize: 16,
    paddingVertical: 5,
  },
  input: {
    height: 50,
    margin: 2,
    width: "100%",
    borderWidth: 1,
    borderColor: Colors.grey,
    padding: 10,
  },
  nextButton: {
    backgroundColor: Colors.main,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 30,
  },
  footer: {
    marginTop: "auto",
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
});
