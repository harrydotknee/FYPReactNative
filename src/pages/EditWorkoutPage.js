import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  TextInput,
  Button,
  List,
  Surface,
  Divider,
  Portal,
  Modal,
} from 'react-native-paper';
import {connect} from 'react-redux';
import SelectedExerciseList from '../components/SelectedExerciseList';
import {useNavigation} from '@react-navigation/native';
import {
  addSelectedExercise,
  editWorkoutName,
  fetchWorkouts,
  saveWorkout,
} from '../app/actions';
import MuscleDiagram from '../components/MuscleDiagram';
import AddExerciseModal from '../components/AddExerciseModal';

const EditWorkoutPage = props => {
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const onChangeTitle = text => {
    console.log("change", text);
    props.editWorkoutName(text);
  };

  const navigation = useNavigation();

  useEffect(() => {
    setFilteredExercises(props.exercises);
    if (props.selectedWorkout.name) {
      navigation.setOptions({
        title: props.selectedWorkout.name,
      });
    } else {
      navigation.setOptions({
        title: 'New Workout',
      });
    }
  }, [navigation, props.selectedWorkout.name]);

  return (
    <Surface style={styles.surface}>
      <View style={styles.titleContainer}>
        <TextInput
          defaultValue={props.selectedWorkout.name}
          onChangeText={text => onChangeTitle(text)}
          style={styles.title}
          placeholder='Title'
          mode="outlined"
          maxLength={50}
        />
        <Button
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonText}
          onPress={() => {
            props.saveWorkout(props.selectedWorkout);
            props.navigation.navigate('Workouts');
          }}>
          Save
        </Button>
      </View>
      <View style={styles.diagramContainer}>
        <MuscleDiagram />
      </View>
      <View style={styles.container}>
        <SelectedExerciseList />
      </View>
      <View style={styles.exerciseList}>
        <TextInput
          style={styles.textInput}
          placeholder="Search for exercises"
          mode="outlined"
          onChangeText={text => {
            if (text === '') {
              setFilteredExercises(props.exercises);
            } else {
              setFilteredExercises(
                props.exercises.filter(exercise =>
                  exercise.name.toLowerCase().includes(text.toLowerCase()),
                ),
              );
            }
          }}
        />
        <Divider />
        <ScrollView>
          {filteredExercises.map((exercise, index) => (
            <View key={index}>
              <List.Item
                title={exercise.name}
                left={iconProps => <List.Icon {...iconProps} />}
                onPress={() => {
                  setSelectedExercise(exercise);
                  setModalVisible(!modalVisible);
                }} //props.addSelectedExercise(exercise)}
              />
              <Divider />
            </View>
          ))}
        </ScrollView>
      </View>
      <Portal>
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onDismiss={() => setModalVisible(!modalVisible)}>
          <AddExerciseModal
            visibleChanger={setModalVisible}
            exercise={selectedExercise}
            addExercise={props.addSelectedExercise}
            index={props.selectedWorkout.exercises.length - 1}
          />
        </Modal>
      </Portal>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: 200,
    marginTop: -280,
  },
  surface: {
    height: '100%',
  },
  diagramContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '40%',
    height: 150,
  },
  titleContainer: {
    flexDirection: 'row',
    height: 55,
    width: '100%',
  },
  exerciseList: {

    height: '50%',
  },
  title: {
    height: 50,
    width: '80%',
  },
  button: {
    width: '20%',
    height: 50,
    borderRadius: 5,
    paddingVertical: 3,
    marginTop: 5,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  textInput: {
    height: 40,
    width: '100%',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
});

const mapStateToProps = state => {
  return {
    selectedWorkout: state.selectedWorkout,
    workouts: state.workouts,
    exercises: state.exercises,
  };
};

export default connect(mapStateToProps, {
  editWorkoutName,
  addSelectedExercise,
  fetchWorkouts,
  saveWorkout,
})(EditWorkoutPage);
