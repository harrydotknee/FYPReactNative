import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {TextInput, Button, List} from 'react-native-paper';
import {connect} from 'react-redux';
import SelectedExerciseList from '../components/SelectedExerciseList';
import ExerciseList from '../components/ExerciseList';
import * as SecureStore from 'expo-secure-store';
import {
  addSelectedExercise,
  loadSelectedExercises,
  editWorkoutName,
  fetchWorkouts,
  saveWorkout,
} from '../app/actions';
import MuscleDiagram from '../components/MuscleDiagram';

const API_URL = 'https://3e3a-85-255-236-173.eu.ngrok.io';

const postURLEnd = id => {
  if (id) {
    return `/workouts/${id}`;
  }
  return '/workouts';
}

const EditWorkoutPage = props => {
  const onChangeTitle = text => {
    console.log("change", text);
    props.editWorkoutName(text);
  };

  return (
    <>
      <View style={styles.titleContainer}>
        <TextInput
          defaultValue={props.selectedWorkout.name}
          onChangeText={text => onChangeTitle(text)}
          style={styles.title}
          placeholder='Title'
        />
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => {
            props.saveWorkout(props.selectedWorkout);
            props.navigation.navigate('Workouts');
          }}>
          Save
        </Button>
      </View>
      <View style={styles.diagramContainer}>
        <MuscleDiagram />
      </View>
      <View style={styles.container}>
        <SelectedExerciseList />
      </View>
      <View style={styles.exerciseList}>
        <ScrollView>
          {props.exercises.map((exercise, index) => (
            <List.Item
              key={index}
              title={exercise.name}
              left={iconProps => <List.Icon {...iconProps} />}
              onPress={() => props.addSelectedExercise(exercise)}
            />
          ))}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: 200,
    marginTop: -280,
  },
  diagramContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '40%',
    height: 150,
  },
  titleContainer: {
    flexDirection: 'row',
    height: 50,
  },
  exerciseList: {
    borderTopColor: 'black',
    borderTopWidth: 1,
    height: '50%',
  },
  title: {
    flex: 1,
    flexDirection: 'row',
  },
});

const mapStateToProps = state => {
  return {
    selectedWorkout: state.selectedWorkout,
    workouts: state.workouts,
    exercises: state.exercises,
  };
};

export default connect(mapStateToProps, {
  editWorkoutName,
  addSelectedExercise,
  fetchWorkouts,
  saveWorkout,
})(EditWorkoutPage);
