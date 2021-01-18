import React, {setState, Component } from 'react';
import {View, Text  } from 'react-native';
import { ThemeConsumer,Slider } from 'react-native-elements';


export default class SliderWithData extends Component {
    constructor(props){
        super(props);
        this.state ={
            min: this.props.minValue || 0,
            max: this.props.maxValue || 120,
            step: this.props.steop || 5,
        }
        this.valueChange = this.valueChange.bind();
    }

    valueChange = (val)=> {
        this.props.onChange &&  this.props.onChange(val);
    }
   

    render(){
        return (
            <ThemeConsumer>
                {({theme}) =>(                     
                       <View style = { theme.SliderWithData.container} >
                        <Slider  value = {this.props.value}
                          minimumValue ={this.state.min}
                          maximumValue ={this.state.max}
                          step ={this.state.step}
                          thumbTintColor = {theme.SliderWithData.thumbTintColor}
                          onValueChange = {this.valueChange}
                        />
                        <View style={theme.SliderWithData.textContainer}>
                            <View style = {theme.SliderWithData.minContainer}>
                                <Text style = {theme.SliderWithData.minStyle}>{this.state.min}</Text>
                            </View>
                            <View style = {theme.SliderWithData.valueContainer} >
                                <Text style={theme.SliderWithData.valueStyle}>{this.props.value}</Text>
                            </View>
                            <View style = {theme.SliderWithData.maxContainer}>
                                <Text style ={theme.SliderWithData.maxStyle}>{this.state.max}</Text>
                            </View>
                        </View>
                       </View>
                )}
            </ThemeConsumer>
        );
    }
}