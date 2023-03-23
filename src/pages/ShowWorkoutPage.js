import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {List, Button} from 'react-native-paper';
import {connect} from 'react-redux';
import ExerciseList from '../components/ExerciseList';
import * as RootNavigation from '../RootNavigation';

const ShowWorkoutPage = props => {
  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          mode="contained"
          onPress={() => {
            RootNavigation.navigate('EditWorkout');
          }}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          mode="contained"
          onPress={() => {
            RootNavigation.navigate('EditWorkout');
          }}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.playButton}
          mode="contained"
          onPress={() => {
            RootNavigation.navigate('Play');
          }}>
          <Text style={styles.buttonText}>Play</Text>
        </TouchableOpacity>
      </View>
      <ExerciseList exercises={props.selectedWorkout.exercises} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  playButton: {
    backgroundColor: 'green',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const mapStateToProps = state => {
  return {
    selectedWorkout: state.selectedWorkout,
  };
};

export default connect(mapStateToProps)(ShowWorkoutPage);
