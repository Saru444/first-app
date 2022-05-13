import { createStackNavigator } from "@react-navigation/stack";
import CartScreen from "./cart";
import CheckOut from "./checkOut";
import OrderConfirmation from "./orderConfirmation";


const Stack=createStackNavigator();

const CartRouter=()=>{
    return(
      <Stack.Navigator>
          <Stack.Screen name="Varukorg"  component={CartScreen} />
          <Stack.Screen name="Kassa" component={CheckOut} />
          <Stack.Screen name="klart" component={OrderConfirmation} />
      </Stack.Navigator>
    )
}
export default CartRouter;