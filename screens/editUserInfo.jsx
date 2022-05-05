import { Text, View, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";

const EditUserInfo = () => {
  const [userInfo, setUserInfo] = useState();

  const onPressSave = () => {};

  return (
    <View style={styles.bigContainer}>
      <Ionicons style={styles.icon} size={26} name="person-outline" />
      <View style={styles.container}>
        <TextInput
          label="FÖRETAG*"
          mode="flat"
          style={styles.input}
          onChangeText={(value) => setUserInfo(value)}
          activeUnderlineColor="orange"
        />
        <TextInput
          label="TELNUMMER"
          style={styles.input}
          mode="flat"
          keyboardType="numeric"
          onChangeText={(value) => setUserInfo(value)}
          activeUnderlineColor="orange"
        />
        <TextInput
          label="E-POST"
          style={styles.input}
          mode="flat"
          keyboardType="email-address"
          onChangeText={(value) => setUserInfo(value)}
          activeUnderlineColor="orange"
        />
      </View>
      <AntDesign style={styles.phone} name="phone" size={24} color="black" />
      <EvilIcons
        style={styles.letter}
        name="envelope"
        size={30}
        color="black"
      />
      <View style={styles.saveContainer}>
        <Pressable
          onPress={onPressSave}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#b2b2b2" : "#000",
            },
          ]}
        >
          <Text style={styles.spara}>Spara</Text>
        </Pressable>
      </View>
    </View>
  );
};
export default EditUserInfo;

const styles = StyleSheet.create({
  bigContainer: {
    backgroundColor: "#fff",
    height: "100%",
  },
  icon: {
    margin: 10,
    marginTop: 65,
    marginLeft: 25,
  },
  container: {
    marginTop: -57,
    marginLeft: 60,
    backgroundColor: "#fff",
  },
  text: {
    color: "gray",
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    width:"90%",

    backgroundColor: "#fff",
  },
  phone: {
    margin: 10,
    marginTop: -98,
    marginLeft: 25,
  },
  letter: {
    marginTop: 30,
    marginLeft: 25,
  },
  saveContainer: {
    margin: 30,
    marginTop: 50,
  },
  press: {
    width: "100%",
    height: 50,
    backgroundColor: "#000",
  },
  spara: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    padding: 15,
  },
});
