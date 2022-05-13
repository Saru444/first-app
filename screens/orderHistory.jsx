import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const OrderHistory = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [orderHistory, setOrderHistory] = useState({});

  const getData = async () => {
    const userName = await AsyncStorage.getItem("userkey");
    let name = "";
    if (userName !== null) {
      name = JSON.parse(userName);
    }
    setName(name);
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (name === "") return;
    axios
      .get(`https://94f6-81-226-206-31.eu.ngrok.io/api/UserDetails/${name}`)
      .then((res) => {
        let orderHistory = res.data.orderHistory;
        setOrderHistory(orderHistory);
      });
  }, [name]);

  const onPressCheckDetails = (order) => {
    navigation.navigate('Order Details', { order });
  };
  /// toLocaleDateString() ??
  return (
    <View sytle={styles.container}>
      <FlatList
        style={styles.flatList}
        data={orderHistory}
        renderItem={({ item }) => {
          return (
            <View style={styles.orderInfo}>
              <TouchableOpacity onPress={ () => onPressCheckDetails(item)}>
                <Text style={styles.orderText}>{new Date(item.creationTime).toLocaleDateString()}</Text>
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
export default OrderHistory;

const styles = StyleSheet.create({
  flatList: {
    backgroundColor: "#fff",
    height: "100%",
  },
  orderInfo: {
    margin: 10,
    backgroundColor: "#F2F1F1",
  },
  orderText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 30,
  },
});
