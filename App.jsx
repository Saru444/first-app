import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MainRouter from "./screens/mainRouter";
import { UserContextProvider } from "./.expo/Context/userContext";
import { CartContextProvider } from "./.expo/Context/cartContext";
import { LogBox } from "react-native";
import SideRouter from "./screens/sideRouter";

const App = () => {
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  });
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <UserContextProvider>
        <CartContextProvider>
          <NavigationContainer>
          {/* <SideRouter /> */}
              <MainRouter>    
            </MainRouter>         
          </NavigationContainer>
        </CartContextProvider>
        </UserContextProvider>
      </SafeAreaProvider>
    </PaperProvider>
  );
};
export default App;
