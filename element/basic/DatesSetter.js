import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { ThemeConsumer } from 'react-native-elements';
import { BasicDateTimePicker } from './basicElement';
import i18n from '../../i18n/i18n';

export default class DatesSetter extends Component{
    constructor(props){
        super(props);
        this.saveStart = this.saveStart.bind();
        this.saveEnd = this.saveEnd.bind();
    }

    
    saveStart = ( date ) =>{
        this.props.saveStart && this.props.saveStart(date);
        this.props.save && 
        this.props.save(this.props.id, this.props.type, this.props.sid, this.props.startName,date );
    }
    saveEnd = ( date ) =>{
        this.props.saveEnd && this.props.saveEnd(date);
        this.props.save && 
        this.props.save(this.props.id, this.props.type, this.props.sid, this.props.endName,date );
    }

    render(){

        return(
        <ThemeConsumer>
        { ({theme}) => (
            <View style={theme.DatesSetter.container} >
                <View style={theme.DatesSetter.startContainer}>
                    <Text style={theme.DatesSetter.labelStyle}>{i18n.t('label.start')}</Text>
                    <BasicDateTimePicker datetime={this.props.start}
                     mode ='date'
                     save = {this.saveStart}
                    />
                </View>
                <View style={theme.DatesSetter.endContainer}>
                    <Text style={theme.DatesSetter.labelStyle}>{i18n.t('label.end')}</Text>
                    <BasicDateTimePicker datetime={this.props.end}
                     mode ='date'
                     save = {this.saveEnd}
                    />
                </View>
            </View>
        )}
        </ThemeConsumer>
        );
    }
}