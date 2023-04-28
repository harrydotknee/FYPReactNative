import React, {useState} from 'react';
import {Alert, View, StyleSheet} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {TextInput, Button, Text, Surface} from 'react-native-paper';

const API_URL = 'https://8815-81-106-97-58.ngrok-free.app';

const SignUpForm = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const failedSignInAlert = () => {
    Alert.alert(
      'Sign Up Failed',
      'Please check your email is valid.',
      [{text: 'OK'}],
    );
  };

  const onSubmitHandler = () => {
    const user = {
      email,
      password,
      password_confirmation: password,
    };
    fetch(`${API_URL}/auth/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then(async res => {
      // if succesful, log in
      if (res.status === 200) {
        fetch(`${API_URL}/auth/sign_in`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        }).then(async loginRes => {
          try {
            const accessToken = loginRes.headers.get('access-token');
            const client = loginRes.headers.get('client');
            const uid = loginRes.headers.get('uid');
            if (loginRes.status !== 200) {
              console.log(loginRes.status);
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
      } else {
        failedSignInAlert();
      }
    });
  };

  return (
    <Surface style={styles.surface}>
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
          Sign Up
        </Button>
        <Text style={styles.text}>Already Have an Account?</Text>
        <Button
          onPress={() => navigation.navigate('Login')}
          mode="contained"
          style={styles.button}>
          Log In
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
});

export default SignUpForm;
