import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import * as Font from "expo-font";
// import img from "./assets/wave.svg";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { NativeRouter, Switch, Route } from "react-router-native";
import AppLoading from "expo-app-loading";
import Profile from "./components/Profile";
import Main from "./components/Main";
import Data from "./components/Data";
export default function App({ history }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  // const backAction = () => {
  //   Alert.alert("Hold on!", "Are you sure you want to go back?", [
  //     {
  //       text: "Cancel",
  //       onPress: () => null,
  //       style: "cancel",
  //     },
  //     { text: "YES", onPress: () => BackHandler.exitApp() },
  //   ]);
  //   return true;
  // };
  const getFonts = () =>
    Font.loadAsync({
      Roboto: require("./assets/fonts/RobotoCondensed-Regular.ttf"),
    });

  if (fontsLoaded) {
    return (
      <NativeRouter>
        <View style={styles.container}>
          <Switch>
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/" component={Main} />
            <Route exact path="/data/:id" component={Data} />
            {/* <Route exact path="/signup" component={Signup} /> */}
            {/* <Route exact path="/main" component={} /> */}
          </Switch>
        </View>
      </NativeRouter>
    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn}
      />
    );
  }
}

const styles = StyleSheet.create({
  textcolor: {
    color: "#fff",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#282c34",
    alignItems: "center",
    justifyContent: "center",
  },
});
