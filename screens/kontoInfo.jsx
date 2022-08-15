import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import CheckBox from "expo-checkbox";
import React, { useState, useEffect } from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "../.expo/Context/userContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import AppLoad from "./appLoad";
import { useTranslation } from "react-i18next";
/* import { useUserInfoContext } from "../.expo/Context/"; */

const KontoScreen = (props) => {
  const {t,i18n} =useTranslation();
  const navigation = useNavigation();
  const { signOut } = useUserContext();
  const [personInfo, setPersonInfo] = useState({ addresses: [] });
  const [name, setName] = useState(""); 
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState([]);

  const [isSelected, setSelection] = useState(true);
  const [isOn, setOption] = useState(false);

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
      .get(`https://56a0-81-226-206-31.eu.ngrok.io/api/UserDetails/${name}`)
      .then((res) => {
        let personInfo = res.data;
        setPersonInfo(personInfo);   
      });
  }, [name]); 
 

  const onPressEdit = () => {
    navigation.navigate("Användaruppgifter");
  };

  const onPressAdd = () => {
    navigation.navigate("Add Adress");
  };
  const onPressEditAdress = () => {
    navigation.navigate("ÄNDRA ADRESS");
  };

  const onPressChangePwd = () => {
    navigation.navigate("ÄNDRA LÖSENORD");
  };

  const onPressLogout = () => {
    signOut();
  };

  const onPressOrderHistory = () => {
    navigation.navigate("Order History");
  };

  return (
    <ScrollView>
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("../assets/bybrickelivate.png")}
        />
        <FontAwesome
          size={24}
          color="orange"
          name="pencil"
          style={styles.icon}
          onPress={onPressEdit}
        />
        <Text style={styles.title}>{personInfo.userName}</Text>
        <Text style={styles.phone}>{personInfo.phoneNumber}</Text>
        <Text style={styles.email}>{personInfo.email}</Text>

        <Pressable onPress={onPressChangePwd}>
          <Text style={styles.changePwd}>{t("ÄNDRA LÖSENORD")}</Text>
        </Pressable>
      </View>
      <View style={styles.section1}>
        <Text style={styles.text}>{t("ADRESSER")}</Text>
        <Ionicons
          size={32}
          color="orange"
          name="add-circle-outline"
          style={styles.addIcon}
          onPress={onPressAdd}
        />
        <View style={styles.flatAddressArea}>
          <FlatList
            style={styles.flatContainer}
            data={personInfo.addresses}
            horizontal={true}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <View style={styles.addressContainer}>
                  <Text style={styles.text2}>{personInfo.userName}</Text>
                  <Pressable>
                  <FontAwesome
                    size={24}
                    color="orange"
                    name="pencil"
                    style={styles.icon}
                    onPress={onPressEditAdress}
                  />         
                  </Pressable>     
                  <Text style={styles.addressInfo}>{item.streetName}</Text>
                  <Text style={styles.addressInfo}>{item.zipCode}</Text>
                  <Text style={styles.addressInfo}>{item.city}</Text>
                  <CheckBox
                    value={isSelected}
                    onValueChange={setSelection}
                    style={styles.checkbox1}
                    color={isSelected ? "orange" : "#b2b2b2"}
                  />
                  <Text style={styles.send}>{item.addressType}</Text>
                  {/*           <CheckBox
                    value={isOn}
                    onValueChange={setOption}
                    style={styles.checkbox2}
                    color={isOn ? "orange" : "#b2b2b2"}
                  />
                  <Text style={styles.send}>Fakturaadress</Text> */}
                </View>
              );
            }}
            keyExtractor={(item) => item.id}
            // ListFooterComponent={() => (
            //   <View>
            //     </View>
            // )}
          />
        </View>
      </View>
      <Pressable
        onPress={onPressOrderHistory}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#DCDCDC" : "#fff",
            margin: 15,
          },
        ]}
      >
        <Text style={styles.order}>{t("Beställningar och returer")}</Text>
      </Pressable>
      <View style={{ flex: 1 }}></View>
      <View>
        <Pressable
          onPress={onPressLogout}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#b2b2b2" : "#000",
            },
          ]}
        >
          <Text style={styles.loggaUt}>{t("LOGGA UT")}</Text>
        </Pressable>
      </View>
    </View>
    </ScrollView>
  );
};
export default KontoScreen;

const styles = StyleSheet.create({
  header: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    position: "relative",
  },
  logo: {
    width: 200,
    height: 30,
    margin: 20,
  },
  addIcon: {
    alignSelf: "flex-end",
    padding: 8,
    marginTop: -55,
  },
  icon: {
    alignSelf: "flex-end",
    padding: 8,
    marginTop: -40,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    margin: 5,
  },
  email: {
    marginTop: 10,
  },
  phone: {
    marginTop: -5,
    fontSize: 18,
  },
  changePwd: {
    fontSize: 18,
    color: "orange",
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "#b2b2b2",
    padding: 15,
    paddingLeft: 105,
    paddingRight: 102,
    marginTop: 20,
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    margin: 20,
  },
  addressContainer: {
    width: 300,
    height: 220,
    backgroundColor: "#fff",
    marginTop: 0,
    marginLeft: 20,
  },
  text2: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
    marginLeft: 15,
  },
  addressInfo: {
    marginLeft: 15,
  },
  checkbox1: {
    borderRadius: 100,
    marginLeft: 17,
    marginTop: 35,
  },
  checkbox2: {
    borderRadius: 100,
    marginLeft: 17,
    marginTop: 18,
  },
  send: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 52,
    marginTop: -18,
  },
  order: {
    fontSize: 16,
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "#b2b2b2",
    padding: 12,
    textAlign: "center",
  },
  press: {
    width: "100%",
    height: 50,
    backgroundColor: "#000",
  },
  loggaUt: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    padding: 15,
  },
  flatAddressArea: {
    height: 200,
    margin: 10,
  },
});
