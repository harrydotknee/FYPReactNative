import React from 'react';
import {List} from 'react-native-paper';

const ExerciseList = ({exercises}) => {
  return (
    <>
      <List.Section>
        {exercises.map((exercise, index) => {
          return <List.Item key={index} title={exercise.name} />;
        })}
      </List.Section>
    </>
  );
};

export default ExerciseList;
