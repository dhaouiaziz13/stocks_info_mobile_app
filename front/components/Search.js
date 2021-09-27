import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  BackHandler,
} from "react-native";

import { apiurl } from "../vars";
import axios from "axios";
export default ({ history }) => {
  const [text, settext] = useState("");
  const [data, setdata] = useState([]);

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

  /////////////////////////////////////
  const getdata = async (keyword) => {
    await axios
      .post(apiurl + "/stocks/find", { word: keyword })
      .then((res) => {
        // console.log(res.data)
        setdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /////////////////////////////////////
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
        <TouchableOpacity
          onPress={() => {
            getdata(text);
          }}
        >
          <Image
            style={styles.img}
            source={require("../assets/outline_search_white_24dp.png")}
          />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        {data.map((item, i) => {
          return (
            <TouchableOpacity onPress={() => history.push(`/data/${item.Symbol}`)} key={i}>
              <View style={styles.singlecard} >
                <Text style={{ fontSize: 12 }}>{item.Name.join(" ")}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  inp: {
    // borderWidth: 1,
    // borderColor: "#fff",
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "1%",
  },
  singlecard: {
    borderWidth: 1,
    borderColor: "white",
    marginVertical: 10,
    width: 350,
    borderRadius: 7,
    backgroundColor: "white",
    height: 70,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
  },
  input: {
    borderWidth: 0.5,
    padding: 5,
    display: "flex",
    justifyContent: "space-around",
    width: "88%",
    marginHorizontal: 5,
    marginVertical: 10,
    borderColor: "white",
    borderRadius: 6,
    color: "white",
  },
  body: {
    // borderColor: "red",
    // borderWidth: 1,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  img: {
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
