import { getTerms } from "@/services/terms";
import { TermsAndConditionsResponse } from "@/types/api";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useQuery } from "@tanstack/react-query";
import React, { forwardRef, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import AppText from "./app-text";
import ProgressButton from "./progress-button";

type Props = {
  onClose: () => void;
};

const TermsAndConditions = forwardRef<BottomSheet, Props>(
  ({ onClose }, ref) => {
    const bottomSheetRef = ref as React.RefObject<BottomSheet>;
    // callbacks
    const handleSheetChanges = useCallback(
      (index: number) => {
        if (index >= 0 && index !== 1) {
          bottomSheetRef.current?.snapToIndex(1);
          return;
        }
        if (index === -1) {
          onClose();
        }
        console.log("handleSheetChanges", index);
      },
      [onClose],
    );

    const { data: termsAndConditionsResponse } =
      useQuery<TermsAndConditionsResponse>({
        queryKey: ["termsAndConditions"],
        queryFn: getTerms,
      });

    return (
      <BottomSheet
        ref={ref}
        index={1}
        snapPoints={["99%"]}
        onChange={handleSheetChanges}
        enablePanDownToClose={false}
      >
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.closeButton}>
            <ProgressButton text={"Close"} onPress={onClose} />
          </View>

          <View style={{ flex: 1, maxHeight: "100%" }}>
            <AppText textStyle={"body"}>
              {termsAndConditionsResponse?.description}
            </AppText>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    );
  },
);

export default TermsAndConditions;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  closeButton: {
    color: "blue",
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 40,
  },
});
