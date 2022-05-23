import { createStackNavigator } from "@react-navigation/stack";
import CartScreen from "./cart";
import CheckOut from "./checkOut";
import OrderConfirmation from "./orderConfirmation";
import { useTranslation } from "react-i18next";
import ScanFun from './scanFun';
 

const Stack=createStackNavigator();


const CartRouter=()=>{
  const {t,i18n} =useTranslation();
    return(
      <Stack.Navigator>
          <Stack.Screen name="Varukorg"  options={{title:t("Varukorg")}} component={CartScreen} />
          <Stack.Screen name="Kassa" options={{title:t("Kassa")}} component={CheckOut} />
          <Stack.Screen name="klart" component={OrderConfirmation} options={{headerShown:false}}/>
          <Stack.Screen name="Scan" component={ScanFun} />
      </Stack.Navigator>
    )
}
export default CartRouter;