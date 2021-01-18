import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { ThemeConsumer } from 'react-native-elements';

export default class Title extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
        <ThemeConsumer>
        { ({theme}) => (
            <View style={theme.Title.container}>
                <Text style={theme.Title.text}> {this.props.title} </Text>
            </View>
        )}
        </ThemeConsumer>
        );
    }
}