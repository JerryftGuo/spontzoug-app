import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { ThemeConsumer } from 'react-native-elements';
import i18n from '../../../i18n/i18n';

export default class ScheduleHoursDisplay extends Component{
    constructor(props){
        super(props);
    }

    render(){
         return(
        <ThemeConsumer>
        { ({theme}) => (
            <View style={theme.HoursDisplay.container} >
                <View style={theme.HoursDisplay.labelContainer}>
                    <Text style={theme.HoursDisplay.labelStyle}>{this.props.label}:</Text>
                </View>
                <View style={theme.HoursDisplay.hoursContainer}>
                { !this.props.day.onschedule &&
                  <View style={theme.HoursDisplay.hoursContent}>
                    <Text style={theme.HoursDisplay.textStyle}>
                        {JSON.stringify(this.props.day.schedule.start).substr(12,5)}-
                        {JSON.stringify(this.props.day.schedule.end).substr(12,5)}
                    </Text>
                  </View>
                }
                </View>
            </View>
        )}
        </ThemeConsumer>
        );
    }
}
