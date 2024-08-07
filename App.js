import React from "react";
import { View, Text } from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import AppNavigation from "./navigation/appNavigation";
NativeWindStyleSheet.setOutput({
  default: "native",
});
const App = () => {
  return <AppNavigation />;
};

export default App;
