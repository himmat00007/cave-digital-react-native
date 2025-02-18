import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../../screens/AuthScreens/LoginScreen";
import SignupScreen from "../../screens/AuthScreens/SignupScreen";
import routes from "./../../contants/routes";
const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={routes.LoginScreen}
    >
      <Stack.Screen name={routes.LoginScreen} component={LoginScreen} />
      <Stack.Screen name={routes.SignUp} component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
