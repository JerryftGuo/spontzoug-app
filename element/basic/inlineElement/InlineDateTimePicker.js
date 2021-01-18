import React, {setState, Component } from 'react';
import { View, Text} from 'react-native';
import { ThemeConsumer, Button } from 'react-native-elements';
import { BasicDateTimePicker } from '../basicElement';


export default class InlinDateTimePicker extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
      
        this.onSave = this.onSave.bind();
    }


    onSave = (val) =>{
        this.props.save && 
        this.props.save(this.props.id, this.props.type, this.props.sid, this.props.name, val);

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
                  <View style ={theme.InlineEdit.datetimeContainer}>
                  <BasicDateTimePicker  datetime = {this.props.datetime}
                        mode = {this.props.mode || 'date'}
                        save = {this.onSave}
                        />
                  </View>
                  
                </View>
                )}
            </ThemeConsumer>
        );
    }
}
