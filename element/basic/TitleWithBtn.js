import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { ThemeConsumer } from 'react-native-elements';
import IconBtn  from './IconBtn'

export default class TitleWithBtn extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
        <ThemeConsumer>
        { ({theme}) => (
            <View style={theme.TitleWithBtn.container}>
                <View style={theme.TitleWithBtn.titleContainer} >
                    <Text style={theme.TitleWithBtn.titleText}> {this.props.title}</Text>
                </View>
                <View style={theme.TitleWithBtn.btnContainer} >
                    <IconBtn onPress= {this.props.onPress}
                        icon={this.props.icon}
                    />
                </View>
            </View>
        )}
        </ThemeConsumer>
        );
    }
}