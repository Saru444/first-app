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
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { log } from "react-native-reanimated";
import { useCartContext } from "../.expo/Context/cartContext";

const CheckOut = () => {
  const navigation = useNavigation();

  const [personInfo, setPersonInfo] = useState({ addresses: [] });
  const [name, setName] = useState("");
  const [leverans, setLeverans] = useState([]);
  const [faktura, setFaktura] = useState([]);
  const [message, setMessage] = useState("");
  const [cost, setCost] = useState("");

  const [selectLeveransOption, setSelectLeveransOption] = useState("");
  const [selectFakturaOption, setSelectFakturaOption] = useState("");

  const [adressID, setAdressID] = useState("");
  const [delivaryAdressID, setDelivaryAdressID] = useState("");
  const { list, totalPrice, cleanCart } = useCartContext();

  /// Leverans
  const onPressSelectLeveransButton = (addressId) => {
    const updatedItems = selectLeveransOption.includes(addressId)
      ? selectLeveransOption.filter((item) => item == addressId)
      : addressId;

    setSelectLeveransOption([updatedItems]);
    setDelivaryAdressID(updatedItems);
  };

  /// Faktura
  const onPressSelectFakturaButton = async (addressId) => {
    const updatedItems = selectFakturaOption.includes(addressId)
      ? selectFakturaOption.filter((item) => item == addressId)
      : addressId;
    setSelectFakturaOption([updatedItems]);
    setAdressID(updatedItems);
  };

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

        let faktura = personInfo.addresses.filter(
          (item) => item.addressType === "Faktura"
        );
        setFaktura(faktura);

        let leverans = personInfo.addresses.filter(
          (item) => item.addressType === "Leverans"
        );
        setLeverans(leverans);
      });
  }, [name]);

  const onPressCheck = async () => {
    console.log("adressID:", adressID);
    let activeAddress = {};
    for (let address of personInfo.addresses) {
      if (address.id === adressID) {
        activeAddress = address;
        break;
      }
    }
    console.log("activeAddress:", activeAddress);
    let activeDeliveryAddress = {};
    for (let address of personInfo.addresses) {
      if (address.id === delivaryAdressID) {
        activeDeliveryAddress = address;
        break;
      }
    }
    console.log("activeDeliveryAddress:", activeDeliveryAddress);

    const check = await fetch(
      "https://94f6-81-226-206-31.eu.ngrok.io/api/Order/createorder",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: personInfo.id,
          orderItems: list,
          totalPrice: totalPrice,
          creationTime: new Date(),
          addresses: [activeDeliveryAddress, activeAddress],
          message: message,
          costCenter: cost,
          status: "",
        }),       
      }    
    );
    console.log(check.status);

    console.log(activeAddress, activeDeliveryAddress)
    if (delivaryAdressID==="" || adressID==="") {
      Alert.alert("warning", "Du måste välja leverans/faktura address!", [
        { text: "ok" },
      ]);
      setSelectLeveransOption(""); 
      setSelectFakturaOption("");
      return;
    }
    if (check.status == 200) {
      navigation.navigate("klart");
      cleanCart();
      return;
    } else {
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
          style={styles.flatListCart}
          data={list}
          renderItem={({ item }) => (
            <View style={styles.cartInfo}>
              <View style={styles.picContainer}>
                <Image style={styles.image} source={{ uri: item.imgUrl }} />
              </View>
              <View style={styles.textArea}>
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
        <FlatList
          style={styles.flatList}
          data={leverans}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => onPressSelectLeveransButton(item.id)}
                style={({ press }) => [
                  {
                    backgroundColor: press ? "orange" : "red",
                  },
                ]}
              >
                <View style={styles.addressInfo}>
                  <Ionicons
                    name={
                      selectLeveransOption.includes(item.id)
                        ? "radio-button-on"
                        : "radio-button-off"
                    }
                    style={styles.icon}
                    size={28}
                    color="orange"
                  />
                  <View style={styles.addressTextArea}>
                    <Text style={styles.adressText}>{item.streetName}</Text>
                    <Text style={styles.adressText}>{item.zipCode}</Text>
                    <Text style={styles.adressText}>{item.city}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
        />

        <View style={styles.checkAddress}>
          <Text style={styles.header2}>FAKTURAADRESS</Text>
        </View>
        <FlatList
          style={styles.flatList}
          data={faktura}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => onPressSelectFakturaButton(item.id)}
              >
                <View
                  style={[
                    styles.addressInfo,
                    {
                      backgroundColor: styles.addressInfo ? "#F2F1F1" : "#fff",
                    },
                  ]}
                >
                  <Ionicons
                    name={
                      selectFakturaOption.includes(item.id)
                        ? "radio-button-on"
                        : "radio-button-off"
                    }
                    style={styles.icon}
                    size={28}
                    color="orange"
                  />
                  <View style={styles.addressTextArea}>
                    <Text style={styles.adressText}>{item.streetName}</Text>
                    <Text style={styles.adressText}>{item.zipCode}</Text>
                    <Text style={styles.adressText}>{item.city}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
        />
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
    marginTop: -5,
  },
  image: {
    width: 120,
    height: 130,
    marginTop: 10,
  },
  textArea: {
    margin: 10,
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
  flatListCart: {
    height: 400,
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
    width: 300,
    padding: 10,
    backgroundColor: "#F2F1F1",
    display: "flex",
    flexDirection: "row",
  },
  addressTextArea: {
    marginLeft: 20,
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
  adressText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
