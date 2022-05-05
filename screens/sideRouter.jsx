import { createDrawerNavigator } from "@react-navigation/drawer";
import TShirt from './tShirt';
import 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();

const SideRouter = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen  name="T-shirt" component={TShirt}/>
    </Drawer.Navigator> 
  );
};
export default SideRouter;
