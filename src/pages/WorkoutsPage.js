import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import ConnectedWorkoutsList from '../components/WorkoutsList';
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
          props.selectEmptyWorkout();
          props.setCreating(true);
          RootNavigation.navigate('EditWorkout');
        }}>
        Create Workout
      </Button>
      <ConnectedWorkoutsList />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    workouts: state.workouts,
    selectedWorkout: state.selectedWorkout,
    creating: state.creating,
  };
};

export default connect(mapStateToProps, {selectEmptyWorkout, setCreating})(
  WorkoutsPage,
);
