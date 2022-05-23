import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const AppLoad = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <LottieView
        style={styles.load}
        source={require("../assets/loading-gray.json")}
        autoPlay
        loop
      />
    </View>
  );
};

export default AppLoad;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0)",
    zIndex: 1,
  },
  load:{
    width: 100,
    height: 100,

  }
});
