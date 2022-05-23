import { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useTranslation } from "react-i18next";

const OrderDetail = ({ route, navigation }) => {
  const {t,i18n} =useTranslation();
  const [personInfo, setPersonInfo] = useState({ addresses: [] });
  const [name, setName] = useState("");
  const [leverans, setLeverans] = useState([]);
  const [faktura, setFaktura] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      title: new Date(route.params.order.creationTime).toLocaleDateString(),
    });
  }, []);

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

  return (
    <View style={styles.bigContainer}>
      <Text style={styles.bigText}>{t("Ordernummer")}: </Text>
      <Text style={styles.text}>{route.params.order.id}</Text>

      <FlatList
        data={route.params.order.orderItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.nameContainer}>
            <Text style={styles.bigText}>Produkter: </Text>
            <Text style={styles.text2}>{item.name}</Text>
            <Text style={styles.text2}>, {item.quantity}</Text>
          </View>
        )}
      />
      <Text style={styles.bigText}>Leverans Adresser: </Text>
      <FlatList
        data={leverans}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.nameContainer}>
            <Text style={styles.text3}>{item.streetName}</Text>
            <Text style={styles.text3}>{item.zipCode}</Text>
            <Text style={styles.text3}>{item.city}</Text>
          </View>
        )}
      />
      <Text style={styles.bigText}>Faktura Adresser: </Text>
      <FlatList
        data={faktura}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.nameContainer}>
            <Text style={styles.text3}>{item.streetName}</Text>
            <Text style={styles.text3}>{item.zipCode}</Text>
            <Text style={styles.text3}>{item.city}</Text>
          </View>
        )}
      />
      <Text style={styles.text2}>{personInfo.addresses.city}</Text>
      <Text style={styles.bigText}>Kostnadsställe: </Text>
      <Text style={styles.bigText}>Meddelande: </Text>
    </View>
  );
};
export default OrderDetail;

const styles = StyleSheet.create({
    bigContainer:{
      backgroundColor:"#fff",
      borderWidth:1,
     margin:10,
     
    },
  bigText: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  text: {
    fontSize: 17,
    marginLeft: 20,
  },
  text2: {
    fontSize: 18,
    marginTop: 12,
    
  },
  text3: {
    fontSize: 18,
   marginBottom:10,
   marginLeft: 20,
    
  },
  nameContainer: {
    display: "flex",
    flexDirection: "row",
  },
});
