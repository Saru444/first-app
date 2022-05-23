import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, {useState} from "react";
import { StyleSheet } from "react-native";
import CartRouter from "./cartRouter";
import ProductRouter from "./productRouter";
import UserInfoRouter from "./userInfoRouter";
import { useCartContext } from "../.expo/Context/cartContext";
import { Feather } from '@expo/vector-icons'; 
import Map from './map';

const Tab = createBottomTabNavigator();

const AppRouter = () => {
  const [loading,setLoading]=useState(false);
  const { totalAmount } = useCartContext();

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
        name="CartRouter"
        component={CartRouter}
        options={{
          headerShown: false,
          tabBarActiveTintColor: "orange",
          tabBarBadge: totalAmount > 0 ? totalAmount : null,
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              size={28}
              color={color}
              name={focused ? "cart" : "cart-outline"}
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
          )
        }}
      />
      <Tab.Screen 
        name="Kontakta oss"
        component={Map}
        options={{
          headerShown: false,
          tabBarActiveTintColor: "orange",
          tabBarIcon: ({ color}) => (
            <Feather name="more-horizontal" size={28} color={color} />
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
