import { StyleSheet, View } from "react-native";

const DrawerContent = (props) => {
  return (
    <View style={{ flex: 1 }}>
    
    </View>
  );
};
export default DrawerContent;

const styles = StyleSheet.create({
  drawerContext: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 15,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
});
