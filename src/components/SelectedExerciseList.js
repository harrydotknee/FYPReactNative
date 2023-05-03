import React, {createRef, useCallback, useEffect, useRef, useState} from 'react';
import {List, IconButton, useTheme} from 'react-native-paper';
import {
  Button,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  PanResponder,
  Animated,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import * as RootNavigation from '../RootNavigation';
import {
  removeSelectedExercise,
  editSelectedWorkoutExercisesIndexes,
} from '../app/actions/index';

const useItemHeight = () => {
  const [itemHeight, setItemHeight] = useState(null);

  const onLayout = event => {
    const height = event.nativeEvent.layout.height;
    setItemHeight(height);
  };

  return [itemHeight, onLayout];
};

function immutableMove(arr, from, to) {
  return arr.reduce((prev, current, idx, self) => {
    if (from === to) {
      prev.push(current);
    }
    if (idx === from) {
      return prev;
    }
    if (from < to) {
      prev.push(current);
    }
    if (idx === to) {
      prev.push(self[from]);
    }
    if (from > to) {
      prev.push(current);
    }
    return prev;
  }, []);
}

const SelectedExerciseList = globalProps => {
  class ListContainer extends React.Component {
    state = {
      dragging: false,
      draggingIndex: -1,
      data: globalProps.selectedWorkout.exercises || [],
    };
    point = new Animated.ValueXY();
    currentY = 0;
    scrollOffset = 0;
    scrollViewTopOffset = 0;
    rowHeight = 0;
    currentIndex = -1;
    active = false;
    scrollView = createRef();
    scrollViewHeight = 0;

    constructor(props) {
      super(props);

      this._panResponder = PanResponder.create({
        // Ask to be the responder:
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

        onPanResponderGrant: (evt, gestureState) => {
          // The gesture has started. Show visual feedback so the user knows
          // what is happening!
          // gestureState.d{x,y} will be set to zero now
          this.currentIndex = this.yToIndex(gestureState.y0);
          this.currentY = gestureState.y0;
          Animated.event([{y: this.point.y}], {useNativeDriver: false})({
            y: gestureState.y0 - 130,
          });
          this.active = true;
          this.setState(
            {dragging: true, draggingIndex: this.currentIndex},
            () => {
              this.animateList();
            },
          );
        },
        onPanResponderMove: (evt, gestureState) => {
          // The most recent move distance is gestureState.move{X,Y}
          // The accumulated gesture distance since becoming responder is
          // gestureState.d{x,y}
          this.currentY = gestureState.moveY;
          Animated.event([{y: this.point.y}], {useNativeDriver: false})({
            y: gestureState.moveY - 130,
          });
        },
        onPanResponderTerminationRequest: (evt, gestureState) => false,
        onPanResponderRelease: (evt, gestureState) => {
          // The user has released all touches while this view is the
          // responder. This typically means a gesture has succeeded
          this.reset();
        },
        onPanResponderTerminate: (evt, gestureState) => {
          // Another component has become the responder, so this gesture
          // should be cancelled
          this.reset();
        },
        onShouldBlockNativeResponder: (evt, gestureState) => {
          // Returns whether this component should block native components from becoming the JS
          // responder. Returns true by default. Is currently only supported on android.
          return true;
        },
      });
    }

    animateList = () => {
      if (!this.active) {
        return;
      }

      requestAnimationFrame(() => {
        //check if near the bottom or top
        if (this.currentY - 50 > this.scrollViewHeight) {
          this.scrollView.current.scrollTo({
            y: this.scrollOffset + 3,
            animated: false,
          });
        } else if (this.currentY < 150) {
          this.scrollView.current.scrollTo({
            y: this.scrollOffset - 3,
            animated: false,
          });
        }

        const newIndex = this.yToIndex(this.currentY);
        if (this.currentIndex !== newIndex) {
          console.log('moving', this.currentIndex, newIndex);
          this.setState({
            data: immutableMove(this.state.data, this.currentIndex, newIndex),
            draggingIndex: newIndex,
          });
        }
        this.currentIndex = newIndex;
        this.animateList();
      });
    };

    yToIndex = y => {
      const index = Math.floor(
        (this.scrollOffset + y - this.scrollViewTopOffset - 130) /
          this.rowHeight,
      );
      if (index < 0) {
        return 0;
      } else if (index > this.state.data.length - 1) {
        return index - 1;
      }
      return index;
    };

    reset = () => {
      this.active = false;
      this.setState({dragging: false, draggingIndex: -1});
    };

    render() {
      const {data, dragging, draggingIndex} = this.state;

      const renderItem = ({exercise, index}, noPanResponder = false) => {
        if (dragging) {
          console.log('rendering', exercise.name, index, draggingIndex);
        }
        if (index >= 0) {
          data[index].index = index;
          editSelectedWorkoutExercisesIndexes(data);
        }
        const details = `${exercise.sets}x${exercise.reps}x${exercise.weight}kg`;
        return (
          <View
            onLayout={e => (this.rowHeight = e.nativeEvent.layout.height)}
            key={index}>
            <List.Item
              key={index}
              title={exercise.name}
              description={details}
              style={{
                ...styles.listItemContainer,
                ...{backgroundColor: '#afabfc'},
                opacity: draggingIndex === index ? 0 : 1,
              }}
              titleStyle={styles.listItemTitle}
              right={() => (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    globalProps.removeSelectedExercise(exercise);
                  }}>
                  <IconButton icon="close" size={20} style={styles.button} />
                </TouchableOpacity>
              )}
              left={() => {
                return (
                  <View
                    {...(noPanResponder ? {} : this._panResponder.panHandlers)}>
                    <IconButton icon="drag" size={20} style={styles.button} />
                  </View>
                );
              }}
            />
          </View>
        );
      };
      return (
        <View style={styles.topRight}>
          {dragging && (
            <Animated.View
              style={{zIndex: 2, top: this.point.getLayout().top, position: 'absolute'}}>
              {renderItem({
                exercise: data[draggingIndex],
                index: -1,
              })}
            </Animated.View>
          )}
          <ScrollView
            ref={this.scrollView}
            showsVerticalScrollIndicator={true}
            scrollEnabled={!dragging}
            onScroll={e => (this.scrollOffset = e.nativeEvent.contentOffset.y)}
            onLayout={e => {
              this.scrollViewTopOffset = e.nativeEvent.layout.y;
              this.scrollViewHeight = e.nativeEvent.layout.height;
            }}>
            {data.map((exercise, index) => {
              return renderItem({exercise, index});
            })}
          </ScrollView>
        </View>
      );
    }
  }
  return <ListContainer />;
};

const mapStateToProps = state => {
  return {
    exercises: state.selectedExercises,
    selectedWorkout: state.selectedWorkout,
  };
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
    width: 200,
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
    width: 15,
  },
  listItemTitle: {
    adjustFontSizeToFit: true,
    allowFontScaling: true,
    textAlign: 'left',
    width: 100,
  },
});

export default connect(mapStateToProps, {
  removeSelectedExercise,
})(SelectedExerciseList);
