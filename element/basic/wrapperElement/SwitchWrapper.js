import React, {setState, Component } from 'react';
import {View, Text, Switch } from 'react-native';
import { ThemeConsumer } from 'react-native-elements';

export default class SwitchWrapper extends Component {
    constructor(props){
        super(props);
        this.state ={
            value:this.props.checked,
        }
        this.toggleValue = this.toggleValue.bind();
    }

    toggleValue = ()=> {
        this.props.onChange && this.props.onChange && this.props.onChange();
    }
   

    render(){
        return (
            <ThemeConsumer>
                {({theme}) =>(
                    <View style ={theme.SwitchWrapper.container}>
                       <View style = {theme.SwitchWrapper.labelContainer}>
                        <Text style = {theme.SwitchWrapper.labelStyle} >
                            {this.props.label}
                        </Text>
                       </View>
                       <View style = { theme.SwitchWrapper.swicthContainer} >
                        <Switch  value = {this.props.checked}
                          onValueChange = {this.toggleValue}
                          thumbColor = {theme.Switch.thumbColor}
                        />
                       </View>
                    </View>
                )}
            </ThemeConsumer>
        );
    }
}