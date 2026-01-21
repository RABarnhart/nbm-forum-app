import React from "react";
import { StyleSheet } from "react-native";
import Splash from "./splash";

type Props = {};

const Page = (props: Props) => {
  return <Splash />;
};

export default Page;

const styles = StyleSheet.create({
  page: {
    borderWidth: 1,
    height: "100%",
  },
});
