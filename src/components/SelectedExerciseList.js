import React from 'react';
import {List, Button, IconButton, Colors, useTheme } from 'react-native-paper';
import {ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native';

const SelectedExerciseItem = ({exercise, index}) => {
  const theme = useTheme();
  return (
    <>
      <List.Item
        key={index}
        title={exercise.name}
        style={{
          ...styles.listItemContainer,
          ...{backgroundColor: theme.colors.primaryContainer},
        }}
        right={() => (
          <TouchableOpacity style={styles.button} onPress={() => console.log('Pressed')}>
            <IconButton icon="close" size={20} style={styles.button}/>
          </TouchableOpacity>
        )}
      />
    </>
  );
};

const SelectedExerciseList = ({exercises}) => {
  const theme = useTheme();
  return (
    <>
      <View style={styles.topRight}>
        <ScrollView contentContainerStyle={{flex:1}} showsVerticalScrollIndicator={false}>
          {exercises.map((exercise, index) => {
            return <SelectedExerciseItem exercise={exercise} key={index} />;
          })}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // make the container a row
  },
  topRight: {
    flex: 1, // take up 1/4 of the available space
    justifyContent: 'flex-start', // align items to the top
    alignItems: 'flex-end', // align items to the right
    position: 'absolute', // position the view
    top: 0, // position the view at the top
    right: 0, // position the view at the right
    height: '100%',
  },
  selectedExercise: {
    flex: 1,
    float: 'left',
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginRight: 16,
    width: 140,
    paddingRight: 0,
  },
  listItemIcon: {
    marginHorizontal: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  //styling for the button so that it is on the right of the list item
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'center',
    paddingRight: 0,
    width: 10,
  },
});

export default SelectedExerciseList;