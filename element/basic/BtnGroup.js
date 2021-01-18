import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { ThemeConsumer } from 'react-native-elements';
import { throwIfEmpty } from 'rxjs/operators';

export default class BtnGroup extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
        <ThemeConsumer>
        { ({theme}) => (
            <View style={theme.BtnGroup.container}>
                {this.props.children}
            </View>
        )}
        </ThemeConsumer>
        );
    }
}