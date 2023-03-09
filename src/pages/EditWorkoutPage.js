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
  fetchWorkouts
} from '../app/actions';

const API_URL = 'https://dca6-148-252-129-117.eu.ngrok.io';

const EditWorkoutPage = props => {
  const [allExercises, setAllExercises] = useState([]);
  const [workoutName, setWorkoutName] = useState('');

  const getExercises = async () => {
    const getCredentials = await SecureStore.getItemAsync('credentials');
    const credentialsObject = JSON.parse(getCredentials);
    const credentials = {
      'access-token': credentialsObject['access-token'],
      'client': credentialsObject['client'],
      'uid': credentialsObject['uid'],
    };
    fetch(`${API_URL}/exercises?` + new URLSearchParams(credentials), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async res => {
      try {
        const jsonRes = await res.json();
        console.log(res.status);
        if (res.status === 200) {
          console.log(jsonRes);
          setAllExercises(jsonRes);
        }
      } catch (err) {
        console.log(err);
      }
    });
  };

  useEffect(() => {
    getExercises();
  }, []);

  const onSave = async () => {
    const getCredentials = await SecureStore.getItemAsync('credentials');
    const credentialsObject = JSON.parse(getCredentials);
    const credentials = {
      'access-token': credentialsObject['access-token'],
      'client': credentialsObject['client'],
      'uid': credentialsObject['uid'],
    };
    fetch(
      `${API_URL}/workouts/${props.selectedWorkout.id}?` +
        new URLSearchParams(credentials),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: props.selectedWorkout.id,
          name: props.selectedWorkout.name,
          exercises: props.selectedWorkout.exercises,
        }),
      },
    ).then(async res => {
      try {
        const jsonRes = await res.json();
        console.log(res.status);
        if (res.status === 200) {
          console.log(jsonRes);
          props.fetchWorkouts();
          props.navigation.navigate('Workouts');
        }
      } catch (err) {
        console.log(err);
      }
    });
  };

  const onChangeTitle = text => {
    props.editWorkoutName(text);
  };

  return (
    <>
      <View style={styles.titleContainer}>
        <TextInput
          defaultValue={props.selectedWorkout.name}
          onChangeText={text => onChangeTitle(text)}
          style={styles.title}
        />
        <Button mode="contained" style={styles.button} onPress={onSave}>Save</Button>
      </View>
      <View style={styles.container}>
        <SelectedExerciseList />
      </View>
      <View style={styles.exerciseList}>
        <ScrollView>
          {allExercises.map((exercise, index) => (
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
  };
};

export default connect(mapStateToProps, {editWorkoutName, addSelectedExercise, fetchWorkouts})(EditWorkoutPage);
