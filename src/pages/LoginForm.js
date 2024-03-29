import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {TextInput, Button, Text, Surface} from 'react-native-paper';

const API_URL = 'https://a984-81-106-97-58.ngrok-free.app';

const LoginForm = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const failedLoginAlert = () => {
    Alert.alert(
      'Login Failed',
      'Please check your email and password and try again.',
      [{text: 'OK'}],
    );
  };

  const onSubmitHandler = () => {
    const user = {
      email,
      password,
    };
    fetch(`${API_URL}/auth/sign_in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then(async res => {
      try {
        const accessToken = res.headers.get('access-token');
        const client = res.headers.get('client');
        const uid = res.headers.get('uid');
        console.log("token: " + accessToken);
        console.log("client: " + client);
        console.log("uid: " + uid);
        console.log("status: " + res.status);
        if (res.status !== 200) {
          console.log(res.status);
          failedLoginAlert();
        } else {
          const credentials = {
            'access-token': accessToken,
            'client': client,
            'uid': uid,
          };
          await SecureStore.setItemAsync(
            'credentials',
            JSON.stringify(credentials),
          );
          const theToken = await SecureStore.getItemAsync('credentials');
          console.log('theToken: ' + theToken);
          navigation.replace('App');
        }
      } catch (err) {
        console.log(err);
      }
    });
  };

  return (
    <Surface style={styles.surface}>
      <Text style={styles.title}>MUSCLE MAP</Text>
      <View style={styles.viewStyle}>
        <TextInput
          label={'Email'}
          onChangeText={setEmail}
          style={styles.textInput}
          mode="outlined"
        />
        <TextInput
          label={'Password'}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.textInput}
          mode="outlined"
        />
        <Button
          onPress={onSubmitHandler}
          style={styles.button}
          mode="contained-tonal">
          Log In
        </Button>
        <Text style={styles.text}>Don't Have an Account?</Text>
        <Button
          onPress={() => navigation.navigate('SignUp')}
          mode="contained"
          style={styles.button}>
          Sign Up
        </Button>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    width: '70%',
  },
  surface: {
    padding: 8,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  textInput: {
    marginBottom: 5,
  },
  button: {
    marginVertical: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 60,
  },
});

export default LoginForm;
