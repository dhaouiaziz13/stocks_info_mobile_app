import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
export default ({ history }) => {
  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <View style={styles.inp}>
        <TextInput></TextInput>
      </View>
      <View style={styles.body}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  inp: {
    borderWidth: 1,
    borderColor: "#fff",
    width: "100%",
  },
  body: {
    height: "90%",
    borderColor: "red",
    borderWidth: 1,
    width: "100%",
  },
  container: {
    borderWidth: 1,
    borderColor: "#fff",
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});
