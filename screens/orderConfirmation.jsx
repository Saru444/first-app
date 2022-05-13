import { StyleSheet, Text, View,Button } from "react-native";
import LottieView from "lottie-react-native";
import React, { useRef, useEffect,useState } from "react";
import { useNavigation } from "@react-navigation/native";

const OrderConfirmation = () => {
  const navigation = useNavigation();
  setTimeout(()=>{
    navigation.navigate('Products')
  },3000)

  setTimeout(()=>{
    navigation.navigate('Varukorg')
  },3000)


  const renderItem=()=>{
    return( <View style={styles.container}>
      <LottieView
        style={styles.done}
        source={require("../assets/done-task.json")}
        autoPlay
        loop={false} 
      />
      <Text style={styles.text}>Tack för din beställing!</Text>
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
    alignSelf:"center",
  },
  text:{
      fontSize:20,
      fontWeight:"bold",
      alignSelf:"center",
  }
});
