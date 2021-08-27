import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

export default () => {
  return (
    <View style={styles.container}>
      <View></View>
      <View>
        <View style={styles.profileimage}></View>
        <View></View>
        <View></View>
        <View></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileimage: {
    borderRadius: 50,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
