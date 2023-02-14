import React, {useState} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import {Button} from 'react-native-elements';
import {Hoshi} from 'react-native-textinput-effects';
// import Button from 'react-native-button';
// import _ from 'lodash';
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux';
// import thunk from 'redux-thunk';
// import reducers from '../app/reducers';
// import {connect} from 'react-redux';
// import {
//   emailChanged,
//   passwordChanged,
//   loginUser,
// } from '../app/actions/loginActions';

const API_URL = 'https://1468-148-252-133-113.eu.ngrok.io';

const LoginForm = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
  const [isLogin, setIsLogin] = useState(true);

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
        const jsonRes = await res.json();
        const accessToken = res.headers.get('access-token');
        const client = res.headers.get('client');
        const uid = res.headers.get('uid');
        console.log("token: " + accessToken);
        console.log("client: " + client);
        console.log("uid: " + uid);
        console.log("status: " + res.status);
        if (res.status !== 200) {
          setIsError(true);
        } else {
          const credentials = {
            'access-token': accessToken,
            'client': client,
            'uid': uid,
          };
          navigation.replace('Workouts', {
            accessToken: accessToken,
            client: client,
            uid: uid,
          });
          setIsError(false);
        }
      } catch (err) {
        console.log(err);
      }
    });
  };

  return (
    <View style={styles.viewStyle}>
      <Hoshi
        label={'Email'}
        // this is used as active border color
        borderColor={'#b76c94'}
        // this is used to set backgroundColor of label mask.
        // please pass the backgroundColor of your TextInput container.
        backgroundColor={'#FFF'}
        onChangeText={setEmail}
      />
      <Hoshi
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
