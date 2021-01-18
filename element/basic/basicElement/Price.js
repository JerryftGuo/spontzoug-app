import React, {setState, Component } from 'react';
import {View, Text  } from 'react-native';
import { ThemeConsumer } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input';
import { setTokenSourceMapRange } from 'typescript';

export default class Price extends Component {
    constructor(props){
        super(props);
        const price = this.props.value.toFixed(2);
        this.state ={
            dollar: parseInt(price.substr(0,price.length-3)),
            cents: parseFloat(price.substr(price.length-2,2))/100.0,
        }
        this.dollarChange = this.dollarChange.bind();
        this.centsChange = this.centsChange.bind();
    }

    dollarChange = (val)=> {
        this.setState({dollar:val});
        let price = val + this.state.cents;        
        this.props.onChange(parseFloat(price));
    }

    centsChange = (val)=> {
        this.setState({cents:val})
        let price = this.state.dollar+ val;
        this.props.onChange(price);
    }
   

    render(){
        return (
            <ThemeConsumer>
                {({theme}) =>(
                       <View style = { theme.Price.container} >
                        <NumericInput  value = {this.state.dollar}
                          textColor = {theme.NumericInput.textColor}
                          valueType = 'integer'
                          minValue = {theme.NumericInput.minValue}
                          maxValue = {theme.NumericInput.maxValue}
                          step = {theme.NumericInput.step}
                          totalWidth = {theme.NumericInput.totalWidth}
                          totalHeight = {theme.NumericInput.totalHeight}
                          editable = {theme.NumericInput.editable}
                          inputStyle = {theme.NumericInput.inputStyle}
                          leftButtonBackgroundColor = {theme.NumericInput.leftButtonBackgroundColor}
                          rightButtonBackgroundColor = {theme.NumericInput.rightButtonBackgroundColor}
                          onChange = {this.dollarChange}
                        />
                        <NumericInput  value = {this.state.cents}
                          textColor = {theme.NumericInput.textColor}
                          valueType = 'real'
                          minValue = {.00}
                          maxValue={.99}
                          step = {.01}
                          totalWidth = {theme.NumericInput.totalWidth}
                          totalHeight = {theme.NumericInput.totalHeight}
                          editable = {theme.NumericInput.editable}
                          inputStyle = {theme.NumericInput.inputStyle}
                          leftButtonBackgroundColor = {theme.NumericInput.leftButtonBackgroundColor}
                          rightButtonBackgroundColor = {theme.NumericInput.rightButtonBackgroundColor}
                          onChange = {this.centsChange}
                        />
                       </View>

                )}
            </ThemeConsumer>
        );
    }
}