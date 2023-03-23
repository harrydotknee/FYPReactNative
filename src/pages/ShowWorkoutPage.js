import React from 'react';
import {Text, View} from 'react-native';
import {List, Button} from 'react-native-paper';
import {connect} from 'react-redux';
import ExerciseList from '../components/ExerciseList';
import * as RootNavigation from '../RootNavigation';

const ShowWorkoutPage = props => {
  return (
    <>
      <View>
        <Button
          mode="contained"
          onPress={() => {
            RootNavigation.navigate('EditWorkout');
          }}>
          Edit Workout
        </Button>
        <ExerciseList exercises={props.selectedWorkout.exercises} />
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Button
            mode="contained"
            onPress={() => {
              RootNavigation.navigate('Play');
            }}>
            Play Workout
          </Button>
        </View>
      </View>
    </>
  );
};

const mapStateToProps = state => {
  return {
    selectedWorkout: state.selectedWorkout,
  };
};

export default connect(mapStateToProps)(ShowWorkoutPage);
