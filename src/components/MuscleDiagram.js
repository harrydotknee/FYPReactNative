import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {IconButton} from 'react-native-paper';
import { connect } from 'react-redux';


const MuscleDiagram = props => {
  const [frontMusclesSelected, setFrontMusclesSelected] = useState(true);

  const [muscleOutput, setMuscleOutput] = useState({});
  const muscleList = [
    'chest',
    'forearms',
    'shoulders',
    'triceps',
    'biceps',
    'abs',
    'quads',
    'hamstrings',
    'calves',
    'glutes',
    'traps',
    'lats',
    'middle_back',
    'lower_back',
    'adductors',
    'abductors',
  ];

  const muscleTemplate = {
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
  };

  const frontMuscleImages = {
    chest: (
      <Image
        source={require('../images/chest-1.png')}
        style={styles.muscleImage}
        key="chest"
      />
    ),
    forearms: (
      <Image
        source={require('../images/forearms-1.png')}
        style={styles.muscleImage}
        key="forearms"
      />
    ),
    shoulders: (
      <Image
        source={require('../images/shoulders-1.png')}
        style={styles.muscleImage}
        key="shoulders"
      />
    ),
    biceps: (
      <Image
        source={require('../images/biceps-1.png')}
        style={styles.muscleImage}
        key="biceps"
      />
    ),
    abs: (
      <Image
        source={require('../images/abs-1.png')}
        style={styles.muscleImage}
        key="abs"
      />
    ),
    quads: (
      <Image
        source={require('../images/quads-1.png')}
        style={styles.muscleImage}
        key="quads"
      />
    ),
    traps: (
      <Image
        source={require('../images/traps-1.png')}
        style={styles.muscleImage}
        key="traps"
      />
    ),
    neck: (
      <Image
        source={require('../images/neck-1.png')}
        style={styles.muscleImage}
        key="neck"
      />
    ),
    chestIntense: (
      <Image
        source={require('../images/chest-1.png')}
        style={styles.intenseMuscleImage}
        key="chestIntense"
      />
    ),
    forearmsIntense: (
      <Image
        source={require('../images/forearms-1.png')}
        style={styles.intenseMuscleImage}
        key="forearmsIntense"
      />
    ),
    shouldersIntense: (
      <Image
        source={require('../images/shoulders-1.png')}
        style={styles.intenseMuscleImage}
        key="shouldersIntense"
      />
    ),
    bicepsIntense: (
      <Image
        source={require('../images/biceps-1.png')}
        style={styles.intenseMuscleImage}
        key="bicepsIntense"
      />
    ),
    absIntense: (
      <Image
        source={require('../images/abs-1.png')}
        style={styles.intenseMuscleImage}
        key="absIntense"
      />
    ),
    quadsIntense: (
      <Image
        source={require('../images/quads-1.png')}
        style={styles.intenseMuscleImage}
        key="quadsIntense"
      />
    ),
    trapsIntense: (
      <Image
        source={require('../images/traps-1.png')}
        style={styles.intenseMuscleImage}
        key="trapsIntense"
      />
    ),
    neckIntense: (
      <Image
        source={require('../images/neck-1.png')}
        style={styles.intenseMuscleImage}
        key="neckIntense"
      />
    ),
  };

  const backMuscleImages = {
    triceps: (
      <Image
        source={require('../images/triceps-1.png')}
        style={styles.muscleImage}
        key="triceps"
      />
    ),
    hamstrings: (
      <Image
        source={require('../images/hamstrings-1.png')}
        style={styles.muscleImage}
        key="hamstrings"
      />
    ),
    calves: (
      <Image
        source={require('../images/calves-1.png')}
        style={styles.muscleImage}
        key="calves"
      />
    ),
    glutes: (
      <Image
        source={require('../images/glutes-1.png')}
        style={styles.muscleImage}
        key="glutes"
      />
    ),
    lats: (
      <Image
        source={require('../images/lats-1.png')}
        style={styles.muscleImage}
        key="lats"
      />
    ),
    middle_back: (
      <Image
        source={require('../images/middle_back-1.png')}
        style={styles.muscleImage}
        key="middle_back"
      />
    ),
    lower_back: (
      <Image
        source={require('../images/lower_back-1.png')}
        style={styles.muscleImage}
        key="lower_back"
      />
    ),
    adductors: (
      <Image
        source={require('../images/adductors-1.png')}
        style={styles.muscleImage}
        key="adductors"
      />
    ),
    abductors: (
      <Image
        source={require('../images/abductors-1.png')}
        style={styles.muscleImage}
        key="abductors"
      />
    ),
    tricepsIntense: (
      <Image
        source={require('../images/triceps-1.png')}
        style={styles.intenseMuscleImage}
        key="tricepsIntense"
      />
    ),
    hamstringsIntense: (
      <Image
        source={require('../images/hamstrings-1.png')}
        style={styles.intenseMuscleImage}
        key="hamstringsIntense"
      />
    ),
    calvesIntense: (
      <Image
        source={require('../images/calves-1.png')}
        style={styles.intenseMuscleImage}
        key="calvesIntense"
      />
    ),
    glutesIntense: (
      <Image
        source={require('../images/glutes-1.png')}
        style={styles.intenseMuscleImage}
        key="glutesIntense"
      />
    ),
    latsIntense: (
      <Image
        source={require('../images/lats-1.png')}
        style={styles.intenseMuscleImage}
        key="latsIntense"
      />
    ),
    middle_backIntense: (
      <Image
        source={require('../images/middle_back-1.png')}
        style={styles.intenseMuscleImage}
        key="middle_backIntense"
      />
    ),
    lower_backIntense: (
      <Image
        source={require('../images/lower_back-1.png')}
        style={styles.intenseMuscleImage}
        key="lower_backIntense"
      />
    ),
    adductorsIntense: (
      <Image
        source={require('../images/adductors-1.png')}
        style={styles.intenseMuscleImage}
        key="adductorsIntense"
      />
    ),
    abductorsIntense: (
      <Image
        source={require('../images/abductors-1.png')}
        style={styles.intenseMuscleImage}
        key="abductorsIntense"
      />
    ),
  };

  useEffect(() => {
    console.log('useEffect');
    console.log(props.selectedWorkout.exercises);
    setMuscleOutput(muscleTemplate);
    props.selectedWorkout.exercises.forEach(exercise => {
      muscleList.forEach(muscle => {
        const newMuscleOutput = muscleTemplate;
        newMuscleOutput[muscle] += exercise.muscle_table[muscle];
        setMuscleOutput(newMuscleOutput);
      });
    });
    console.log("1", muscleOutput);
  }, [props.selectedWorkout.exercises]);

  const renderedMuscles = () => {
    let muscles = [];
    console.log("2", muscleOutput);
    if (props.selectedWorkout.exercises === undefined) {
      return muscles;
    }
    if (props.selectedWorkout.exercises.length === 0) {
      return muscles;
    }
    muscleList.forEach(muscle => {
      if (muscleOutput[muscle] > 0 && muscleOutput[muscle] < 3) {
        muscles.push(muscle);
      } else if (muscleOutput[muscle] > 2) {
        muscles.push(muscle + 'Intense');
      }
    });
    return muscles;
  };

  return (
    <View>
      <View style={styles.container}>
        {frontMusclesSelected ? (
          <Image
            source={require('../images/front_muscles.png')}
            style={styles.image}
          />
        ) : (
          <Image
            source={require('../images/back_muscles.png')}
            style={styles.image}
          />
        )}
        {frontMusclesSelected
          ? renderedMuscles().map(muscle => {
              return frontMuscleImages[muscle];
            })
          : renderedMuscles().map(muscle => {
              return backMuscleImages[muscle];
            })}
      </View>
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={() => setFrontMusclesSelected(!frontMusclesSelected)}>
        <IconButton icon="rotate-360" />
      </TouchableOpacity>
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
    width: 100,
    height: 220,
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
  intenseMuscleImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    tintColor: '#8B0000',
  },
  touchableOpacity: {
    left: 64,
  },
});

export default connect(mapStateToProps)(MuscleDiagram);
