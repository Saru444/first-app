import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const ProductItem = (props) => {
  const navigation = useNavigation();
  const {t,i18n} =useTranslation();

  const onItemPressed = () => {
    navigation.navigate("productInfo", { product: props.data });
  };

  return (
    <TouchableOpacity onPress={onItemPressed}>
      <View style={styles.container}>
        <Image
          style={styles.images}
          source={{ uri: props.data.imageUrl }}
        ></Image>
        <Text style={styles.text}>{props.data.name}</Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.description}>
          {props.data.description}
        </Text>
        <Text style={styles.price}>{t('Pris')}: {props.data.price} {t('kr')}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default ProductItem;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    marginLeft: 10,
    marginBottom: 15,
    width: 174,
    height: 250,
    backgroundColor: "#fff",
  },
  images: {
    alignSelf: "center",
    width: 130,
    height: 140,
    marginTop: 10,
  },
  text: {
    fontFamily: "Times New Roman",
    fontSize: 18,
    margin: 8,
    marginTop: 20,
    marginBottom: 3,
  },

  description: {
    marginBottom: 7,
    marginLeft: 8,
  },
  price: {
    marginLeft: 8,
    fontWeight: "bold",
  },
});
