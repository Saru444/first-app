import { createStackNavigator } from "@react-navigation/stack";
import Login from "./login";

const Stack = createStackNavigator();

const LoginRouter = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default LoginRouter;
