import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { ThemeConsumer, Button } from 'react-native-elements';

export default class RoundBtn extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
        <ThemeConsumer>
        { ({theme}) => (
            <View style={theme.RoundBtn.container}>
                <Button onPress={this.props.onPress}
                   title={this.props.title}
                   type = {theme.RoundBtn.type}
                   buttonStyle={theme.RoundBtn.buttonStyle}
                   titleStyle={theme.RoundBtn.titleStyle}
         />
         </View>
        )}
        </ThemeConsumer>
        );
    }
}