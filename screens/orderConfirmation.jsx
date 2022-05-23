import { StyleSheet, Text, View,Button } from "react-native";
import LottieView from "lottie-react-native";
import React, { useRef, useEffect,useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

 

const OrderConfirmation = () => {
  const {t,i18n} =useTranslation();
  const navigation = useNavigation();
  setTimeout(()=>{
    navigation.navigate('Produkt')
  },2000) 

  setTimeout(()=>{
    navigation.navigate('Varukorg')
  },2000)

  const renderItem=()=>{
    return( <View style={styles.container}>
      <LottieView
        style={styles.done}
        source={require("../assets/done-task.json")}
        autoPlay
        loop={false} 
      />
      <Text style={styles.text}>{t("Tack för din beställing!")}</Text>
    </View>)
  }
  return (
    <View>
          {
      renderItem()
    }
    </View>
   
  );
};
export default OrderConfirmation;

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#fff",
        height:"100%",
  /*       display:"flex",
        flex:1,
      justifyContent:"center",
      alignItems:"center", */
    },
  done: {
    width: 280,
    height: 280,
    margin:20,
    alignSelf:"center",
  },
  text:{
      fontSize:20,
      fontWeight:"bold",
      alignSelf:"center",
  }
});
