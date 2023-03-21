import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import { connect } from 'react-redux';


const MuscleDiagram = props => {
  let muscleOutput = {
    chest: 0,
    forearms: 0,
    shoulders: 0,
    triceps: 0,
    biceps: 0,
    abs: 0,
    quads: 0,
    hamstrings: 0,
    calves: 0,
    glutes: 0,
    traps: 0,
    lats: 0,
    middle_back: 0,
    lower_back: 0,
    adductors: 0,
    abductors: 0,
    neck: 0,
  };

  const muscleImages = {
    chest: require('../images/chest-1.png'),
    forearms: require('../images/forearms-1.png'),
    shoulders: require('../images/shoulders-1.png'),
    // triceps: require('../images/triceps-1.png'),
    biceps: require('../images/biceps-1.png'),
    abs: require('../images/abs-1.png'),
    quads: require('../images/quads-1.png'),
    // hamstrings: require('../images/hamstrings-1.png'),
    // calves: require('../images/calves-1.png'),
    // glutes: require('../images/glutes-1.png'),
    traps: require('../images/traps-1.png'),
    // lats: require('../images/lats-1.png'),
    // middle_back: require('../images/middle_back-1.png'),
    // lower_back: require('../images/lower_back-1.png'),
    // adductors: require('../images/adductors-1.png'),
    // abductors: require('../images/abductors-1.png'),
    neck: require('../images/front-neck-1.png'),
  };

  const renderedMuscles = () => {
    let muscles = [];
    if (props.selectedWorkout.exercises === undefined) {
      return muscles;
    }
    if (props.selectedWorkout.exercises.length === 0) {
      return muscles;
    }
    props.selectedWorkout.exercises.forEach(exercise => {
      Object.keys(muscleOutput).forEach(muscle => {
        if (exercise.muscle_table[muscle] > 0) {
          if (!muscles.includes(muscle)) {
            muscles.push(muscle.toString());
          }
        }
      });
    });
    return muscles;
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../images/front_muscles.png')}
        style={styles.image}
      />
      {renderedMuscles().map(muscle => {
        return (
          <Image source={muscleImages[muscle]} style={styles.muscleImage} />
        );
      })}
    </View>
  );
};

const mapStateToProps = state => {
  return {
    selectedWorkout: state.selectedWorkout,
  };
};

const styles = StyleSheet.create({
  container: {
    width: 100, // example width
    height: 220, // example height
    position: 'relative',
    overflow: 'hidden',
    marginLeft: 40,
    marginTop: 30,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  muscleImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});

export default connect(mapStateToProps)(MuscleDiagram);
