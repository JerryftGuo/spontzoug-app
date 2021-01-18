import React, {setState, Component } from 'react';
import {View, Text, TextInput } from 'react-native';
import { ThemeConsumer } from 'react-native-elements';
import { throwIfEmpty } from 'rxjs/operators';

export default class TextArea extends Component {
    constructor(props){
        super(props);
        this.state ={
            text:this.props.value,
        }
        this.onTextChange = this.onTextChange.bind();
    }

    onTextChange = (text) => {
        this.props.onChange && this.props.onChange(text);
    }
   

    render(){
        return (
            <ThemeConsumer>
                {({theme}) =>(
                    <View style ={theme.TextArea.container}>
                       <View style = {theme.TextArea.labelContainer}>
                        <Text style = {theme.TextArea.labelStyle} >
                            {this.props.label}
                        </Text>
                       </View>
                       <View style = { theme.TextArea.textContainer} >
                       <TextInput
                            value = {this.props.value}
                            multiline = {true}
                            numberOfLines = {this.props.lines || 5}
                            onChangeText = {this.onTextChange}
                            maxLength = {this.props.maxLength || theme.TextArea.defaultLength}
                            style = {theme.TextArea.style}
                       />
                       </View>
                    </View>
                )}
            </ThemeConsumer>
        );
    }
}