import ProductsScreen from "./products"
import ProductInfo from "./productInfo"
import { createStackNavigator } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";


const Stack = createStackNavigator()

const ProductRouter = () => {
  const {t,i18n} =useTranslation();
  return (
    <Stack.Navigator>
        <Stack.Screen name="Produkt" options={{title:t("Produkt"),headerShown:false}} component={ProductsScreen} />
        <Stack.Screen name="productInfo" component={ProductInfo} />
    </Stack.Navigator>
  );
};

export default ProductRouter