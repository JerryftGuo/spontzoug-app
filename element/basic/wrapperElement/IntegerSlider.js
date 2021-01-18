import React, {setState, Component } from 'react';
import {View, Text  } from 'react-native';
import { ThemeConsumer } from 'react-native-elements';
import {
    SliderWithData
} from '../../basic/basicElement';


export default class IntegerSlider extends Component {
    constructor(props){
        super(props);
        this.state ={
        }
       
    }

    render(){
        return (
            <ThemeConsumer>
                {({theme}) =>(
                    <View style ={theme.IntegerSlider.container}>
                       <View style = {theme.IntegerSlider.labelContainer}>
                        <Text style = {theme.IntegerSlider.labelStyle} >
                            {this.props.label}
                        </Text>
                       </View>
                       <View style = { theme.IntegerSlider.sliderContainer} >
                        <SliderWithData  value = {this.props.value}
                          onChange = {this.props.onChange}
                        />
                       </View>
                    </View>
                )}
            </ThemeConsumer>
        );
    }
}