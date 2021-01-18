import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { ThemeConsumer } from 'react-native-elements';
import { BasicDateTimePicker } from './basicElement';
import i18n from '../../i18n/i18n';

export default class HoursSetter extends Component{
    constructor(props){
        super(props);
    }

    render(){
 
        return(
        <ThemeConsumer>
        { ({theme}) => (
            <View style={theme.HoursSetter.container} >
                <View style={theme.HoursSetter.startContainer}>
                    <Text style={theme.HoursSetter.labelStyle}>{i18n.t('label.start')}</Text>
                    <BasicDateTimePicker datetime={this.props.start}
                     mode = 'time'
                     save = {this.props.saveStart}
                    />
                </View>
                <View style={theme.HoursSetter.endContainer}>
                    <Text style={theme.HoursSetter.labelStyle}>{i18n.t('label.end')}</Text>
                    <BasicDateTimePicker datetime={this.props.end}
                     mode = 'time'
                     save = {this.props.saveEnd}
                    />
                </View>
            </View>
        )}
        </ThemeConsumer>
        );
    }
}