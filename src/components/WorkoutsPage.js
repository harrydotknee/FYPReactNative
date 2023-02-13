import React from 'react';
import {Text, View} from 'react-native';

const WorkoutsPage = ({navigation}) => {
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
  return (
    <View>
      {/* {workoutData.map(_workout => (
          <Text key={_workout.id}>{_workout.name}</Text>
        ))} */}
      <Text>hello</Text>
    </View>
  );
};

export default WorkoutsPage;
