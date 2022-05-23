import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapView, { Callout, Circle } from "react-native-maps";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useMemo, useCallback, useRef, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";


 
const height = Dimensions.get("window").height;

const Map = () => {
  const {t,i18n} =useTranslation();

  const sheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);

  const snapPoints = useMemo(() => ["40%", "100%"], []);

  const handleSheetChanges = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
    setIsOpen(true);
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        loadingEnabled={true}
        region={{
          latitude: 59.213070195303956,
          longitude: 15.134695469514723,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        provider="google"
      >
        <MapView.Marker
          coordinate={{
            latitude: 59.213070195303956,
            longitude: 15.134695469514723,
          }}
          /* pinColor='blue' */
          /*  draggable={true} */
          title={"Reklamrocken"}
          /*   image={require('../assets/reaklamrock.png')}
           */
        />
        <Circle
          center={{
            latitude: 59.213070195303956,
            longitude: 15.134695469514723,
          }}
          radius={300}
        />
      </MapView>
      <View style={styles.bottomContainer}>
        <BottomSheet
        ref={sheetRef}
          snapPoints={snapPoints}
          /*  enablePanDownToClose={true}  */
         onClose={()=>setIsOpen(false)}
          onChange={handleSheetChanges}
        >
          <BottomSheetView>
            <View style={styles.headerText}>
              <MaterialIcons
                name="location-city"
                size={26}
                color="black"
                style={styles.icon}
              />
              <Text style={styles.bigText}>{t("Örebro")}</Text>
            </View>
            <View style={styles.addressText}>
              <Text style={styles.text}>Kundvägen 2, 702 31 Örebro</Text>
              <Text style={styles.middleText}>{t("Öppettider")}</Text>
              <Text style={styles.text}>{t("Måndag-Fredag")}: 09:00-18:00</Text>
              <Text style={styles.text}>{t("Lördag")}: 10:00-14:00</Text>
              <Text style={styles.middleText}>{t("Kontakta oss")}</Text>
              <Text style={styles.text}>0775-700 500</Text>
              <Text style={styles.text}>test.123@yreklamrocken.se</Text>
            </View>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </View>
  );
};
export default Map;

const styles = StyleSheet.create({
    container: {
     position:"relative", 
   
  }, 
  map: {
    height,
 
  },
  bottomContainer: {
      
    padding: 200,
    position:"absolute",
    marginTop:370, 
  },
  headerText: {
    display: "flex",
    flexDirection: "row",
    margin: 10,
  },
  icon: {
    marginRight: 10,
  },
  bigText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  text: {
    marginLeft: 15,
    fontSize: 16,
    marginBottom: 10,
  },
  middleText: {
    fontSize: 19,
    fontWeight: "bold",
    margin: 15,
  },
});
