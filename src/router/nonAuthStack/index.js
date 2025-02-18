import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../screens/NonAuthScreens/HomeScreen";
import TaskDetailScreen from "../../screens/NonAuthScreens/TaskDetailScreen";
import AddTaskScreen from "../../screens/NonAuthScreens/AddTaskScreen";

import routes from "./../../contants/routes";

const NonAuth = createStackNavigator();

const NonAuthStack = () => {
  return (
    <NonAuth.Navigator screenOptions={{ headerShown: false }}>
      <NonAuth.Screen name={routes.HomeScreen} component={HomeScreen} />
      <NonAuth.Screen name={routes.DetailScreen} component={TaskDetailScreen} />

      <NonAuth.Screen name={routes.AddToDoScreen} component={AddTaskScreen} />
    </NonAuth.Navigator>
  );
};

export default NonAuthStack;
