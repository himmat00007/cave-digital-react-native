import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import NonAuthStack from "./nonAuthStack";
import AuthStack from "./authStack";
import { useSelector } from "react-redux";
const MainStack = createStackNavigator();

const MainStackScreen = () => {
  const isAuthenticated = useSelector((state) => state?.user?.token);

  return (
    <NavigationContainer>
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <MainStack.Screen name="NonAuth" component={NonAuthStack} />
        ) : (
          <MainStack.Screen name="Auth" component={AuthStack} />
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackScreen;
