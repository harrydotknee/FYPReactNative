import React from 'react';
import {Text, View} from 'react-native';
import {List, Button} from 'react-native-paper';
import ExerciseList from '../components/ExerciseList';

const ShowWorkoutPage = ({route, navigation}) => {
  console.log(route.params.workout);
  const exercises = route.params.workout.exercises;
  return (
    <>
      <View>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate('EditWorkout', {workout: route.params.workout});
          }}>
          Edit Workout
        </Button>
        <ExerciseList exercises={exercises} />
      </View>
    </>
  );
};

export default ShowWorkoutPage;
