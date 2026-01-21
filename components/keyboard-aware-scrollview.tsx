import useKeyboardStatus from "@/utils/use-keyboard-status";
import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleProp,
  ViewStyle,
} from "react-native";

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

const KeyboardAwareScrollView = ({
  children,
  style,
  contentContainerStyle,
}: Props) => {
  const { isKeyboardOpen, keyboardHeight } = useKeyboardStatus();
  return (
    <KeyboardAvoidingView
      style={[{ flex: 1 }, isKeyboardOpen && { marginBottom: keyboardHeight }]}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={[{}, style]}
        contentContainerStyle={[
          {
            flexGrow: 1,
            gap: 24,
          },
          contentContainerStyle,
        ]}
        scrollEnabled={isKeyboardOpen}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAwareScrollView;
