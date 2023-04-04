import React, {useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';
import ConnectedWorkoutsList from '../components/WorkoutsList';
import {connect} from 'react-redux';
import {selectEmptyWorkout, setCreating, fetchExercises, fetchWorkouts, checkOnline} from '../app/actions';
import * as RootNavigation from '../RootNavigation';

const WorkoutsPage = props => {
  useEffect(() => {
    props.checkOnline();
    if (props.online) {
      props.fetchExercises();
      props.fetchWorkouts();
    }
  }, []);

  console.log('WorkoutsPage');
  return (
    <View>
      <TouchableOpacity
        mode="contained"
        style={props.online ? styles.button : styles.disabledButton}
        disabled={!props.online}
        onPress={() => {
          props.selectEmptyWorkout();
          props.setCreating(true);
          RootNavigation.navigate('EditWorkout');
        }}>
        <Text style={styles.buttonText}>Create Workout</Text>
      </TouchableOpacity>
      <ConnectedWorkoutsList />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    margin: 10,
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
  },
  disabledButton: {
    margin: 10,
    backgroundColor: 'grey',
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const mapStateToProps = state => {
  return {
    workouts: state.workouts,
    selectedWorkout: state.selectedWorkout,
    creating: state.creating,
    online: state.online,
  };
};

export default connect(mapStateToProps, {selectEmptyWorkout, setCreating, fetchExercises, fetchWorkouts, checkOnline})(
  WorkoutsPage,
);
