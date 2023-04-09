import React from "react";

import {createStackNavigator} from "@react-navigation/stack";
import {Appbar} from "react-native-paper"
import {getHeaderTitle} from "@react-navigation/elements";

import WorkoutsPage from "./pages/WorkoutsPage";
import EditWorkoutPage from "./pages/EditWorkoutPage";
import ShowWorkoutPage from "./pages/ShowWorkoutPage";
import PlayWorkout from "./pages/PlayWorkout";
import ViewTitle from "./headers/ViewTitle";
const Stack = createStackNavigator();

const NavigationBar = ({navigation, route, options, back}) => {
  const title = getHeaderTitle(options, route.name);
  return (
    <Appbar.Header>
      {back ? (
        <Appbar.Action icon="arrow-left" onPress={navigation.goBack} />
      ) : null}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

const WorkoutsScreenNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: props => <NavigationBar {...props} />,
      }}>
      <Stack.Screen name="Workouts" component={WorkoutsPage} />
      <Stack.Screen name="EditWorkout" component={EditWorkoutPage} />
      <Stack.Screen
        name="ShowWorkout"
        component={ShowWorkoutPage}
        header={ViewTitle}
      />
      <Stack.Screen name="Play" component={PlayWorkout} />
    </Stack.Navigator>
  );
}

export {WorkoutsScreenNavigator};
