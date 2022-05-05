import { Text, View, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import CheckBox from "expo-checkbox";

const EditAddress = () => {

  const [isSelected, setSelection] = useState(false);
  const [isOn, setOption] = useState(false);

  const onPressSave = () => {};

  return (
    <View style={styles.bigContainer}>
      <View style={styles.container}>
        <TextInput
          label="FÖRETAG*"
          style={styles.input}
          mode="flat"
          onChangeText={(value) => setAdress(value)}
          activeUnderlineColor="orange"
        />
        <TextInput
          label="GATA"
          style={styles.input}
          mode="flat"
          onChangeText={(value) => setAdress(value)}
          activeUnderlineColor="orange"
        />
        <TextInput
          label="POSTNUMER"
          style={styles.input}
          mode="flat"
          keyboardType="phone-pad"
          onChangeText={(value) => setAdress(value)}
          activeUnderlineColor="orange"
        />
        <TextInput
          label="ORT"
          style={styles.input}
          mode="flat"
          onChangeText={(value) => setAdress(value)}
          activeUnderlineColor="orange"
        />
      </View>
      <View>
        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox1}
          color={isSelected ? "orange" : "#b2b2b2"}
        />
        <Text style={styles.send}>Leveransadress </Text>
        <CheckBox
          value={isOn}
          onValueChange={setOption}
          style={styles.checkbox2}
          color={isOn ? "orange" : "#b2b2b2"}
        />
        <Text style={styles.send}>Fakturaadress</Text>
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
export default EditAddress;

const styles = StyleSheet.create({
  bigContainer: {
    backgroundColor: "#fff",
    height: "100%",
  },
  container: {
    margin: 20,
  },
  input: {
    backgroundColor: "#fff",
  },
  checkbox1: {
    borderRadius: 100,
    marginLeft: 30,
    marginTop: 35,
  },
  checkbox2: {
    borderRadius: 100,
    marginLeft: 30,
    marginTop: 18,
  },
  send: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 65,
    marginTop: -18,
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
