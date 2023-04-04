import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {connect} from 'react-redux';
import {logOut} from '../app/actions';
import {useNavigation} from '@react-navigation/native';

const SettingsPage = props => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          props.logOut();
          navigation.replace('Login');
        }}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, {logOut})(SettingsPage);
