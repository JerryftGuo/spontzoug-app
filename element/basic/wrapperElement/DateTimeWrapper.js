import React, {setState, Component } from 'react';
import {View, Text } from 'react-native';
import { ThemeConsumer } from 'react-native-elements';
import { BasicDateTimePicker } from '../basicElement';
import { TextArea } from '.';


export default class DateTimeWrapper extends Component {
    constructor(props){
        super(props);
        this.state ={
        }
        this.onValueChange = this.onValueChange.bind();
    }

    onValueChange = (date)=> {
        this.props.onChange && this.props.onChange(date);
    }
   
    render(){
        return (
            <ThemeConsumer>
                {({theme}) =>(
                    <View style ={theme.DateTimeWrapper.container}>
                       <View style = {theme.DateTimeWrapper.labelContainer}>
                        <Text style = {theme.DateTimeWrapper.labelStyle} >
                            {this.props.label}
                        </Text>
                       </View>
                       <View style = { theme.DateTimeWrapper.datetimeContainer} >
                       <BasicDateTimePicker datetime={this.props.datetime || new Date()}
                             mode = {this.props.mode || 'date'}
                             save = {this.onValueChange}
                            />
                       </View>
                    </View>
                )}
            </ThemeConsumer>
        );
    }
}