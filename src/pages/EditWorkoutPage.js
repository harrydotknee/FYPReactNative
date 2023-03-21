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
import MuscleDiagram from '../components/MuscleDiagram';

const API_URL = 'https://3e3a-85-255-236-173.eu.ngrok.io';

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
        console.log('getexercises');
        const jsonRes = await res.json();
        console.log(res.status);
        if (res.status === 200) {
          setAllExercises(jsonRes);
        }
      } catch (err) {
        console.log("getexercises" + err);
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
    console.log('onsave');
    fetch(
      `${API_URL}/workouts/${JSON.stringify(props.selectedWorkout.id)}?` +
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
        const newAccessToken = res.headers['access-token'];
        if (res.status === 200) {
          if (newAccessToken) {
            credentialsObject['access-token'] = newAccessToken;
            await SecureStore.setItemAsync(
              'credentials',
              JSON.stringify(credentialsObject),
            );
          }
          props.fetchWorkouts();
          props.navigation.navigate('Workouts');
        }
      } catch (err) {
        console.log("onsave" + err);
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
      <View style={styles.diagramContainer}>
        <MuscleDiagram />
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
  };
};

export default connect(mapStateToProps, {
  editWorkoutName,
  addSelectedExercise,
  fetchWorkouts,
})(EditWorkoutPage);
