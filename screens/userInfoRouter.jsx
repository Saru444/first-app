import { createStackNavigator } from "@react-navigation/stack";
import EditUserInfo from "./editUserInfo";
import KontoScreen  from './kontoInfo';
import AddNewAdress from './addNewAdress';
import ChangePwd from './changePwd';
import OrderHistory from './orderHistory';
import CheckOut from "./checkOut";
import EditAddress from "./editAddress";

const Stack = createStackNavigator()

const UserInfoRouter = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Ditt konto" component={KontoScreen} />
      <Stack.Screen name="Användaruppgifter" component={EditUserInfo} />
      <Stack.Screen name="Add Adress" component={AddNewAdress}/>  
      <Stack.Screen name="ÄNDRA LÖSENORD" component={ChangePwd}/>  
      <Stack.Screen name="ÄNDRA ADRESS" component={EditAddress}/>  
      <Stack.Screen name="Order History" component={OrderHistory}/>
      <Stack.Screen name="Kassa" component={CheckOut}/>
    </Stack.Navigator>
  );
};
export default UserInfoRouter;
