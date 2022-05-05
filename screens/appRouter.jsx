import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { StyleSheet } from "react-native";
import CartScreen from "./cart";
import ProductRouter from "./productRouter";
import UserInfoRouter from "./userInfoRouter";

const Tab = createBottomTabNavigator();

const AppRouter = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabel: () => null,
      }}
    >
      <Tab.Screen
        name="productRouter"
        component={ProductRouter}
        options={{
          headerShown: false,
          tabBarActiveTintColor: "orange",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              size={28}
              color={color}
              name={focused ? "home-assistant" : "home-outline"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="UserInfoRouter"
        component={UserInfoRouter}
        options={{
          headerShown: false,
          tabBarActiveTintColor: "orange",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={28}
              color={color}
              name={focused ? "person-circle" : "person-circle-outline"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Varukorg"
        component={CartScreen}
        options={{
          tabBarActiveTintColor: "orange",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              size={28}
              color={color}
              name={focused ? "cart" : "cart-outline"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default AppRouter;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
