import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import NumericInput from "react-native-numeric-input";
import { Alert } from "react-native";
import { Snackbar } from "react-native-paper";
import { useCartContext } from "../.expo/Context/cartContext";
import DropDownSize from '../Components/dropDownSize';
import { useTranslation } from "react-i18next";

const ProductInfo = (props) => {
  const {t,i18n} = useTranslation();
  const [product, setProduct] = useState({});

  const [isVisible, setIsVisible] = useState(false);

  const { list, updateList } = useCartContext();

  const [selected, setSelected] = useState(undefined);
  const [submitted, setSubmitted] = useState(false);
  const [value, setValue] = useState(0);
  const [size,setSize]=useState("");

  const data = [
   /*  { label: "Välj storlek", value: "1" }, */
    { label: t("S"), value: "1" },
    { label: t("M"), value: "2" },
    { label: t("L"), value: "3" },
    { label: t("XL"), value: "4" },
  ];

  useEffect(() => {
    const productData = props.route.params?.product || {};
    setProduct(productData);
    props.navigation.setOptions({
      title: productData.name,
    });
  });


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
    let size="";
    size=selected.label;
    setSize(size);
    const existingIndex = list.findIndex((item) => item.id === product.id&&item.size===size);
    if (existingIndex > -1) {
      list[existingIndex].quantity += value;
    } else {
      list.push({
        id: product.id,
        productId: product.id,
        imgUrl: product.imageUrl,
        name: product.name,
        quantity: value,
        size:size,
        Price: product.price,
      });
    }
    updateList(list);
    console.log(list);
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
        <Text style={styles.price}>{t('Pris')}: {product.price} {t('kr')}</Text>
        <DropDownSize label="Välj storlek" data={data} onSelect={setSelected} />
        <Text style={styles.total}>{t('Antal')}:</Text>
        <View
          style={{
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <NumericInput
            onChange={(value) => {
              setValue(value);
            }}        
            value={1} 
            minValue={1}
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
          <Text style={styles.handla}>{t('Handla')}</Text>
        </Pressable>
        <Snackbar
          style={styles.snackbar}
          visible={isVisible}
          onDismiss={() => setIsVisible(false)}
          duration={1000}
        >
          {t("Lagd i Varukorgen!")}
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
