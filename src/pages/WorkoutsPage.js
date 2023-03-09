import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import WorkoutsList from '../components/WorkoutsList';

const WorkoutsPage = ({route, navigation, workouts}) => {
  return (
    <View>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('CreateWorkout')}>
        Create Workout
      </Button>
      <WorkoutsList />
    </View>
  );
};

export default WorkoutsPage;
