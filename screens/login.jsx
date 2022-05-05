import { StyleSheet, View, Pressable, Image } from "react-native";
import React, { useState,} from "react";
import { TextInput, Text } from "react-native-paper";
import { useUserContext } from "../.expo/Context/userContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {signIn} = useUserContext()

  const onPressLogin = () => {
    //Login on server
    signIn(username,password)
  };

  return (
    <View style={styles.body}>
      <Image
        style={styles.pic}
        resizeMode="contain"
        source={require("../assets/reaklamrock.png")}
      />
      <View style={styles.container}>
        <TextInput
          label="Användarnamn"
          value={username}
          style={styles.input}
          mode="flat"
          onChangeText={(value) => setUsername(value)}
          activeUnderlineColor="orange"
        />
        <TextInput
          label="Lösenord"
          value={password}
          style={styles.input}
          mode="flat"
          onChangeText={(value) => setPassword(value)}
          activeUnderlineColor="orange"
        />
      </View>

      <View style={styles.loginContainer}>
        <Pressable
          onPress={onPressLogin}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#b2b2b2" : "#000",
            },
          ]}
        >
          <Text style={styles.login}>Logga in</Text>
        </Pressable>
      </View>
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#fff",
    height: "100%",
  },
  pic: {
    alignSelf: "center",
    marginTop: 110,
    width: 300,
    height: 150,
  },
  container: {
    margin: 30,
  },
  input: {
    backgroundColor: "#fff",
  },
  loginContainer: {
    margin: 30,
    marginTop: 70,
  },
  press: {
    width: "100%",
    height: 50,
    backgroundColor: "#000",
  },
  login: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    padding: 15,
  },
});
