import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { ThemeConsumer } from 'react-native-elements';
import i18n from '../../../i18n/i18n';

export default class DatesDisplay extends Component{
    constructor(props){
        super(props);
    }

    render(){
         return(
        <ThemeConsumer>
        { ({theme}) => (
            <View style={theme.DatesDisplay.container} >
                <View style={theme.DatesDisplay.labelContainer}>
                    <Text style={theme.DatesDisplay.labelStyle}>{this.props.label}:</Text>
                </View>
                <View style={theme.DatesDisplay.datesContainer}>
                { !this.props.day.onschedule &&
                  <View style={theme.DatesDisplay.datesContent}>
                    <Text style={theme.DatesDisplay.textStyle}>
                        {JSON.stringify(this.props.day.start).substr(1,10)}----
                        {JSON.stringify(this.props.day.end).substr(1,10)}
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
