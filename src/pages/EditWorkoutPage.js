import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import SelectedExerciseList from '../components/SelectedExerciseList';
import ExerciseList from '../components/ExerciseList';

const API_URL = 'https://dca6-148-252-129-117.eu.ngrok.io';

const EditWorkoutPage = ({route, navigation}) => {
  const [exercises, setExercises] = useState([]);
  const [workoutName, setWorkoutName] = useState(route.params.workout.name);

  const getExercises = async () => {
    const {accessToken, client, uid} = route.params;
    const credentials = {
      'access-token': accessToken,
      'client': client,
      'uid': uid,
    };
    console.log('access token: ' + accessToken);
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
          let exerciseList = [];
          for (let i = 0; i < jsonRes.length; i++) {
            exerciseList.push(jsonRes[i]);
          }
          setExercises(exerciseList);
        }
      } catch (err) {
        console.log(err);
      }
    });
  };

  useEffect(() => {
    getExercises();
  }, []);

  return (
    <>
      <View style={styles.titleContainer}>
        <TextInput
          value={workoutName}
          onChangeText={workoutName => setWorkoutName(workoutName)}
          style={styles.title}
        />
        <Button mode="contained" style={styles.button}>Save</Button>
      </View>
      <View style={styles.container}>
        <SelectedExerciseList exercises={route.params.workout.exercises} />
      </View>
      <View style={styles.exerciseList}>
        <ExerciseList exercises={exercises} />
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
export default EditWorkoutPage;
