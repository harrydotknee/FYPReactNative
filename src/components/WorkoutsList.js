import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {List} from 'react-native-paper';
import {connect} from 'react-redux';
import {
  fetchWorkouts,
  fetchExercises,
  selectWorkout,
  setCreating,
  deleteWorkout,
  saveWorkout,
} from '../app/actions/index';
import * as RootNavigation from '../RootNavigation';

const ConnectedWorkoutsList = props => {
  console.log('WorkoutsList');

  return (
    <List.Section>
      {props.workouts &&
        props.workouts.map((workout, index) => (
          <List.Item
            key={index}
            title={workout.name}
            right={iconProps => (
              <>
                {workout.accepted ? (
                  <TouchableOpacity
                    onPress={() => props.deleteWorkout(workout)}>
                    <List.Icon {...iconProps} icon="delete" />
                  </TouchableOpacity>
                ) : (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        const acceptedWorkout = {
                          ...workout,
                          accepted: true,
                        };
                        console.log(acceptedWorkout);
                        props.saveWorkout(acceptedWorkout);
                      }}>
                      <List.Icon {...iconProps} icon="check" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => props.deleteWorkout(workout)}>
                      <List.Icon {...iconProps} icon="close" />
                    </TouchableOpacity>
                  </>
                )}
              </>
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
    workouts: state.workouts,
    selectedWorkout: state.selectedWorkout,
    creating: state.creating,
    exercises: state.exercises,
  };
};

export default connect(mapStateToProps, {
  fetchWorkouts,
  fetchExercises,
  selectWorkout,
  setCreating,
  deleteWorkout,
  saveWorkout,
})(ConnectedWorkoutsList);
