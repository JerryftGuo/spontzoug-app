import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { ThemeConsumer, Button } from 'react-native-elements';

export default class RegularBtn extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
        <ThemeConsumer>
        { ({theme}) => (
            <View style={theme.RegularBtn.container}>
                <Button onPress={this.props.onPress}
                   title={this.props.title}
                   type = {theme.RegularBtn.type}
                   buttonStyle={theme.RegularBtn.buttonStyle}
                   titleStyle={theme.RegularBtn.titleStyle}
         />
         </View>
        )}
        </ThemeConsumer>
        );
    }
}