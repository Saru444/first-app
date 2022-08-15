/* import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserInfoContext = React.createContext();

export const useUserInfoContext = () => {
  return useContext(UserInfoContext);
};

export const UserInfoContextProvider = (props) => {
  const [personInfo, setPersonInfo] = useState({ addresses: [] });
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const userName = await AsyncStorage.getItem("userkey");
    let name = "";
    if (userName !== null) {
      name = JSON.parse(userName);
    }
    setName(name);
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (name === "") return;
    axios
      .get(`https://94f6-81-226-206-31.eu.ngrok.io/api/UserDetails/${name}`)
      .then((res) => {
        let personInfo = res.data;
        setLoading(false);
        setPersonInfo(personInfo);
      });
  }, [name]);
  return (
    <UserInfoContext.Provider
      value={{
        personInfo,
        name,
        getData,
      }}
    >
      {props.children}
    </UserInfoContext.Provider>
  );
};
 */