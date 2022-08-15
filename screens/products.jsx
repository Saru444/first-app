import axios from "axios";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import ProductItem from "../Components/ProductItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Dropdown from "../Components/dropdown";
import { Searchbar } from "react-native-paper";
import { useTranslation } from "react-i18next";
import SwitchSelector from "react-native-switch-selector";

const Products = (props) => {
  const { t, i18n } = useTranslation();

  const [searchQuery, setSearchQuery] = useState("");

  const [products, setProducts] = useState([]);
  const [queriedProducts, setQueriedProducts] = useState([]);
  const [id, setId] = useState("");
  // dropdown data
  const [selected, setSelected] = useState(undefined);
  const data = [
    { label: t("Alla"), value: "1" },
    { label: t("Kläder"), value: "2" },
    { label: t("KontorsMaterial"), value: "3" },
  ];

  const options = [
    { label: t("Engelska"), value: "en" },
    { label: t("kinesiska"), value: "cn" },
    { label: t("Svenska"), value: "sv" },
  ];
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
        `https://56a0-81-226-206-31.eu.ngrok.io/api/Product/getUserProducts/${id}`
      )
      .then((res) => {
        let products = res.data;
        setProducts(products);
        setQueriedProducts(products);
      })
      .catch((reason) => {});
  }, [id]);

  useEffect(() => {
    if (selected === undefined) {
      setQueriedProducts(products);
    } else if (selected.label === "All") {
      setQueriedProducts(products);
    } else {
      setQueriedProducts(
        products.filter((product) => product.mainCategory === selected.label)
      );
    }
  }, [selected]);

  const searchFun = (query) => {
    setSearchQuery(query);
  };

  return (
    <View style={styles.container}>
      <View style={styles.language}>
        <SwitchSelector
          options={options}
          hasPadding
          initial={0}
          onPress={(language) => {
            i18n.changeLanguage(language);
          }}
          buttonColor={"orange"}
        />
      </View>
      <Searchbar
        placeholder={t("Vad letar du efter?")}
        onChangeText={(query) => searchFun(query)}
        value={searchQuery}
        style={styles.search}
      />
      <Dropdown label={t("Category")} data={data} onSelect={setSelected} />
      <FlatList
        data={
          products.filter((item) => {
            const itemData = `
            ${item.name.toUpperCase()}
            ${item.ean.toUpperCase()}
            `;
            const queryData = searchQuery.toUpperCase();
            return itemData.indexOf(queryData) > -1;
          })
          /*  .filter((item) => item.mainCategory===selected.label)   */
        }
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
  search: {
    marginTop: 40,
  },
  language: {
    width: 375,
    marginTop: 50,
  },
});
