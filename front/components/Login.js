import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  AsyncStorage,
  Image,
  ImageBackground,
} from "react-native";
import axios from "axios";
import { apiurl } from "../vars";
export default ({ history }) => {
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [notif, setnotif] = useState(false);
  const [data, setdata] = useState();

  /////////////////////////////////////
  useEffect(() => {
    //check if user is logged in
    AsyncStorage.getItem("token").then((val) => {
      if (val !== null) {
        history.push("/main");
      }
    });
  }, []);
  /////////////////////////////////////
  //-----------------notification function------------------------
  const notify = () => {
    setnotif(true);
    setTimeout(() => {
      setnotif(false);
    }, 1500);
  };
  ////////////////////////////////////
  //-----------------------------login function----------------------------------
  const login = async () => {
    const res = await axios.post(apiurl + "/api/users/signin", {
      email,
      password: pass,
    });
    setdata(res.data);
    if (res.data.token) {
      await AsyncStorage.setItem("token", res.data.token);
      await AsyncStorage.setItem("userid", res.data.userId);
      return history.push("/main");
    }
    return notify();
  };
  //////////////////////////////
  return (
    <ImageBackground
      source={require("../assets/bg.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.container}>
        <View style={styles.imgcont}>
          <Image style={styles.logo} source={require("../assets/logo.png")} />
        </View>
        <Text style={styles.textcolor}>LOGIN</Text>
        <View style={styles.textinpcont}>
          <TextInput
            placeholderTextColor="#16cfc1"
            placeholder="email"
            onChangeText={(val) => {
              setemail(val);
            }}
            style={styles.textinp}
          />
          <TextInput
            secureTextEntry={true}
            placeholder="password"
            placeholderTextColor="#16cfc1"
            style={styles.textinp}
            onChangeText={(val) => {
              setpass(val);
            }}
          />
        </View>

        <View style={styles.btncont2}>
          <TouchableOpacity style={styles.btn} onPress={() => login()}>
            <Text style={styles.green}>login</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
          onPress={() => {
            history.push("/signup");
          }}
          style={styles.btn}
        >
          <Text>sign up</Text>
        </TouchableOpacity> */}
        </View>
        <View style={styles.textinpcont}>
          {notif ? (
            <Text style={styles.Notification}>{data.message}</Text>
          ) : null}
        </View>

        <StatusBar style="auto" />
        <View style={styles.signupcont}>
          <Text style={styles.color}>
            or you can{" "}
            <Text
              onPress={() => {
                history.push("/signup");
              }}
              style={styles.signup}
            >
              Signup
            </Text>
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  signup: {
    color: "black",
  },
  signupcont: {
    bottom: "2%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  color: {
    color: "#fff",
    fontSize: 15,
  },
  logo: {
    justifyContent: "center",
  },
  green: {
    color: "#16cfc1",
  },
  image: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  Notification: {
    textAlign: "center",
    position: "absolute",
    zIndex: 12,
    top: 20,
    backgroundColor: "red",
    borderRadius: 10,
    padding: 8,
  },
  textcolor: {
    color: "#fff",
    textAlign: "center",
    fontSize: 30,
  },

  textinpcont: {
    justifyContent: "center",
    alignItems: "center",
  },
  btncont2: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  imgcont: { padding: 10, marginLeft: 8 },
  textinp: {
    padding: 7,
    marginTop: 19,
    borderWidth: 1,
    borderColor: "#16cfc1",
    borderRadius: 20,
    width: 250,
    color: "black",
    backgroundColor: "#fff",
  },
  btn: {
    backgroundColor: "#16cfc1",
    // borderColor: "#16cfc1",
    borderRadius: 20,
    width: 150,
    padding: 10,
    marginTop: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
