import React, { useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartContext = React.createContext();

export const useCartContext = () => {
  return useContext(CartContext);
};

export const CartContextProvider = (props) => {
  const [list, setList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [coupon, setCoupon] = useState("");

  const loadCart = async () => {
    const value = await AsyncStorage.getItem("key");
    let list = [];
    if (value !== null) {
      list = JSON.parse(value);
    }
    setList(list);
    setLoading(false);
  };

  // fick coupon här
  const loadCoupon = async () => {
    const couponStr = await AsyncStorage.getItem("discountKey");
    let coupon = "";
    if (couponStr !== null) {
      coupon = JSON.parse(couponStr);
    }
    setCoupon(coupon);
    /*  console.log(coupon); */
  };

  useEffect(() => {
    let totalPrice = 0;
    let totalAmount = 0;
    for (var i in list) {
      totalPrice += list[i].Price * list[i].quantity;
    }
    for (var item in list) {
      totalAmount += list[item].quantity;
    }
    setTotalPrice(((totalPrice * 100) / 100).toFixed(2));
    setTotalAmount(totalAmount);
  }, [list]);

  useEffect(() => {
    loadCart();
  }, []);
  useEffect(() => {
    loadCoupon();
  }, []);

  const removeData = async (id, size) => {
    const rawData = await AsyncStorage.getItem("key");
    if (rawData === null) return;
    const data = JSON.parse(rawData);
    const updatedData = data.filter(
      (item) => item.id !== id || item.size !== size
    );
    const updatedString = JSON.stringify(updatedData);
    await AsyncStorage.setItem("key", updatedString);
    loadCart();
  };

  const updateList = async (newList) => {
    AsyncStorage.setItem("key", JSON.stringify(newList));
    setList([...newList]);
  };
  const updateCoupon = async (rabbat) => {
    await AsyncStorage.setItem("discountKey", JSON.stringify(rabbat));
    setCoupon(rabbat);
  };

  const cleanCart = async () => {
    const data = await AsyncStorage.removeItem("key");
    setList(data);
    loadCart();
  };
  const cleanCoupon = async () => {
    const discountData = await AsyncStorage.removeItem("discountKey");
    setCoupon(discountData);
    loadCoupon();
  };
  return (
    <CartContext.Provider
      value={{
        list,
        updateList,
        totalPrice,
        totalAmount,
        removeData,
        loading,
        cleanCart,
        coupon,
        updateCoupon,
        cleanCoupon,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
