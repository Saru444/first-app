import { View, StyleSheet,Text } from "react-native";
import LottieView from "lottie-react-native";
import { useTranslation } from "react-i18next";
  
const SendLoad = () => {
  const {t,i18n} =useTranslation();
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <LottieView
        style={styles.load}
        source={require("../assets/dots-loading.json")}
        autoPlay
        loop
      />
      <Text>{t("Skickar")}...</Text>
    </View>
  );
};

export default SendLoad;

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