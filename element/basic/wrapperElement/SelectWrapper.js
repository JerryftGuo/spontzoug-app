import React, {setState, Component } from 'react';
import {View, Text } from 'react-native';
import { ThemeConsumer } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';


export default class SelectWrapper extends Component {
    constructor(props){
        super(props);
        this.state ={
        }
        this.onValueChange = this.onValueChange.bind();
    }

    onValueChange = (text)=> {
        this.props.onChange && this.props.onChange(text);
    }
   
    render(){
        return (
            <ThemeConsumer>
                {({theme}) =>(
                    <View style ={theme.SelectWrapper.container}>
                       <View style = {theme.SelectWrapper.labelContainer}>
                        <Text style = {theme.SelectWrapper.labelStyle} >
                            {this.props.label}
                        </Text>
                       </View>
                       <View style = { theme.SelectWrapper.selectContainer} >
                        <RNPickerSelect  
                          onValueChange = { this.onValueChange}
                          items = { this.props.items }
                          value = { this.props.value }
                          placeholder = { {label: this.props.placeholder, value:null}}
                        />
                       </View>
                    </View>
                )}
            </ThemeConsumer>
        );
    }
}