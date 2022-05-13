import axios from "axios";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
/* import DropDownPicker from "react-native-dropdown-picker"; */
/* import { Picker } from "@react-native-picker/picker"; */
import ProductItem from "../Components/ProductItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Dropdown from '../Components/dropdown';

const Products = (props) => {
  const [products, setProducts] = useState([]);
  const [queriedProducts, setQueriedProducts] = useState([]);
  const [id, setId] = useState("");


  const getData = async () => {
    const userId = await AsyncStorage.getItem("userId");
    let id = "";
    if (userId !== null) {
      id = userId;
    }
    setId(id);
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (id === "") return;
    axios
      .get(
        `https://94f6-81-226-206-31.eu.ngrok.io/api/Product/getUserProducts/${id}`
      )
      .then((res) => {
        let products = res.data;
        setProducts(products);
        setQueriedProducts(products);
      })
      .catch((reason) => {});
  }, [id]);

 
  const [selected, setSelected] = useState(undefined);
  const data = [
    { label: "All", value: "1" },
    { label: "Kläder", value: "2" },
    { label: "KontorsMaterial", value: "3" },
  ];

  useEffect(() => {
    if (selected === undefined) {
      setQueriedProducts(products);
    }
    else if(selected.label==="All"){
      setQueriedProducts(products);
    }
    else {
      setQueriedProducts(products.filter((product) => product.mainCategory === selected.label));
    }
  }, [selected])

  return (
    <View style={styles.container}>
     {/*  <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
      >
        <Picker.Item label="T-Shirt" value="ts" />
        <Picker.Item label="Väskor" value="vs" />
        <Picker.Item label="pennor" value="penna" />
        <Picker.Item label="Mässa" value="ms" />
        <Picker.Item label="Träning" value="tg" />
        <Picker.Item label="Presenter" value="gift" />
      </Picker> */}
      <Dropdown label="Category" data={data} onSelect={setSelected} />
      <FlatList
        data={queriedProducts}
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
