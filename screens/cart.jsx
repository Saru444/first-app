import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { SwipeListView } from "react-native-swipe-list-view";
import { useNavigation } from "@react-navigation/native";
import { useCartContext } from "../.expo/Context/cartContext";
import { ScrollView } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
 

const CartScreen = () => {
  const navigation = useNavigation();
  const {t,i18n} =useTranslation();

  const { list, removeData, totalPrice, cleanCart, totalAmount } =
    useCartContext();

  const onPressCheckout = () => {
    navigation.navigate("Kassa");
  };

  const noProducts = () => {
    return (
      <View>
        <Text style={styles.noProductsText}>{t("Din varukorg är tom!")}</Text>
      </View>
    );
  };

  const showProducts = () => {
    return (
      <View style={styles.bigContainer}>
        <View style={styles.container}>
          <MaterialCommunityIcons name="shopping" size={28} />
          <Text style={styles.text}>{t("Produkt i cart")}</Text>
        </View>
        <SwipeListView
          contentContainerStyle={styles.flatList}
          data={list}
          extraData={list}
          renderItem={({ item }, rowMap) => (
            <View style={styles.cartInfo}>
              <View style={styles.picContainer}>
                <Image style={styles.image} source={{ uri: item.imgUrl }} />
              </View>
              <View style={styles.textArea}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.smallText}>
                  {item.Price * item.quantity} {t('kr')}
                </Text>
                <Text style={styles.smallText}>{t("Storlek")}: {item.size}</Text>
                <Text style={styles.smallText}>{t("Antal")}: {item.quantity}</Text>
              </View>
            </View>
          )}
          renderHiddenItem={({ item }, rowMap) => (
            <View
              style={{
                height: 150,
                width: 70,
                backgroundColor: "red",
                position: "absolute",
                right: 0,
              }}
            >
              <Pressable onPress={() => removeData(item.id,item.size)}>
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    lineHeight: 150,
                    textAlign: "center",
                  }}
                >
                  Ta bort
                </Text>
              </Pressable>
            </View>
          )}
          rightOpenValue={-70}
          disableRightSwipe
          keyExtractor={(item) => `${item.id}${item.size}`}
        />
        <View style={styles.totalPriceContainer}>
          <Text style={styles.totalPrice}>{t("TOTALBELOPP")}</Text>
          <Text style={styles.totalPrice}>{totalPrice} {t('kr')}</Text>
        </View>
        <View style={styles.footer}>
          <Pressable
            onPress={onPressCheckout}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#b2b2b2" : "#000",
              },
            ]}
          >
            <Text style={styles.checkout}>{t("Till checkout")}</Text>
          </Pressable>
        </View>
      </View>
    );
  };
  return (
    <View>
     {!list||list.length>0?showProducts():noProducts()}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  bigContainer: {
    backgroundColor: "#fff",
    height: "100%",
  },
  container: {
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#b2b2b2",
  },
  text: {
    fontSize: 20,
    marginLeft: 40,
    marginTop: -22,
    marginBottom: 10,
  },
  cartInfo: {
    flexDirection: "row",
    width: "100%",
    height: 150,
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
  trash: {
    margin: 20,
    marginLeft: 100,
  },
  totalPriceContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 20,
  },
  press: {
    width: "80%",
    height: 40,
    backgroundColor: "#000",
    bottom: 0,
  },
  checkout: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    padding: 15,
  },
  noProductsText:{
     fontSize:22,
     textAlign:"center",
     margin:50,
  }  
});
