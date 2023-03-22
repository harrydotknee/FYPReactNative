import React, {useEffect} from 'react';
import { Touchable, TouchableOpacity } from 'react-native';
import {List} from 'react-native-paper';
import {connect} from 'react-redux';
import {
  fetchWorkouts,
  selectWorkout,
  setCreating,
  deleteWorkout,
} from '../app/actions/index';
import * as RootNavigation from '../RootNavigation';

const ConnectedWorkoutsList = props => {
  useEffect(() => {
    console.log('useEffect called');
    props.fetchWorkouts();
  }, []);

  return (
    <List.Section>
      {props.workouts.map((workout, index) => (
        <List.Item
          key={index}
          title={workout.name}
          right={iconProps => (
            <TouchableOpacity onPress={() => props.deleteWorkout(workout)}>
              <List.Icon {...iconProps} icon="delete" />
            </TouchableOpacity>
          )}
          onPress={() => {
            props.selectWorkout(workout);
            props.setCreating(false);
            RootNavigation.navigate('ShowWorkout', {workout: workout});
          }}
        />
      ))}
    </List.Section>
  );
};

const mapStateToProps = state => {
  return {
    workouts: state.remoteWorkouts,
    selectedWorkout: state.selectedWorkout,
    creating: state.creating,
  };
};

export default connect(mapStateToProps, {
  fetchWorkouts,
  selectWorkout,
  setCreating,
  deleteWorkout,
})(ConnectedWorkoutsList);
