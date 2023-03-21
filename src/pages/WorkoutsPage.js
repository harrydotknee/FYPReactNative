import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import WorkoutsList from '../components/WorkoutsList';
import {connect} from 'react-redux';
import {selectEmptyWorkout, setCreating} from '../app/actions';
import * as RootNavigation from '../RootNavigation';

const WorkoutsPage = props => {
  console.log('WorkoutsPage');
  return (
    <View>
      <Button
        mode="contained"
        onPress={() => {
          selectEmptyWorkout();
          console.log(props.selectedWorkout.name);
          RootNavigation.navigate('EditWorkout');
        }}>
        Create Workout
      </Button>
      <WorkoutsList />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    workouts: state.remoteWorkouts,
    selectedWorkout: state.selectedWorkout,
  };
};

export default connect(mapStateToProps, {selectEmptyWorkout, setCreating})(
  WorkoutsPage,
);
