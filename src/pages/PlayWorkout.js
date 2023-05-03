import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Surface, Text} from 'react-native-paper';
import {connect} from 'react-redux';
import * as RootNavigation from '../RootNavigation';

const PlayWorkoutPage = props => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [lastExercise, setLastExercise] = useState(false);
  const [firstExercise, setFirstExercise] = useState(true);

  useEffect(() => {
    if (currentExercise > 0) {
      setFirstExercise(false);
    } else {
      setFirstExercise(true);
    }
    if (currentExercise === props.selectedWorkout.exercises.length - 1) {
      setLastExercise(false);
    } else {
      setLastExercise(true);
    }
  }, [currentExercise, props.selectedWorkout.exercises.length]);

  return (
    <Surface style={styles.container}>
      <Text style={styles.bigText}>
        {props.selectedWorkout.exercises[currentExercise].name}
      </Text>
      <Text style={styles.detailsText}>
        Reps: {props.selectedWorkout.exercises[currentExercise].reps}
      </Text>
      <Text style={styles.detailsText}>
        Sets: {props.selectedWorkout.exercises[currentExercise].sets}
      </Text>
      <Text style={styles.detailsText}>
        Weight: {props.selectedWorkout.exercises[currentExercise].weight}kg
      </Text>
      <View style={styles.container}>
        {!firstExercise && (
          <TouchableOpacity
            mode="contained"
            onPress={() => {
              setCurrentExercise(currentExercise - 1);
            }}
            style={styles.leftButton}>
            <Text style={styles.buttonText}>Previous Exercise</Text>
          </TouchableOpacity>
        )}
        {lastExercise ? (
          <TouchableOpacity
            mode="contained"
            onPress={() => {
              setCurrentExercise(currentExercise + 1);
            }}
            style={styles.rightButton}>
            <Text style={styles.buttonText}>Next Exercise</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            mode="contained"
            onPress={() => {
              RootNavigation.navigate('Workouts');
            }}
            style={styles.finishButton}>
            <Text style={styles.buttonText}>Finish</Text>
          </TouchableOpacity>
        )}
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  leftButton: {
    position: 'absolute',
    bottom: 4,
    right: 16,
    backgroundColor: 'blue',
    padding: 16,
    borderRadius: 8,
    height: 200,
    width: 150,
  },
  rightButton: {
    position: 'absolute',
    bottom: 4,
    left: 16,
    backgroundColor: 'blue',
    padding: 16,
    borderRadius: 8,
    height: 200,
    width: 150,
  },
  finishButton: {
    position: 'absolute',
    bottom: 4,
    left: 16,
    backgroundColor: 'green',
    padding: 16,
    borderRadius: 8,
    height: 200,
    width: 150,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 28,
  },
  bigText: {
    textAlign: 'center',
    fontSize: 60,
  },
  detailsText: {
    textAlign: 'center',
    fontSize: 40,
  },
});

const mapStateToProps = state => {
  return {
    selectedWorkout: state.selectedWorkout,
  };
};

export default connect(mapStateToProps)(PlayWorkoutPage);
