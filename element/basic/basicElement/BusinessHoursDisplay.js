import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { ThemeConsumer } from 'react-native-elements';
import i18n from '../../../i18n/i18n';

export default class BusinessHoursDisplay extends Component{
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
                { this.props.day.firstperiod.closed && this.props.day.secondperiod.closed &&
                    <View style={theme.HoursDisplay.hoursContainer}>
                    <Text style={theme.HoursDisplay.textStyle} >{i18n.t('label.closed')}</Text>
                    </View>
                }
                { !this.props.day.firstperiod.closed &&
                  <View style={theme.HoursDisplay.hoursContent}>
                    <Text style={theme.HoursDisplay.textStyle}>
                       
                        {JSON.stringify(this.props.day.firstperiod.start).substr(12,5)}-
                        {JSON.stringify(this.props.day.firstperiod.end).substr(12,5)}
                    </Text>
                  </View>
                }
                { !this.props.day.secondperiod.closed &&
                 <View style={theme.HoursDisplay.hoursContent}>
                 <Text style={theme.HoursDisplay.textStyle}>
                    {JSON.stringify(this.props.day.secondperiod.start).substr(12,5)}-
                    {JSON.stringify(this.props.day.secondperiod.end).substr(12,5)}
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

/*
 { this.props.day.firstperiod.closed && this.props.day.secondperiod.closed &&
                    <Text style={theme.HoursDispaly.textStyle} >{i18n.t('lable.closed')}</Text>
                }
            { !this.props.day.firstperiod.closed &&
                    <Text style={theme.HoursDisplay.textStyle}>
                  test
                    </Text>
                }
                { !this.props.day.secondperiod.closed &&
                 <Text style={theme.HoursDisplay.textStyle}>
                   tttt
                 </Text>
                }


{JSON.stringify(this.props.day.firstperiod.start)}
{JSON.stringify(this.props.day.firstperiod.end)}

{JSON.stringify(this.props.day.secondperiod.start)}
{JSON.stringify(this.props.day.secondperiod.end)}
*/