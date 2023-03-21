import React, {useCallback, useEffect, useRef, useState} from 'react';
import {List, IconButton, useTheme} from 'react-native-paper';
import {
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
import {removeSelectedExercise} from '../app/actions/index';

const useItemHeight = () => {
  const [itemHeight, setItemHeight] = useState(null);

  const onLayout = event => {
    const height = event.nativeEvent.layout.height;
    setItemHeight(height);
  };

  return [itemHeight, onLayout];
};

const SelectedExerciseList = props => {
  // const [state, setState] = useState({dragging: false});
  const dragging = useRef(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [topOffset, setTopOffset] = useState(0);
  const [draggingIndex, setDraggingIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemHeight, onLayout] = useItemHeight();

  console.log('rendering SelectedExerciseList');

  const [scrollViewHeight, setScrollViewHeight] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const ScrollViewRef = useRef(null);

  const handleScroll = useCallback(e => {
    console.log("handleScroll called");
    const {contentOffset} = e.nativeEvent;
    const newScrollPosition = contentOffset.y;
    setScrollPosition(newScrollPosition);
  }, []);

  const handleLayout = useCallback(
    e => {
      const {height} = e.nativeEvent.layout;
      if (height !== scrollViewHeight) {
        setScrollViewHeight(height);
      }
    },
    [scrollViewHeight],
  );

  // useEffect(() => {
  //   if (ScrollViewRef.current) {
  //     console.log("scrolling to position:" + scrollPosition);
  //     ScrollViewRef.current.scrollTp({offset: 50});
  //   }
  // }, [scrollPosition]);
  // const stopDragging = useCallback(() => {
  //   setState({dragging: false}, []);
  // }, []);

  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
        console.log("grant");
        dragging.current = true;
        // setCurrentIndex(yToIndex(gestureState.y0));
        // setDraggingIndex(currentIndex);
      },
      onPanResponderMove: (evt, gestureState) => {
        // setDragging(true);
        Animated.event([{y: pan.y}], {
          useNativeDriver: false,
        })({y: gestureState.moveY});
        // The most recent move distance is gestureState.morve{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        console.log("move");
      },
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderEnd: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        // reset();
        console.log("release");
        dragging.current = false;
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
        // reset();
        console.log("terminate");
        // setDragging(false);
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        console.log("block native responder");
        // setDragging(false);
        return true;
      },
    }),
  ).current;

  // const reset = () => {
  //   setDragging(false);
  // };

  const yToIndex = y => {
    return Math.floor((scrollOffset + y - topOffset) / itemHeight);
  };

  const DraggedItem = () => {
    console.log('rendering DraggedItem');
    return (
      dragging.current && (
        <Animated.View style={{width: '100%', top: pan.getLayout().top, position: 'absolute'}}>
          <SelectedExerciseItem
            exercise={props.selectedWorkout.exercises[0]}
            index={0}
          />
        </Animated.View>
      )
    );
  };

  const SelectedExerciseItem = ({exercise, index}) => {
    console.log('rendering SelectedExerciseItem');
    if (dragging.current) {
      console.log('dragging');
    } else {
      console.log('not dragging');
    }
    const theme = useTheme();
    return (
      <View>
        <List.Item
          onLayout={onLayout}
          key={index}
          title={exercise.name}
          style={{
            ...styles.listItemContainer,
            ...{backgroundColor: theme.colors.primaryContainer},
          }}
          right={() => (
            <TouchableOpacity
              style={styles.button}
              onPress={() => props.removeSelectedExercise(exercise)}>
              <IconButton icon="close" size={20} style={styles.button} />
            </TouchableOpacity>
          )}
          left={() => {
            return (
              <View {...panResponder.panHandlers}>
                <IconButton icon="drag" size={20} style={styles.button} />
              </View>
            );
          }}
        />
      </View>
    );
  };
  return (
    <>
      <View style={styles.topRight}>
        <DraggedItem key={dragging.current} />
        <ScrollView
          // ref={ScrollViewRef}
          scrollEnabled={!dragging.current}
          showsVerticalScrollIndicator={true}
          // onScroll={e => {
          //   setScrollOffset(e.nativeEvent.contentOffset.y);
          //   handleScroll(e);
          //   console.log(scrollOffset);
          // }}
          // onLayout={e => {
          //   setTopOffset(e.nativeEvent.layout.y);
          //   handleLayout(e);
          //   console.log("layout");
          // }}
        >
          {props.selectedWorkout.exercises.map((exercise, index) => {
            return (
              <SelectedExerciseItem
                exercise={exercise}
                key={index}
                index={index}
              />
            );
          })}
        </ScrollView>
      </View>
    </>
  );
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
    width: 160,
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

export default connect(mapStateToProps, {removeSelectedExercise})(
  SelectedExerciseList,
);
