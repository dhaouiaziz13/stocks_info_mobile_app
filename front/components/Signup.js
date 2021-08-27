import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  AsyncStorage,
  Image,
  ImageBackground,
} from "react-native";
import axios from "axios";
import { apiurl } from "../vars";

export default ({ history }) => {
  //////////////////////////////////////////
  useEffect(() => {
    //check if user is signed in
    AsyncStorage.getItem("token").then((val) => {
      if (val !== null) {
        history.push("/main");
      }
    });
  }, []);
  ////////////////////////////////
  const [email, setemail] = useState("");
  const [password, setpass] = useState("");
  const [username, setusername] = useState("");
  const [notif, setnotif] = useState(false);
  const [data, setdata] = useState();
  //-------------------notification function------------------------------
  const notify = () => {
    setnotif(true);
    setTimeout(() => {
      setnotif(false);
    }, 1500);
  };

  ////////////////////////////////
  //   const DismissKeyboard = ({ children }) => (
  //     <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
  //       {" "}
  //       {children}
  //     </TouchableWithoutFeedback>
  //   );
  ////////////////////////////////
  //-------------------signup function------------------------------
  const signup = async () => {
    const res = await axios.post(apiurl + "/api/users/signup", {
      email,
      username,
      password,
    });
    setdata(res.data);
    if (res.data.message === "User created!") {
      res.data;
      return history.push("/");
    }
    return notify();
  };
  /////////////////////////////////////////////////////////////////
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
        <Text style={styles.textcolor}>SIGNUP</Text>
        <View style={styles.textinpcont}>
          <TextInput
            placeholderTextColor="#16cfc1"
            placeholder="username"
            onChangeText={(val) => {
              setusername(val);
            }}
            style={styles.textinp}
          />
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
            placeholderTextColor="#16cfc1"
            placeholder="password"
            style={styles.textinp}
            onChangeText={(val) => {
              setpass(val);
            }}
          />
        </View>

        <View style={styles.textinpcont}>
          <TouchableOpacity onPress={() => signup()} style={styles.btn}>
            <Text style={styles.green}>register</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
          onPress={() => {
            history.push("/");
          }}
          style={styles.btn}
        >
          <Text>login</Text>
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
                history.push("/");
              }}
              style={styles.signup}
            >
              Login
            </Text>
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
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
    marginTop: 15,
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
