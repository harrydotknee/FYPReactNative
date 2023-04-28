import React, {useState, useEffect} from 'react';
import {Alert, View, StyleSheet} from 'react-native';
import {
  TextInput,
  Surface,
  Button,
  Text,
  Modal,
  Portal,
} from 'react-native-paper';
import {connect} from 'react-redux';
import ExerciseList from '../components/ExerciseList';
import * as RootNavigation from '../RootNavigation';
import * as SecureStore from 'expo-secure-store';
import {useNavigation} from '@react-navigation/native';

const API_URL = 'https://8815-81-106-97-58.ngrok-free.app';

const workoutSharedAlert = () => {
  Alert.alert('Workout Shared', 'Your workout has been shared.', [
    {
      text: 'OK',
    },
  ]);
};

const failedShareAlert = () => {
  Alert.alert('Failed to Share', 'Please try again.', [
    {
      text: 'OK',
    },
  ]);
};

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
      console.log(res);
      if (res.status === 200) {
        workoutSharedAlert();
      } else {
        failedShareAlert();
      }
    } catch (err) {
      console.log('shareworkout' + err);
      failedShareAlert();
    }
  });
};

const ShowWorkoutPage = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');

  const clearEmail = () => {
    setEmail('');
  };

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: props.selectedWorkout.name,
    });
  }, [navigation, props.selectedWorkout.name]);

  return (
    <Surface style={styles.surface}>
      <View style={styles.container}>
        <Button
          style={props.online ? styles.button : styles.disabledButton}
          labelStyle={styles.buttonText}
          disabled={!props.online}
          mode="contained"
          onPress={() => {
            RootNavigation.navigate('EditWorkout');
          }}>
          Edit
        </Button>
        <Button
          style={props.online ? styles.button : styles.disabledButton}
          labelStyle={styles.buttonText}
          disabled={!props.online}
          mode="contained"
          onPress={() => {
            setModalVisible(!modalVisible);
          }}>
          Share
        </Button>
        <Button
          style={styles.button}
          labelStyle={styles.buttonText}
          mode="contained"
          onPress={() => {
            RootNavigation.navigate('Play');
          }}>
          Play
        </Button>
        <Portal>
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
                  mode="outlined"
                  style={styles.textInput}
                  placeHolder="email"
                  label="email"
                  value={email}
                  onChangeText={text => setEmail(text)}
                />
                <View style={styles.container}>
                  <Button
                    style={styles.button}
                    mode="contained-tonal"
                    onPress={() => {
                      shareWorkout(props.selectedWorkout.id, email);
                      clearEmail();
                    }}>
                    <Text style={styles.modalButtonText}>Share</Text>
                  </Button>
                  <Button
                    style={styles.button}
                    mode="contained-tonal"
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.modalButtonText}>Close</Text>
                  </Button>
                </View>
              </View>
            </View>
          </Modal>
        </Portal>
      </View>
      <ExerciseList exercises={props.selectedWorkout.exercises} />
    </Surface>
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
  surface: {
    height: '100%',
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
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  disabledButton: {
    backgroundColor: 'grey',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  playButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 18,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    borderRadius: 10,
    padding: 35,
    width: 300,
    height: 200,
    alignItems: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
    online: state.online,
  };
};

export default connect(mapStateToProps)(ShowWorkoutPage);
