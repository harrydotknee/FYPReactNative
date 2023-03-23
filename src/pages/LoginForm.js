import React, {useState} from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import {TextInput} from 'react-native-paper';

const API_URL = 'https://3e3a-85-255-236-173.eu.ngrok.io';

const LoginForm = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = () => {
    const user = {
      email,
      password,
    };
    // const user = {
    //   'email': 'bob@example.com',
    //   'password': 'password',
    // };
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
          navigation.replace('Workouts', {
            accessToken: accessToken,
            client: client,
            uid: uid,
          });
        }
      } catch (err) {
        console.log(err);
      }
    });
  };

  return (
    <View style={styles.viewStyle}>
      <TextInput
        label={'Email'}
        // this is used as active border color
        borderColor={'#b76c94'}
        // this is used to set backgroundColor of label mask.
        // please pass the backgroundColor of your TextInput container.
        backgroundColor={'#FFF'}
        onChangeText={setEmail}
      />
      <TextInput
        label={'Password'}
        // this is used as active border color
        borderColor={'#b76c94'}
        // this is used to set backgroundColor of label mask.
        // please pass the backgroundColor of your TextInput container.
        backgroundColor={'#FFF'}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        styleDisabled={{color: 'red'}}
        onPress={onSubmitHandler}
        title="Login"
      />
    </View>
  );
};

const styles = {
  viewStyle: {
    marginTop: 50,
    padding: 10,
  },
};

export default LoginForm;
