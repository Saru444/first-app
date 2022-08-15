import { StyleSheet, View, Text, Pressable,Button } from "react-native";
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useCartContext } from "../.expo/Context/cartContext";

const ScanFun = () => {
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not scanned");

  const {updateCoupon } = useCartContext();

  const askForPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  useEffect(() => {
    askForPermission();
  }, []);

  const handleScan = async ({ data }) => {
    setScanned(true);
    setText(data);
    updateCoupon (data);


    /*  console.log(coupon); */
  };

  const useDiscount = () => {
    navigation.navigate("Kassa");
  };

  if (hasPermission === null) {
    return (
      <View>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.section1}>
        <Text>Ingen tillgång till kamera!</Text>
        <Button title="Tillåt kamera" onPress={() => askForPermission()} />
      </View>
    );
  }

  return (
    <View style={styles.bigContainer}>
      <View style={styles.container}>
        <View style={styles.textArea}>
          <Text style={styles.bigtext}>Skanna en QR-kod</Text>
        </View>
        <View style={styles.barcodebox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleScan}
            style={{ height: 400, width: 400 }}
          />
        </View>
        <Text style={styles.mainText}>{text}</Text>
        {scanned && (
          <Pressable style={styles.btn} onPress={useDiscount}>
            <Ionicons
              name="ios-checkmark-circle-outline"
              size={24}
              color="#fff"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.aktivera}>Aktivera och fortsätt</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};
export default ScanFun;

const styles = StyleSheet.create({
  bigContainer: {
    height: 600,
    margin: 20,
    borderWidth: 1,
    borderColor: "#ECE9E9",
    shadowColor: "gray",
    shadowRadius: 4,
    shadowOffset: { height: 5, width: 0 },
    shadowOpacity: 0.5,
  },
  bigtext: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#000",
    opacity: 0.7,
    color: "#fff",
    padding: 10,
    borderRadius: 20,
    marginTop: -60,
    marginBottom: 40,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "pink",
  },
  mainText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "orange",
    margin: 20,
  },
  section1: {
    margin: 50,
  },
  btn: {
    backgroundColor: "orange",
    padding: 20,
    paddingHorizontal: 40,
    display: "flex",
    flexDirection: "row",
    borderRadius: 20,
  },
  aktivera: {
    color: "#fff",
    fontSize: 20,
  },
});
