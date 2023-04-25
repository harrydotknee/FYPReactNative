import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import {TextInput} from 'react-native-paper';

const API_URL = 'https://8815-81-106-97-58.ngrok-free.app';

const SignUpForm = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
            console.log("token: " + accessToken);
            console.log("client: " + client);
            console.log("uid: " + uid);
            console.log("status: " + loginRes.status);
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
      }
    });
  };

  return (
    <View style={styles.viewStyle}>
      <TextInput
        label={'Email'}
        borderColor={'#b76c94'}
        backgroundColor={'#FFF'}
        onChangeText={setEmail}
      />
      <TextInput
        label={'Password'}
        borderColor={'#b76c94'}
        backgroundColor={'#FFF'}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button onPress={onSubmitHandler} title="Submit" />
      <Text style={styles.text}>Already Have an Account?</Text>
      <Button onPress={() => navigation.navigate('Login')} title="Log In" />

    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    marginTop: 50,
    padding: 10,
  },
  text: {
    fontSize: 15,
  },
});

export default SignUpForm;
