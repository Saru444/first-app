import ProductsScreen from "./products"
import ProductInfo from "./productInfo"
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator()

const ProductRouter = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Products" component={ProductsScreen} />
        <Stack.Screen name="productInfo" component={ProductInfo} />
    </Stack.Navigator>
  );
};

export default ProductRouter