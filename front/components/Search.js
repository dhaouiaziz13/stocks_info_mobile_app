import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  BackHandler,
} from "react-native";
import { Route } from "react-router-native";
export default ({ history }) => {
  const [text, settext] = useState("");
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
  }, []);
  const backAction = () => {
    history.push("/");
    return true;
  };
  return (
    <View style={styles.container}>
      <View style={styles.inp}>
        <TextInput
          onChangeText={(text) => settext(text)}
          style={styles.input}
          value={text}
          placeholderTextColor="white"
          placeholder="search"
        />
        <Image style={styles.img} source={require("../assets/bitcoin.png")} />
      </View>
      <View style={styles.body}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  inp: {
    // borderWidth: 1,
    // borderColor: "#fff",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems:"center"
  },
  input: {
   borderWidth:0.5,
    padding: 5,
    width: "88%",
    marginHorizontal:5,
    borderColor:"white",
    borderRadius:6
  },
  body: {
    height: "90%",
    // borderColor: "red",
    // borderWidth: 1,
    width: "100%",
  },
  img:{
    width: 30,
    height: 30,
  },
  container: {
    // borderWidth: 1,
    // borderColor: "#fff",
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});
