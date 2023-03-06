import React, {useEffect} from 'react';
import {List} from 'react-native-paper';
import {connect} from 'react-redux';
import {fetchWorkouts} from '../app/actions/index';
import * as RootNavigation from '../RootNavigation';

const ConnectedWorkoutsList = (props, navigation) => {
  useEffect(() => {
    console.log('useEffect called');
    props.fetchWorkouts();
    console.log(props.workouts);
  }, []);

  return (
    <List.Section>
      {props.workouts.map((workout, index) => (
        <List.Item
          key={index}
          title={workout.name}
          left={iconProps => <List.Icon {...iconProps} icon="play" />}
          onPress={() => RootNavigation.navigate('ShowWorkout', {workout: workout})}
        />
      ))}
    </List.Section>
  );
};

const mapStateToProps = state => {
  return {
    workouts: state.remoteWorkouts,
  };
};

export default connect(mapStateToProps, {fetchWorkouts})(ConnectedWorkoutsList);
