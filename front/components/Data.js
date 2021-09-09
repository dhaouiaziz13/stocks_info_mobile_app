import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Touchable,
  BackHandler,
  ActivityIndicator,
  Linking,
} from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { Grid, LineChart, XAxis, YAxis } from "react-native-svg-charts";

import axios from "axios";

export default ({ history, match }) => {
  // const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

  const axesSvg = { fontSize: 10, fill: "#bab8b8" };
  const verticalContentInset = { top: 10, bottom: 10 };
  const xAxisHeight = 20;

  // Layout of an x-axis together with a y-axis is a problem that stems from flexbox.
  // All react-native-svg-charts components support full flexbox and therefore all
  // layout problems should be approached with the mindset "how would I layout regular Views with flex in this way".
  // In order for us to align the axes correctly we must know the height of the x-axis or the width of the x-axis
  // and then displace the other axis with just as many pixels. Simple but manual.

  ///////////////////////////////////////////////////////////////////
  const [data, setdata] = useState([]);
  const [info, setinfo] = useState();
  const [values, setvalues] = useState();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  // let data = [];

  let id = match.params.id;
  const backAction = () => {
    history.push("/");
    return true;
  };

  const getFonts = () =>
    Font.loadAsync({
      Roboto: require("../assets/fonts/RobotoCondensed-Regular.ttf"),
      Hina: require("../assets/fonts/HinaMincho-Regular.ttf"),
      Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
    });

  useEffect(() => {
    let request2 = axios.CancelToken.source();
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    axios
      .get(
        `https://api.stockdio.com/data/financial/prices/v1/GetHistoricalPrices?app-key=17485A247567498BBD9AD822B9C89A17&symbol=${id}&from=2020-08-23&to=2021-08-23`
      )
      .then((res) => {
        // let val = [];
        let i = 0;
        for (const item of res.data.data.prices.values) {
          i++;
          if (i >= res.data.data.prices.values.length - 15) {
            setdata((olddata) => [...olddata, Math.floor(Number(item[4]))]);
          }
        }
      });
    try {
    } catch (error) {}
    axios
      .get(
        `https://mboum.com/api/v1/ne/news/?symbol=${id}&apikey=82zpv9ylaJ2WA7z0eqlo9qQt2B28N1tAIugE1IuyIeAZE94q153IhOlghOL9`
      )
      .then((res) => {
        if (res) {
          return setinfo(res.data.item);
        }
        console.log("therdet");
      });
    axios
      .get(
        `https://api.stockdio.com/data/financial/prices/v1/GetStocksSnapshot?app-key=17485A247567498BBD9AD822B9C89A17&symbols=${id}`
      )
      .then((res) => {
        setvalues(res.data.data.values[0]);
        // console.log(values[8]);
      });
    return () => {
      request2.cancel("unmonted");
      backHandler.remove();
    };
  }, []);

  /////////////////////////////////////////////////////////////////
  if (fontsLoaded) {
    return (
      <View style={{ height: "90%", width: "100%", alignItems: "center" }}>
        <>
          {data[data.length - 1] > data[data.length - 2] ? (
            <View style={{ height: 200, padding: 20, flexDirection: "row" }}>
              <YAxis
                data={data}
                style={{ marginBottom: xAxisHeight }}
                contentInset={verticalContentInset}
                svg={axesSvg}
              />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <LineChart
                  style={{ flex: 1 }}
                  data={data}
                  contentInset={verticalContentInset}
                  svg={{ stroke: "rgb(10, 242, 52)" }}
                >
                  <Grid />
                </LineChart>
                <XAxis
                  style={{ marginHorizontal: -10, height: xAxisHeight }}
                  data={[]}
                  formatLabel={(value, index) => index}
                  contentInset={{ left: 10, right: 10 }}
                  svg={axesSvg}
                />
              </View>
            </View>
          ) : (
            <View style={{ height: 200, padding: 20, flexDirection: "row" }}>
              <YAxis
                data={data}
                style={{ marginBottom: xAxisHeight }}
                contentInset={verticalContentInset}
                svg={axesSvg}
              />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <LineChart
                  style={{ flex: 1 }}
                  data={data}
                  contentInset={verticalContentInset}
                  svg={{ stroke: "rgb(247, 30, 10)" }}
                >
                  <Grid />
                </LineChart>
                <XAxis
                  style={{ marginHorizontal: -10, height: xAxisHeight }}
                  data={[]}
                  formatLabel={(value, index) => index}
                  contentInset={{ left: 10, right: 10 }}
                  svg={axesSvg}
                />
              </View>
            </View>
          )}
        </>
        <View
          style={{
            justifyContent: "space-evenly",
            width: "85%",
            height: 80,
            flexDirection: "row",
            marginVertical: 5,
          }}
        >
          {info ? (
            <>
              {/* ------------------left part---------------- */}
              <View style={styles.minidata}>
                <View style={styles.numbers}>
                  <Text style={styles.font}>open</Text>
                  <Text style={styles.font2}>{values ? values[8] : "0"}</Text>
                </View>
                <View style={styles.numbers}>
                  <Text style={styles.font}>close</Text>
                  <Text style={styles.font2}>{values ? values[11] : "0"}</Text>
                </View>
                <View style={styles.numbers}>
                  <Text style={styles.font}>high</Text>
                  <Text style={styles.font2}>{values ? values[9] : "0"}</Text>
                </View>
              </View>
              {/* ----------------seperation line---------------- */}
              <View
                style={{
                  width: 1,
                  height: "100%",
                  backgroundColor: "grey",
                  marginHorizontal: 5,
                }}
              ></View>
              {/*------------------right part--------------  */}
              <View style={styles.minidata}>
                <View style={styles.numbers}>
                  <Text style={styles.font}>low</Text>
                  <Text style={styles.font2}>{values ? values[10] : "0"}</Text>
                </View>
                <View style={styles.numbers}>
                  <Text style={styles.font}>volume</Text>
                  <Text style={styles.font2}>{values ? values[13] : "0"}</Text>
                </View>
                <View style={styles.numbers}>
                  <Text style={styles.font}>percentage</Text>
                  {values ? (
                    values[15] > 0 ? (
                      <Text style={{ color: "green" }}>
                        {values ? values[15] : "0"}%
                      </Text>
                    ) : (
                      <Text style={{ color: "red" }}>
                        {values ? values[15] : "0"}%
                      </Text>
                    )
                  ) : null}
                </View>
              </View>
            </>
          ) : null}
        </View>
        {/* ---------------------------------news cards ----------------------------------- */}
        <ScrollView
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
          style={{
            width: "100%",
            height: 20,
            flexDirection: "column",
          }}
        >
          {info ? (
            info.map((item, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    Linking.openURL(item.link).catch((err) =>
                      console.error("An error occurred", err)
                    );
                  }}
                >
                  <View
                    onPress={() => {
                      Linking.openURL(item.link).catch((err) =>
                        console.error("An error occurred", err)
                      );
                    }}
                    style={{
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 5,
                      // height: 60,
                      padding: 15,
                      justifyContent: "center",
                      alignItems: "center",
                      // fontFamily: "Roboto",
                      width: "95%",
                      // backgroundColor: "white",
                      marginVertical: 5,
                      borderRadius: 8,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Poppins",
                        fontSize: 17,
                        color: "grey",
                      }}
                    >
                      {item.title}
                    </Text>
                    <Text style={{ fontSize: 12, color: "white" }}>
                      {item.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <ActivityIndicator size="large" color="#fff" />
          )}
        </ScrollView>
      </View>
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
};
//----------------------------------------styles------------------------------------------
const styles = StyleSheet.create({
  minidata: {
    // borderColor: "grey",
    // borderWidth: 1,
    flex: 1,
    flexDirection: "column",
  },
  numbers: {
    // borderColor: "grey",
    // borderWidth: 1,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  font: {
    color: "white",
  },
  font2: {
    color: "white",
  },
});
