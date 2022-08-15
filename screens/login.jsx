import { StyleSheet, View, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { TextInput, Text } from "react-native-paper";
import { useUserContext } from "../src/Context/userContext";
import AppLoad from "./appLoad";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t, i18n } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn } = useUserContext();

  const onPressLogin = async () => {
    try {
      setLoading(true);
      //Login on server
      await signIn(username, password);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (loading) return <AppLoad />;

  return (
    <View style={styles.body}>
      <Image
        style={styles.pic}
        resizeMode="contain"
        source={require("../assets/reaklamrock.png")}
      />
      <View style={styles.container}>
        <TextInput
          label={t("Användarnamn")}
          value={username}
          style={styles.input}
          mode="flat"
          onChangeText={(value) => setUsername(value)}
          activeUnderlineColor="orange"
        />
        <TextInput
          label={t("Lösenord")}
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
          <Text style={styles.login}>{t("Logga in")}</Text>
        </Pressable>
      </View>
      {loading && <AppLoad />}
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
