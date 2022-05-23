import React, { useRef, useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DropDownSize = ({ label, data, onSelect }) => {
  const DropdownButton = useRef();

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [dropdownTop, setDropdownTop] = useState(0);

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

  const useDropdown = () => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = () => {
    DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h);
    });
    setVisible(true);
  };
  const onItemPress = (item) => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
        <Text>{item.label}</Text>
      </TouchableOpacity>
    </View>
  );
  const renderDropdown = () => {
    return (
      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity onPress={() => setVisible(false)}>
          <View style={[styles.dropdown, { top: dropdownTop }]}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.value}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };
  return (
    <TouchableOpacity
      ref={DropdownButton}
      style={styles.button}
      onPress={useDropdown}
    >
      {renderDropdown()}
      <Text style={styles.buttonText}>
        {(!!selected && selected.label) || label}
      </Text>
      <Octicons
        name="chevron-down"
        size={24}
        color="black"
        style={{ paddingHorizontal: 50 }}
      />
    </TouchableOpacity>
  );
};
export default DropDownSize;
const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    width: 250,
    height: 50,
    margin: 20,
    marginLeft:60,
    borderWidth: 1,
   borderColor:"#DEDBDB",
   borderRadius: 10,
  },
  buttonText: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  dropdown: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 10,
    shadowColor: "gray",
    shadowRadius: 4,
    shadowOffset: { height: 5, width: 0 },
    shadowOpacity: 0.5,
  },
  item: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#DEDBDB",
    margin: 10,
  },
});
