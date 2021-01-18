import React, {setState, Component } from 'react';
import {View, Text  } from 'react-native';
import { ThemeConsumer } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input';

export default class IntegerInput extends Component {
    constructor(props){
        super(props);
        this.state ={
        }
    }

    render(){
        return (
            <ThemeConsumer>
                {({theme}) =>(
                    <View style ={theme.IntegerInput.container}>
                       <View style = {theme.IntegerInput.labelContainer}>
                        <Text style = {theme.IntegerInput.labelStyle} >
                            {this.props.label}
                        </Text>
                       </View>
                       <View style = { theme.IntegerInput.inputContainer} >
                        <NumericInput  value = {this.props.value}
                          textColor = {theme.NumericInput.textColor}
                          valueType = 'integer'
                          minValue = {theme.NumericInput.minValue}
                          maxValue = {theme.NumericInput.maxValue}
                          step = {theme.NumericInput.step}
                          initValue = {this.props.value}
                          totalWidth = {theme.NumericInput.totalWidth}
                          totalHeight = {theme.NumericInput.totalHeight}
                          editable = {theme.NumericInput.editable}
                          inputStyle = {theme.NumericInput.inputStyle}
                          leftButtonBackgroundColor = {theme.NumericInput.leftButtonBackgroundColor}
                          rightButtonBackgroundColor = {theme.NumericInput.rightButtonBackgroundColor}
                          onChange = {this.props.onChange}
                        />
                       </View>
                    </View>
                )}
            </ThemeConsumer>
        );
    }
}