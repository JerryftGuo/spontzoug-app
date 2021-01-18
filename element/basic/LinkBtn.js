import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { ThemeConsumer, Button } from 'react-native-elements';

export default class LinkBtn extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
        <ThemeConsumer>
        { ({theme}) => (
            <View style={theme.LinkBtn.container}>
                <Button onPress={this.props.onPress}
                   title={this.props.title}
                   type = {theme.LinkBtn.type}
                   buttonStyle={theme.LinkBtn.buttonStyle}
                   titleStyle={theme.LinkBtn.titleStyle}
         />
         </View>
        )}
        </ThemeConsumer>
        );
    }
}