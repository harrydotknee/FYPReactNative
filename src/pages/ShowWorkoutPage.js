import React, {useState, useRef} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Modal, Pressable} from 'react-native';
import {TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import ExerciseList from '../components/ExerciseList';
import * as RootNavigation from '../RootNavigation';
import * as SecureStore from 'expo-secure-store';

const API_URL = 'https://3e3a-85-255-236-173.eu.ngrok.io';

const shareWorkout = async (id, email) => {
  console.log(email, id);
  const getCredentials = await SecureStore.getItemAsync('credentials');
  const credentialsObject = JSON.parse(getCredentials);
  const credentials = {
    'access-token': credentialsObject['access-token'],
    'client': credentialsObject['client'],
    'uid': credentialsObject['uid'],
  };
  console.log(credentials);
  fetch(`${API_URL}/workouts/${id}/share?` + new URLSearchParams(credentials), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
    }),
  }).then(async res => {
    try {
      console.log('shareworkout');
      if (res.status === 200) {
        console.log('success');
      }
    } catch (err) {
      console.log('shareworkout' + err);
    }
  });
};

const ShowWorkoutPage = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');

  const clearEmail = () => {
    setEmail('');
  };

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
            setModalVisible(!modalVisible);
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                style={styles.textInput}
                placeHolder="email"
                label="email"
                value={email}
                onChangeText={text => setEmail(text)}
              />
              <View style={styles.container}>
                <Pressable
                  style={styles.button}
                  onPress={() => {
                    shareWorkout(props.selectedWorkout.id, email);
                    clearEmail();
                  }}>
                  <Text style={styles.buttonText}>Share</Text>
                </Pressable>
                <Pressable
                  style={styles.button}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.buttonText}>Close</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
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
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 0,
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
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  textInput: {
    width: 200,
  },
});

const mapStateToProps = state => {
  return {
    selectedWorkout: state.selectedWorkout,
  };
};

export default connect(mapStateToProps)(ShowWorkoutPage);
