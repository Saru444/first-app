import React, {useContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native-paper";
import { View } from "react-native";

const UserContext = React.createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const init = async () => {
    setLoading(false); 
    setUser({});
  };

  useEffect(() => {
    init();
  }, []);

  const signIn = async (username, password) => {
    //Login code
    const getTokenResponse = await fetch(
      "https://56a0-81-226-206-31.eu.ngrok.io/api/Authenticate/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }
    );
    console.log(getTokenResponse.status);
    /* console.log(getTokenResponse.userId); */
    if (getTokenResponse.status !== 200) {
      Alert.alert("warning", "Your username or password is wrong!", [
        { text: "ok" },
      ]);
      return;
    }
    
    const saveUserName = JSON.stringify(username);
    await AsyncStorage.setItem("userkey", saveUserName);

     const object= await getTokenResponse.json();
     await AsyncStorage.setItem('userId',object.userId)
     
  /*    const { token } = await getTokenResponse.json();
    const userId = Base64.decode(token); 
     console.log(userId);  */
    setUser(saveUserName);
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        signIn,
        signOut,
        loading,
        setLoading,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
