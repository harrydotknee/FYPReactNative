import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {List, Button} from 'react-native-paper';

const API_URL = 'https://c661-185-69-144-206.eu.ngrok.io';

const WorkoutsPage = ({route, navigation}) => {
  const {accessToken, client, uid} = route.params;
  const [workoutData, setWorkoutData] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
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
              workoutList.push(jsonRes[i]);
            }
            setWorkoutData(workoutList);
          }
        } catch (err) {
          console.log(err);
        }
      });
    };
    const unsubscribe = navigation.addListener('focus', () => {
      fetchWorkouts();
    });
    return unsubscribe;
  }, [navigation, accessToken, client, uid]);

  return (
    <View>
      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate('CreateWorkout', {
            accessToken: accessToken,
            client: client,
            uid: uid,
          })
        }>
        Create Workout
      </Button>

      {workoutData.map((workout, index) => (
        <List.Item
          key={index}
          title={workout.name}
          left={props => (
            <List.Icon {...props} icon="play" onPress={console.log('hi')} />
          )}
          onPress={() => navigation.navigate('ShowWorkout', {workout: workout})}
        />
      ))}
    </View>
  );
};

export default WorkoutsPage;
