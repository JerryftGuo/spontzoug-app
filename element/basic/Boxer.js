import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { ThemeConsumer } from 'react-native-elements';
import { throwIfEmpty } from 'rxjs/operators';

export default class Boxer extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
        <ThemeConsumer>
        { ({theme}) => (
            <View style={theme.Boxer.container} >
            <View style={theme.Boxer.titleContainer}>
                <View style={theme.Boxer.titleLeft} >
                    <View style={theme.Boxer.titleLeftUp}>
                    </View>
                    <View style={theme.Boxer.titleLeftDown}>
                    </View>
                </View>
                <View style={theme.Boxer.titleCenter} >
                    <Text style={theme.Boxer.titleText}>
                        {this.props.title}
                    </Text>
                </View>
                <View style={theme.Boxer.titleRight}>
                    <View style={theme.Boxer.titleRightUp}>
                    </View>
                    <View style={theme.Boxer.titleRightDown}>
                    </View>
                </View>
            </View>
            <View style={theme.Boxer.contentContainer}>
                {this.props.children}
            </View>
            </View>
        )}
        </ThemeConsumer>
        );
    }
}