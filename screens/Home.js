import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import HeaderTabs from "../components/homeComponents/HeaderTabs";

export default function Home() {
  return (
    <SafeAreaView style={{ backgroundColor: "#eeeeee", flex: 1 }}>
      <View style={{ backgroundColor: "white", padding: 15, top: 50 }}>
        <HeaderTabs />
      </View>
    </SafeAreaView>
  );
}
