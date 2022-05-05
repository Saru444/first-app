import { View,Text, StyleSheet,Pressable } from "react-native";
import { TextInput } from "react-native-paper";
import React, { useState } from "react";

const ChangePwd = () => {
  const [password, setPassword] = useState([]);
  const onPressSave = () => {};
  return (
    <View style={styles.bigContainer}>
      <View style={styles.container}>
        <TextInput
          label="Gammalt lösenord"
          style={styles.input}
          mode="flat"
          onChangeText={(value) => setPassword(value)}
          activeUnderlineColor="orange"
        />
        <TextInput
          label="Nytt lösenord"
          style={styles.input}
          mode="flat"
          onChangeText={(value) => setPassword(value)}
          activeUnderlineColor="orange"
        />
        <TextInput
          label="Bekräfta nytt lösenord"
          style={styles.input}
          mode="flat"
          onChangeText={(value) => setPassword(value)}
          activeUnderlineColor="orange"
        />
      </View>
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
export default ChangePwd;

const styles = StyleSheet.create({
  bigContainer: {
    backgroundColor: "#fff",
    height: "100%",
  },
  container: {
    margin: 20,
  
  },
  input:{
      backgroundColor:"#fff",
  },
  saveContainer:{
    margin:30,
    marginTop:50,
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
