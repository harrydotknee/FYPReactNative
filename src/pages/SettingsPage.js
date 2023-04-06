import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Text, Surface} from 'react-native-paper';
import {connect} from 'react-redux';
import {logOut} from '../app/actions';
import {useNavigation} from '@react-navigation/native';

const SettingsPage = props => {
  const navigation = useNavigation();
  return (
    <Surface style={styles.surface}>
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => {
          props.logOut();
          navigation.replace('Auth');
        }}>
        <Text style={styles.buttonText}>Log out</Text>
      </Button>
    </Surface>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 200,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  surface: {
    height: '100%',
  },
});

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, {logOut})(SettingsPage);
