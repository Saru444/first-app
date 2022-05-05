import 'react-native-gesture-handler';
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MainRouter from "./screens/mainRouter";
import { UserContextProvider } from "./.expo/Context/userContext";
import { LogBox } from "react-native";



const App = () => {

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
});
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <UserContextProvider>
          <NavigationContainer>
            <MainRouter>
{/*              <SideRouter /> */}
            </MainRouter>
          </NavigationContainer>
        </UserContextProvider>
      </SafeAreaProvider>
    </PaperProvider>
  );
};
export default App;


