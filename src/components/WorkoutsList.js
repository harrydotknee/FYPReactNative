import React, {useState} from 'react';
import {Alert, TouchableOpacity, View, StyleSheet} from 'react-native';
import {List, Modal, Portal, Button, Text, useTheme} from 'react-native-paper';
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

const failedDeleteAlert = () => {
  Alert.alert(
    'Delete Failed',
    'You must be online to delete a workout.',
    [{text: 'OK'}],
  );
};

const ConnectedWorkoutsList = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [workoutToDelete, setWorkoutToDelete] = useState(null);
  const theme = useTheme();
  console.log('WorkoutsList');

  return (
    <List.Section>
      {props.workouts &&
        props.workouts.map((workout, index) => (
          <List.Item
            key={index}
            title={workout.name}
            style={styles.listItem}
            right={iconProps => (
              <>
                {workout.accepted ? (
                  <TouchableOpacity
                    style={
                      props.online
                        ? styles.touchableOpacity
                        : styles.disabledIcon
                    }
                    onPress={() => {
                      if (props.online) {
                        setModalVisible(!modalVisible);
                        setWorkoutToDelete(workout);
                      } else {
                        failedDeleteAlert();
                      }
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
      <Portal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View
            style={[
              styles.centeredView,
              {backgroundColor: theme.colors.background},
            ]}>
            <View
              style={[
                styles.modalView,
                {backgroundColor: theme.colors.background},
              ]}>
              <Text>Are you sure you want to delete this workout?</Text>
              <View style={styles.container}>
                <Button
                  style={styles.button}
                  onPress={() => {
                    props.deleteWorkout(workoutToDelete);
                    setModalVisible(!modalVisible);
                  }}>
                  <Text style={styles.buttonText}>Yes</Text>
                </Button>
                <Button
                  style={styles.button}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.buttonText}>No</Text>
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </Portal>
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
    borderRadius: 10,
    padding: 35,
    width: 300,
    height: 200,
    alignItems: 'center',
    elevation: 5,
  },
  listItem: {
    width: '100%',
  },
  touchableOpacity: {
    width: '15%',
  },
});

const mapStateToProps = state => {
  return {
    workouts: state.workouts,
    selectedWorkout: state.selectedWorkout,
    creating: state.creating,
    exercises: state.exercises,
    online: state.online,
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
