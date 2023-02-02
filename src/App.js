import React, {Component} from 'react';
import {View} from 'react-native';
import {registerRootComponent} from 'expo';
import {createStore, applyMiddleware} from 'redux';
import {logger} from 'redux-logger';
import {Provider} from 'react-redux';
import Reducers from './reducers/';
import LoginForm from './components/LoginForm';

class App extends Component {
  render() {
    return (
      <Provider store={createStore(Reducers, applyMiddleware(logger))}>
        <View>
          <LoginForm />
        </View>
      </Provider>
    );
  }
}

export default registerRootComponent(App);
