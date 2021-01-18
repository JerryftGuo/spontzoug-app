import React, {setState, Component } from 'react';
import { View, Text, Switch } from 'react-native';
import { ThemeConsumer, Button } from 'react-native-elements';


export default class InlinSwitch extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: this.props.checked,
        }
      
        this.toggleValue = this.toggleValue.bind();
    }


    toggleValue = () =>{
        this.props.save && 
        this.props.save(this.props.id, this.props.type, this.props.sid, this.props.name, !this.props.checked);

    }

    render(){
        return (
            <ThemeConsumer>
                {({theme}) =>(
                <View style ={theme.InlineEdit.container}>
                
                  <View style ={theme.InlineEdit.labelContent}>
                   <Text style = {theme.InlineEdit.labelStyle}
                    >{this.props.label}</Text>
                  </View>
                  <View style ={theme.InlineEdit.switchContent}>
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
