import React, {Component} from 'react';
import {ScrollView, StyleSheet,} from 'react-native';

export default class Home extends Component {
    componentDidMount() {
        this.props.fetchWorkouts();
      }

    constructor(props) {
        super(props);
        this.state = {
            text: '',
        };
    }

    
    _renderWorkouts() {
        const { data, status } = this.props.workouts;
        if (status === 'failure'){
            return <text>{'Error'}</text>
        } else if (status === 'loading'){
            return <text>{'Loading'}</text>
        }

        return <view>{data.map(workout => this._renderWorkout(workout))}</view>;}

    _renderCreateForm() {
        return (
            <>
                <view>
                    style={styles.textfield}
                    placeholder= {'Text'}
                    onChangeText = {text => this.setState({text})}
                    value = {this.state.text}
                </view>
                <button title="Create" onpress={this.createWorkout} ></button>
            </>
        )
    }

    _createNote() {
        const {text} = this.state;
        const workout = {text};
        this.props.createWorkout(workout);
        this.setState({text: ''});
    }

    render() {
        return (
            <ScrollView style = {styles.container}>
                {this._renderWorkouts()}
                {this._renderCreateForm()}
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({  
    container: {    
      marginTop: 64,    
      marginHorizontal: 16,  
    },  
    textfield: {    
      backgroundColor: '#eee',    
      padding: 16,    
      marginTop: 8,  
    },
});