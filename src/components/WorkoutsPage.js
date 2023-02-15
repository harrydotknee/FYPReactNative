import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

const API_URL = 'https://12dd-85-255-232-125.eu.ngrok.io';

const WorkoutsPage = ({route, navigation}) => {
  // const [workoutData, setWorkoutData] = useState([]);
  // const workouts = async () => {
  //   try {
  //     const response = await fetch('https://53ed-81-106-97-58.eu.ngrok.io/workouts');
  //     const data = await response.json();
  //     setWorkoutData(data);
  //     console.log("hello");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   workouts();
  // }, []);

  // const onLoggedIn = (token, client, uid) => {
  //   console.log("here2");
  //   const credentials = {
  //     'access-token': token,
  //     'client': client,
  //     'uid': uid,
  //   };
  //   fetch(`${API_URL}/workouts?` + new URLSearchParams(credentials), {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then(async res => {
  //       try {
  //         console.log(`${API_URL}/workouts?`);
  //         const jsonRes = await res.json();
  //         console.log(jsonRes);
  //         if (res.status === 200) {
  //           setMessage(jsonRes.name);
  //           navigation.replace('Workouts', {credentials: credentials});
  //         }
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

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
            console.log(jsonRes.name);
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
      {workoutData.map((workout, index) => (
        <Text key={index}>{workout}</Text>
      ))}
    </View>
  );
};

export default WorkoutsPage;
