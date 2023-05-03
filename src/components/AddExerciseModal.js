import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, useTheme, TextInput, Button} from 'react-native-paper';

const AddExerciseModal = ({addExercise, visibleChanger, exercise, index}) => {
  const theme = useTheme();
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');
  const [weight, setWeight] = useState('');
  return (
    <View style={[styles.modal, {backgroundColor: theme.colors.background}]}>
      <Text style={styles.name}>{exercise.name}</Text>
      <Text>Reps</Text>
      <TextInput
        placeholder="Add Reps"
        style={styles.textInput}
        mode="outlined"
        keyboardType="numeric"
        onChangeText={text => {
          setReps(text);
        }}
      />
      <Text>Sets</Text>
      <TextInput
        placeholder="Add Sets"
        style={styles.textInput}
        mode="outlined"
        keyboardType="numeric"
        onChangeText={text => {
          setSets(text);
        }}
      />
      <Text>Weight (kg)</Text>
      <TextInput
        placeholder="Add Weight"
        style={styles.textInput}
        mode="outlined"
        keyboardType="numeric"
        onChangeText={text => {
          setWeight(text);
        }}
      />
      <View style={styles.container}>
        <Button
          style={styles.button}
          mode="contained-tonal"
          onPress={() => {
            visibleChanger(false);
            const exerciseToAdd = {
              name: exercise.name,
              reps: reps,
              sets: sets,
              weight: weight,
              muscle_table: exercise.muscle_table,
              index: index,
            };
            addExercise(exerciseToAdd);
          }}>
          <Text style={styles.buttonText}>Add</Text>
        </Button>
        <Button
          style={styles.button}
          mode="contained-tonal"
          onPress={() => visibleChanger(false)}>
          <Text style={styles.buttonText}>Cancel</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    padding: 20,
    margin: 20,
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
  textInput: {
    marginVertical: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    marginHorizontal: 10,
    width: 130,
  },
});

export default AddExerciseModal;
