import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {List, Button, TextInput} from 'react-native-paper';

const API_URL = 'https://dca6-148-252-129-117.eu.ngrok.io';

const CreateWorkoutPage = ({route, navigation}) => {
  const [workoutName, setWorkoutName] = useState('');
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const {accessToken, client, uid} = route.params;
  const credentials = {
    'access-token': accessToken,
    'client': client,
    'uid': uid,
  };

  const createWorkout = async (name, passedExercises) => {
    console.log('access token: ' + accessToken);
    console.log('name: ' + name);
    fetch(`${API_URL}/workouts?` + new URLSearchParams(credentials), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        workout: {
          name: name,
          exercises: passedExercises,
        },
      }),
    }).then(async res => {
      try {
        const jsonRes = await res.json();
        console.log(res.status);
        if (res.status === 200) {
          console.log(jsonRes);
        }
      } catch (err) {
        console.log(err);
      }
    });
  };

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
            exerciseList.push(jsonRes[i].name);
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
      <View>
        <TextInput
          label="Workout Name"
          value={workoutName}
          onChangeText={workoutName => setWorkoutName(workoutName)}
        />
        {exercises.map((exercise, index) => (
          <List.Item
            key={index}
            title={exercise}
            left={props => <List.Icon {...props} />}
            onPress={() =>
              setSelectedExercises([...selectedExercises, exercise])
            }
          />
        ))}
        <Button
          mode="contained"
          onPress={() => {
            console.log('workout name: ' + workoutName);
            createWorkout(workoutName, selectedExercises);
            navigation.navigate('Workouts', {
              accessToken: accessToken,
              client: client,
              uid: uid,
            });
          }}>
          Create Workout
        </Button>
      </View>
    </>
  );
};

export default CreateWorkoutPage;
