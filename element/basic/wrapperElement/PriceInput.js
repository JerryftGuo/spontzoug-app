import React, {setState, Component } from 'react';
import {View, Text  } from 'react-native';
import { ThemeConsumer } from 'react-native-elements';
import  { Price } from '../basicElement';
import { setTokenSourceMapRange } from 'typescript';

export default class PriceInput extends Component {
    constructor(props){
        super(props);
        this.state ={
        }
    }

    onChange = (val)=>{
        this.props.onChange && this.props.onChange(val)
    }

    render(){
        return (
            <ThemeConsumer>
                {({theme}) =>(
                    <View style ={theme.PriceInput.container}>
                       <View style = {theme.PriceInput.labelContainer}>
                        <Text style = {theme.PriceInput.labelStyle} >
                            {this.props.label}
                        </Text>
                       </View>
                       <Price  value = {this.props.value} onChange = {this.onChange} />
                    </View>
                )}
            </ThemeConsumer>
        );
    }
}