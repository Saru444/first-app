import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import NumericInput from "react-native-numeric-input";
import { Alert } from "react-native";
import { Snackbar } from "react-native-paper";
import { useCartContext } from "../.expo/Context/cartContext";

const ProductInfo = (props) => {
  const [product, setProduct] = useState({});

  const [isVisible, setIsVisible] = useState(false);

  const { list, updateList } = useCartContext();

  useEffect(() => {
    const productData = props.route.params?.product || {};
    setProduct(productData);
    props.navigation.setOptions({
      title: productData.name,
    });
  });

  const [submitted, setSubmitted] = useState(false);
  const [value, setValue] = useState(0);
  const onPressHandla = () => {
    if (value > 0) {
      setSubmitted(!submitted);
      storeData();
      setIsVisible(true);
    } else {
      Alert.alert("warning", "Du valde ingenting", [{ text: "ok" }]);
    }
  };

  const storeData = async () => {
    const existingIndex = list.findIndex((item) => item.id === product.id);
    if (existingIndex > -1) {
      list[existingIndex].quantity += value;
    } else {
      list.push({
        id: product.id,
        productId: product.id,
        imgUrl: product.imageUrl,
        name: product.name,
        quantity: value,
        Price: product.price,
      });
    }
    updateList(list);
    // const strValue = JSON.stringify(list);
    // await AsyncStorage.setItem("key", strValue);
  };

  return (
    <View style={styles.infoContainer}>
      <ScrollView>
        <Image
          style={styles.bigImage}
          source={{ uri: product.imageUrl }}
        ></Image>
        <Text style={styles.text}>{product.name}</Text>
        <Text style={styles.productInfo}>{product.description}</Text>
        <Text style={styles.price}>Pris: {product.price} kr</Text>
        <Text style={styles.total}>Antal:</Text>
        <View
          style={{
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <NumericInput
            onChange={(value) => {
              setValue(value);
              /* console.log(value); */
            }}
          
           value={1} 
           minValue={1}
            maxValue={1000} 
            
            totalWidth={240}
            totalHeight={40}
            rounded
          />
        </View>
        <Pressable
          onPress={onPressHandla}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#b2b2b2" : "#000",
            },
          ]}
        >
          <Text style={styles.handla}>Handla</Text>
        </Pressable>
        <Snackbar
          style={styles.snackbar}
          visible={isVisible}
          onDismiss={() => setIsVisible(false)}
          duration={1000}
        >
          Lagd i Varukorgen!
        </Snackbar>
      </ScrollView>
    </View>
  );
};
export default ProductInfo;

const styles = StyleSheet.create({
  infoContainer: {
    /*  backgroundColor:"#fff", */
  },
  bigImage: {
    width: "100%",
    height: 400,
    marginTop: 10,
  },
  text: {
    fontFamily: "Times New Roman",
    /* fontWeight:"bold", */
    fontSize: 28,
    margin: 20,
  },
  productInfo: {
    margin: 20,
    marginTop: -10,
    fontSize: 16,
  },
  price: {
    marginLeft: 20,
    fontWeight: "bold",
    fontSize: 16,
  },
  total: {
    marginLeft: 20,
    fontSize: 25,
    marginBottom: 15,
  },
  press: {
    width: "100%",
    height: 50,
    backgroundColor: "#000",
  },
  handla: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    padding: 15,
  },
  snackbar: {
    backgroundColor: "#2d8659",
    width: "100%",
    bottom: 0,
    height: 50,
  },
});
