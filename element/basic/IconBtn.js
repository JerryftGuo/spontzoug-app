import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { ThemeConsumer, Button } from 'react-native-elements';

export default class IconBtn extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
        <ThemeConsumer>
        { ({theme}) => (
            <View style={theme.IconBtn.container}>
                <Button onPress={this.props.onPress}
                   icon={this.props.icon}
                   type = {theme.IconBtn.type}
                   buttonStyle={theme.IconBtn.btnStyle}
         />
         </View>
        )}
        </ThemeConsumer>
        );
    }
}