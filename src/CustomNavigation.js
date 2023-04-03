import React from "react";

import {createStackNavigator} from "@react-navigation/stack";

import WorkoutsPage from "./pages/WorkoutsPage";
import EditWorkoutPage from "./pages/EditWorkoutPage";
import ShowWorkoutPage from "./pages/ShowWorkoutPage";
import PlayWorkout from "./pages/PlayWorkout";
import ViewTitle from "./headers/ViewTitle";
const Stack = createStackNavigator();

const WorkoutsScreenNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Workouts" component={WorkoutsPage} />
      <Stack.Screen name="EditWorkout" component={EditWorkoutPage} />
      <Stack.Screen name="ShowWorkout" component={ShowWorkoutPage} header={ViewTitle}/>
      <Stack.Screen name="Play" component={PlayWorkout} />
    </Stack.Navigator>
  );
}

export {WorkoutsScreenNavigator};
