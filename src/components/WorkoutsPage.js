import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {List, Button} from 'react-native-paper';

const API_URL = 'https://12dd-85-255-232-125.eu.ngrok.io';

const WorkoutsPage = ({route, navigation}) => {
  const {accessToken, client, uid} = route.params;
  const [workoutData, setWorkoutData] = useState([]);

  const workouts = async () => {
    const credentials = {
      'access-token': accessToken,
      'client': client,
      'uid': uid,
    };
    console.log('access token: ' + accessToken);
    fetch(`${API_URL}/workouts?` + new URLSearchParams(credentials), {
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
          let workoutList = [];
          for (let i = 0; i < jsonRes.length; i++) {
            const exercises = JSON.stringify(jsonRes[i].exercises);
            console.log("exercises: " + exercises);
            workoutList.push(jsonRes[i].name);
          }
          setWorkoutData(workoutList);
        }
      } catch (err) {
        console.log(err);
      }
    });
  };
  useEffect(() => {
    workouts();
  }, []);

  return (
    <View>
      <Button mode="contained" onPress={() => navigation.navigate('EditWorkout')}>
        Create Workout
      </Button>

      {workoutData.map((workout, index) => (
        <List.Item
          key={index}
          title={workout}
          left={props => (
            <List.Icon {...props} icon="play" onPress={console.log("hi")} />
          )}
          onPress={() => navigation.navigate('EditWorkout', {workout: workout})}
        />
      ))}
    </View>
  );
};

export default WorkoutsPage;
