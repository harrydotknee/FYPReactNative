import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {TextInput, Button, List, Surface} from 'react-native-paper';
import {connect} from 'react-redux';
import SelectedExerciseList from '../components/SelectedExerciseList';
import ExerciseList from '../components/ExerciseList';
import * as SecureStore from 'expo-secure-store';
import {useNavigation} from '@react-navigation/native';
import {
  addSelectedExercise,
  loadSelectedExercises,
  editWorkoutName,
  fetchWorkouts,
  saveWorkout,
} from '../app/actions';
import MuscleDiagram from '../components/MuscleDiagram';
import { TouchableOpacity } from 'react-native-gesture-handler';

const API_URL = 'https://8815-81-106-97-58.ngrok-free.app';

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

  const navigation = useNavigation();

  useEffect(() => {
    if (props.selectedWorkout.name) {

      navigation.setOptions({
        title: props.selectedWorkout.name,
      });
    } else {
      navigation.setOptions({
        title: 'New Workout',
      });
    }
  }, [navigation, props.selectedWorkout.name]);

  return (
    <Surface style={styles.surface}>
      <View style={styles.titleContainer}>
        <TextInput
          defaultValue={props.selectedWorkout.name}
          onChangeText={text => onChangeTitle(text)}
          style={styles.title}
          placeholder='Title'
          mode="outlined"
          maxLength={50}
        />
        <Button
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonText}
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
    </Surface>
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
  surface: {
    height: '100%',
  },
  diagramContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '40%',
    height: 150,
  },
  titleContainer: {
    flexDirection: 'row',
    height: 55,
    width: '100%',
  },
  exerciseList: {
    borderTopColor: 'black',
    borderTopWidth: 1,
    height: '50%',
  },
  title: {
    height: 50,
    width: '80%',
  },
  button: {
    width: '20%',
    height: 50,
    borderRadius: 5,
    paddingVertical: 3,
    marginTop: 5,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
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
