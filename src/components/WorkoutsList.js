import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Modal, View, StyleSheet, Pressable, Text} from 'react-native';
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
  const [modalVisible, setModalVisible] = useState(false);
  const [workoutToDelete, setWorkoutToDelete] = useState(null);
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
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      setWorkoutToDelete(workout);
                    }}>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Are you sure you want to delete this workout?</Text>
            <View style={styles.container}>
              <Pressable
                style={styles.button}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  props.deleteWorkout(workoutToDelete);
                }}>
                <Text style={styles.buttonText}>Yes</Text>
              </Pressable>
              <Pressable
                style={styles.button}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.buttonText}>No</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </List.Section>
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
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    width: 300,
    height: 200,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

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
