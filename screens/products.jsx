import axios from "axios";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import ProductItem from "../Components/ProductItem";

const Products = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://94f6-81-226-206-31.eu.ngrok.io/api/Product")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((reason) => {});
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        numColumns={2}
        renderItem={({ item }) => <ProductItem data={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
export default Products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
