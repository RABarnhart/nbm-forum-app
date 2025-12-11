import PrivacyPolicy from "@/components/privacy-policy";
import TermsAndConditions from "@/components/terms-and-conditions";
import { Colors } from "@/constants/theme";
import { deleteToken, deleteUserId } from "@/services/token";
import useUserStore from "@/utils/use-user-store";
import BottomSheet from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {};

const ProfileMenu = (props: Props) => {
  const termsSheetRef = useRef<BottomSheet>(null);
  const privacyPolicySheetRef = useRef<BottomSheet>(null);
  const [showTermsSheet, setShowTermsSheet] = useState(false);
  const [showPrivacyPolicySheet, setShowPrivacyPolicySheet] = useState(false);

  const closeTermsSheet = useCallback(() => {
    if (termsSheetRef.current) {
      termsSheetRef.current.close();
    }
    setTimeout(() => setShowTermsSheet(false), 200);
  }, []);

  const closePrivacyPolicySheet = useCallback(() => {
    if (privacyPolicySheetRef.current) {
      privacyPolicySheetRef.current.close();
    }
    setTimeout(() => setShowPrivacyPolicySheet(false), 200);
  }, []);

  const handlePersonalInfoPress = () => {
    router.push("/profile/personal-information-page");
  };
  const handleLocationPress = () => {
    router.push("/profile/location-page");
  };
  const handleUpdatePasswordPress = () => {
    router.push("/profile/update-password-page");
  };
  const handleDeleteAccountPress = () => {
    console.log("Delete Account Pressed");
    Alert.alert(
      "Dang it!",
      "There is no API endpoint for deleting your account",
    );
  };

  const handleTermsPress = () => {
    setShowTermsSheet(true);
  };
  const handlePrivacyPolicyPress = () => {
    setShowPrivacyPolicySheet(true);
  };

  const handleSignOutPress = async () => {
    deleteUser();
    deleteToken();
    deleteUserId();
    router.replace("/");
  };

  const { deleteUser } = useUserStore();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          {/* --- Title and Back Arrow --- */}
          <View style={styles.header}>
            <Pressable onPress={router.back}>
              <Text style={{ fontSize: 30 }}>←</Text>
            </Pressable>
          </View>
          <Text style={styles.title}>Profile</Text>

          {/* --- Settings --- */}
          <View>
            <Text style={styles.heading}>Settings</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={handlePersonalInfoPress}
            >
              <Icon
                name="account"
                size={35}
                color={Colors.main}
                style={{ marginHorizontal: 10 }}
              />
              <Text style={styles.buttonText}>Personal Information</Text>
              <Icon name="chevron-right" size={35} color={Colors.grey} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={handleLocationPress}
            >
              <Icon
                name="map-marker"
                size={35}
                color={Colors.main}
                style={{ marginHorizontal: 10 }}
              />
              <Text style={styles.buttonText}>Location</Text>
              <Icon name="chevron-right" size={35} color={Colors.grey} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={handleUpdatePasswordPress}
            >
              <Icon
                name="lock"
                size={35}
                color={Colors.main}
                style={{ marginHorizontal: 10 }}
              />
              <Text style={styles.buttonText}>Update Password</Text>
              <Icon name="chevron-right" size={35} color={Colors.grey} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={handleDeleteAccountPress}
            >
              <Icon
                name="trash-can"
                size={35}
                color={Colors.main}
                style={{ marginHorizontal: 10 }}
              />
              <Text style={styles.buttonText}>Delete Account</Text>
              <Icon name="chevron-right" size={35} color={Colors.grey} />
            </TouchableOpacity>
          </View>

          {/* --- Legal --- */}
          <View>
            <Text style={styles.heading}>Legal</Text>
            <TouchableOpacity style={styles.button} onPress={handleTermsPress}>
              <Icon
                name="book-open-variant"
                size={35}
                color={Colors.main}
                style={{ marginHorizontal: 10 }}
              />
              <Text style={styles.buttonText}>Terms of Service</Text>
              <Icon name="chevron-right" size={35} color={Colors.grey} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handlePrivacyPolicyPress}>
              <Icon
                name="book-open-blank-variant"
                size={35}
                color={Colors.main}
                style={{ marginHorizontal: 10 }}
              />
              <Text style={styles.buttonText}>Privacy Policy</Text>
              <Icon name="chevron-right" size={35} color={Colors.grey} />
            </TouchableOpacity>
          </View>
        </View>

        {/* --- Dark Mode Switch --- */}

        {/* --- Sign Out --- */}
        <TouchableOpacity style={styles.signout} onPress={handleSignOutPress}>
          <Text
            style={{
              fontFamily: "Syne_400Regular",
              color: Colors.errorRed,
              textDecorationLine: "underline",
              fontSize: 18,
            }}
          >
            Sign out
          </Text>
        </TouchableOpacity>
      </View>

      {showTermsSheet && (
        <TermsAndConditions ref={termsSheetRef} onClose={closeTermsSheet} />
      )}
      {showPrivacyPolicySheet && (
        <PrivacyPolicy ref={termsSheetRef} onClose={closePrivacyPolicySheet} />
      )}
    </GestureHandlerRootView>
  );
};

export default ProfileMenu;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 70,
    flex: 1,
    paddingHorizontal: 35,
  },
  header: {
    flexDirection: "row",
    fontSize: 24,
    alignItems: "center",
    height: 27,
    marginBottom: 15,
  },
  title: {
    fontFamily: "Syne_700Bold",
    fontSize: 28,
    position: "absolute",
    alignSelf: "center",
    top: 0,
  },
  heading: {
    fontFamily: "Syne_700Bold",
    fontSize: 20,
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 2,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    height: 60,
    backgroundColor: Colors.lightGrey,
    borderRadius: 10,
    borderColor: Colors.main,
    borderWidth: 1,
  },
  buttonText: {
    flex: 1,
    fontSize: 18,
    fontFamily: "Syne_400Regular",
    color: Colors.darkGrey,
  },
  signout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    width: "100%",
    paddingBottom: 20,
  },
});
