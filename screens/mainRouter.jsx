import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { StyleSheet,View,Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useUserContext } from "../.expo/Context/userContext";
import AppLoad from "./appLoad";
import AppRouter from "./appRouter";
import LoginRouter from "./loginRouter";

const Stack = createStackNavigator();

const MainRouter = () => {
  const { loading, user } = useUserContext(false);

  if (loading)
    return (
      <AppLoad />
    );

  return (
    
    <Stack.Navigator initialRouteName="home">
      {user !== null ? (
        <Stack.Screen name="home" component={AppRouter}  options={{ headerShown: false }} />
      ) : (
        <Stack.Screen
          name="home"
          component={LoginRouter}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};
export default MainRouter;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
