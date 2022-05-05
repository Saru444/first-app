import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextInput } from "react-native-paper";

const CheckOut = () => {
  const [list, setList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [personInfo, setPersonInfo] = useState({ addresses: [] });
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [cost, setCost] = useState("");

  const updateData = async () => {
    const value = await AsyncStorage.getItem("key");
    let list = [];
    let totalPrice = 0;
    console.log(value);
    if (value !== null) {
      list = JSON.parse(value);
      for (var i in list) {
        totalPrice += list[i].Price * list[i].quantity;
      }
    }
    setList(list);
    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    updateData();
    console.log(list);
    console.log(totalPrice);
  }, []);

  /*   useEffect(() => {
    setMessage(message);
  }, []);

  useEffect(() => {
    setCost(cost);
  }, []); */

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
        let personInfo = res.data;
        setPersonInfo(personInfo);
        console.log(personInfo.id);
        console.log(personInfo.addresses);
      });
  }, [name]);

  const onPressCheck = async () => {
    const check = await fetch(
      "https://94f6-81-226-206-31.eu.ngrok.io/api/Order/createorder",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: personInfo.id,
          orderItems:list,
          totalPrice: totalPrice,
          creationTime: new Date(),
          addresses: personInfo.addresses,
          message: message,
          costCenter: cost,
          status: "",
        }),
      }
    );
    console.log(check.status);

    if (check.status !== 200) {
      Alert.alert("warning", "something is wrong!", [{ text: "ok" }]);
      return;
    }
  };
  return (
    <ScrollView>
      <View style={styles.bigContainer}>
        <View style={styles.container}>
          <Text style={styles.header}>BESTÄLLNING</Text>
        </View>
        <FlatList
          style={styles.flatList}
          data={list}
          renderItem={({ item }) => (
            <View style={styles.cartInfo}>
              <View style={styles.picContainer}>
                <Image style={styles.image} source={{ uri: item. imgUrl}} />
              </View>
              <View>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.smallText}>
                  {item.Price * item.quantity} kr
                </Text>
                <Text style={styles.smallText}>Antal: {item.quantity}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
        <View style={styles.checkAddress}>
          <Text style={styles.header2}>PAKETET SKICKAS TILL</Text>
        </View>
        <View style={styles.addressInfo}>
          <Text>ArbogaGatan 27</Text>
          <Text>73232</Text>
          <Text>Arboga</Text>
          <Text>Leverans</Text>
        </View>
        <View style={styles.checkAddress}>
          <Text style={styles.header2}>FAKTURAADRESS</Text>
        </View>
        <View style={styles.addressInfo}>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
        </View>
        <View>
          <TextInput
            label="Kostnadsställe"
            style={styles.input}
            mode="flat"
            onChangeText={(value) => setCost(value)}
            activeUnderlineColor="orange"
          />
          <TextInput
            label="Meddelande"
            style={styles.input}
            mode="flat"
            onChangeText={(value) => setMessage(value)}
            activeUnderlineColor="orange"
          />
        </View>
        <View style={styles.priceCheck}>
          <Text style={styles.price}>TOTALBELOPP</Text>
          <Text style={styles.price}>{totalPrice} kr</Text>
          <Pressable
            onPress={onPressCheck}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#b2b2b2" : "orange",
                margin: 30,
                marginTop: 20,
              },
            ]}
          >
            <Text style={styles.send}>SKICKA BESTÄLLNING</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};
export default CheckOut;

const styles = StyleSheet.create({
  bigContainer: {
    backgroundColor: "#fff",
  },
  container: {
    borderBottomWidth: 1,
    borderColor: "#b2b2b2",
    margin: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Arial",
    padding: 10,
  },
  cartInfo: {
    flexDirection: "row",
    width: "100%",
    /* height: 140,  */
    borderBottomWidth: 1,
    borderBottomColor: "#b2b2b2",
    backgroundColor: "#fff",
  },
  picContainer: {
    margin: 20,
    marginTop: -10,
  },
  image: {
    width: 90,
    height: 130,
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: "Times New Roman",
  },
  smallText: {
    fontSize: 16,
    marginTop: 10,
  },
  checkAddress: {
    margin: 5,
    borderBottomWidth: 1,
    borderColor: "#b2b2b2",
  },
  flatList: {
    height: 300,
  },
  header2: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Arial",
    padding: 10,
  },
  addressInfo: {
    margin: 20,
    marginTop: 5,
  },
  priceCheck: {
    width: 340,
    height: 130,
    backgroundColor: "#DCDCDC",
    marginTop: 30,
    marginBottom: 20,
    margin: 10,
    alignSelf: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 15,
  },
  send: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    width: 280,
    height: 40,
    textAlign: "center",
    lineHeight: 40,
  },
  input: {
    fontSize: 14,
    width: "80%",
    backgroundColor: "#fff",
    marginLeft: 20,
  },
});
