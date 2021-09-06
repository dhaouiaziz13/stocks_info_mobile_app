import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  // TextInput,
  ActivityIndicator,
  TouchableOpacity,
  // TouchableWithoutFeedback,
  AsyncStorage,
  Image,
  ScrollView,
} from "react-native";
import axios from "axios";
import { apiurl } from "../vars";
export default ({ history }) => {
  // const [notif, setnotif] = useState(false);
  const [data, setdata] = useState();
  // const [columns, setcol] = useState();
  const [values, setvalues] = useState();

  /////////////////////////////////////
  useEffect(() => {
    getdata();
    //check if user is signed in
    AsyncStorage.getItem("token").then((val) => {
      if (val === null) {
        history.push("/");
      }
    });
    //fetching user data
    // AsyncStorage.getItem("userid").then((val) => {
    //   if (val !== null) {
    //     axios.post(apiurl + "/api/users/fetch", { id: val }).then((res) => {
    //       setdata(res.data);
    //     });
    //   }
    // });
  }, []);
  /////////////////////////////////////////apidata/////////////////////////////
  const getdata = () => {
    axios
      .get(
        "https://api.stockdio.com/data/financial/prices/v1/GetStocksSnapshot?app-key=17485A247567498BBD9AD822B9C89A17&symbols=AAPL;GOOG;TSLA;AMD;AMZN;MRNA;CRM;HD;MSFT;IBM;BABA;FB;NVDA;NFLX;BAC;OIL;USD"
      )
      .then((res) => setvalues(res.data.data.values));
  };
  const getcryptodata = () => {
    axios
      .get(
        "https://api.stockdio.com/data/financial/prices/v1/GetStocksSnapshot?app-key=17485A247567498BBD9AD822B9C89A17&symbols=ETH"
      )
      .then((res) => setvalues(res.data.data.values));
  };
  /////////////////////////////////////
  //--------------------------deleting user-------------------------
  const del = () => {
    axios
      .post(apiurl + "/api/users/delete", { id: data._id })
      .then(async (res) => {
        if (res.data === "deleted") {
          try {
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("userid");
          } catch (e) {
            // remove error
          }

          ("Done.");
          return history.push("/");
        }
      });
  };
  //--------------------------notification function-------------------------
  // const notify = () => {
  //   setnotif(true);
  //   setTimeout(() => {
  //     setnotif(false);
  //   }, 1500);
  // };
  ////////////////////////////////////
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("userid");
    } catch (e) {
      // remove error
    }

    ("Done.");
    return history.push("/");
  };
  //////////////////////////////
  return (
    <View style={styles.container}>
      <View style={styles.scrollView}>
        <ScrollView>
          {values ? (
            values.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => history.push(`/data/${item[0]}`)}
                  key={index}
                >
                  <View style={styles.card}>
                    <View style={styles.companyname}>
                      <View style={styles.Text}>
                        <Text style={{ fontFamily: "Roboto", fontSize: 20 }}>
                          {item[0]}
                        </Text>
                      </View>
                      <View style={styles.Text}>
                        <Text style={{ fontSize: 12, color: "grey" }}>
                          {item[1]}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.splitit}>
                      <View style={styles.Text2}>
                        <Text style={{ fontSize: 30, color: "grey" }}>
                          {item[11]}
                        </Text>
                      </View>
                      <View style={styles.Text2}>
                        {item[15] > 0 ? (
                          <View style={styles.arrowup} />
                        ) : (
                          <View style={styles.arrowdown} />
                        )}
                        {item[15] > 0 ? (
                          <Text style={{ color: "green" }}>
                            {" "}
                            {item[14]} ({item[15]}%)
                          </Text>
                        ) : (
                          <Text style={{ color: "red" }}>
                            {" "}
                            {item[14]} ({item[15]}%)
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <ActivityIndicator size="large" color="#fff" />
          )}
        </ScrollView>
      </View>

      <View style={styles.nav}>
        <TouchableOpacity
          onPress={() => {
            getdata();
          }}
        >
          <Image
            source={require("../assets/stock.png")}
            style={styles.tinyLogo}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            getcryptodata();
          }}
        >
          <Image
            source={require("../assets/bitcoin.png")}
            style={styles.tinyLogo}
          />
        </TouchableOpacity>
        <Image
          source={require("../assets/profile.png")}
          style={styles.tinyLogo}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  arrowup: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "green",
  },
  arrowdown: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "red",
    transform: [{ rotate: "180deg" }],
  },
  companyname: {
    height: "100%",
    width: "50%",
    justifyContent: "center",
    // alignItems: "center",
  },
  Text: {
    marginVertical: 2,
    marginLeft: 30,
  },
  Text2: {
    marginVertical: 5,
    marginRight: 20,

    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  nav: {
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    height: "7%",
    width: "100%",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderTopColor: "black",
    borderRightColor: "white",
    borderLeftColor: "white",
    bottom: -1,
  },

  tinyLogo: {
    width: 30,
    height: 30,
  },
  profileimg: {
    width: 42,
    height: 40,
    position: "absolute",
    top: 60,
    left: 20,
  },
  scrollView: {
    height: "85%",
    position: "absolute",
    bottom: 50,
    width: "100%",
  },
  splitit: {
    height: "100%",
    width: "50%",

    alignItems: "flex-end",
    justifyContent: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",

    justifyContent: "space-evenly",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "white",
    height: 91.8,
    marginBottom: 15,
    borderRadius: 5,
    marginHorizontal: 6,
  },
  container: {
    backgroundColor: "#282c34",
    height: "100%",
    width: "100%",
  },
});
