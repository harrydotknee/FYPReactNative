import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import SelectedExerciseList from '../components/SelectedExerciseList';
import ExerciseList from '../components/ExerciseList';

const EditWorkoutPage = ({route, navigation}) => {
  return (
    <>
      <View style={styles.container}>
        <SelectedExerciseList exercises={route.params.workout.exercises} />
      </View>
      <View style={styles.exerciseList}>
        <ExerciseList exercises={route.params.workout.exercises} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  exerciseList: {
    borderTopColor: 'black',
    borderTopWidth: 1,
    height: '50%',
  },
});

export default EditWorkoutPage;
