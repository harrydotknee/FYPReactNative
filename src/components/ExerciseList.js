import React from 'react';
import {View} from 'react-native';
import {List, Divider} from 'react-native-paper';

const ExerciseList = ({exercises}) => {
  return (
    <>
      <List.Section>
        <Divider />
        {exercises.map((exercise, index) => {
          const title = `${index + 1}. ${exercise.name} `;
          const details = `${exercise.sets} x ${exercise.reps} x ${exercise.weight}kg`;
          return (
            <View key={index}>
              <List.Item title={title} description={details} />
              <Divider />
            </View>
          );
        })}
      </List.Section>
    </>
  );
};

export default ExerciseList;
