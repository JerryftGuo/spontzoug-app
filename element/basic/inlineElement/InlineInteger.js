import React, {setState, Component } from 'react';
import { View, Text } from 'react-native';
import { ThemeConsumer, Button } from 'react-native-elements';
import { IntegerWithData } from '../basicElement';


export default class InlineInteger extends Component {
    constructor(props){
        super(props);
        this.state ={
            showText: true,
            showInteger: false,
            value: this.props.value,
            lastValue: this.props.value
        }
        this.onLongPress = this.onLongPress.bind();
        this.onBtnConfirm = this.onBtnConfirm.bind();
        this.onBtnCancel = this.onBtnCancel.bind();
        this.onValueChange = this.onValueChange.bind();
    }

    onLongPress = ()=> {
        this.setState({showInteger:true});
        this.setState({showText:false });

    }
    onBtnConfirm = () =>{
        this.setState({showInteger:false});
        this.setState({showText:true });
        this.props.save && ( this.state.lastValiue !== this.state.value ) &&
         this.props.save(this.props.id, this.props.type, this.props.sid, this.props.name, this.state.value);

    }

    onBtnCancel = () =>{
        this.setState({showInteger:false});
        this.setState({showText:true });
    }

    onValueChange = (val) =>{
        this.setState({value: val});
    }

    render(){
        return (
            <ThemeConsumer>
                {({theme}) =>(
                <View style ={theme.InlineEdit.container}>
                {this.state.showText &&
                  <>
                  <View style ={theme.InlineEdit.labelContent}>
                   <Text style = {theme.InlineEdit.labelStyle}
                    >{this.props.label}</Text>
                  </View>
                  <View style ={theme.InlineEdit.textContent}>
                  <Text onLongPress ={this.onLongPress}
                    style = {theme.InlineEdit.textStyle}
                    >{this.props.value.toString()}</Text>
                  </View>
                   <Button icon={theme.InlineEdit.textBtnIcon}
                        buttonStyle ={theme.InlineEdit.textBtn}
                        onPress={this.onLongPress}
                        type ={theme.showStyle.type}      
                    />
                   </>}
                { this.state.showInteger && 
                  <>
                  <View style= {theme.InlineEdit.integerContainer}>
                      <NumericInput  value = {this.state.value}
                          textColor = {theme.NumericInput.textColor}
                          valueType = 'integer'
                          minValue = {theme.NumericInput.minValue}
                          maxValue = {theme.NumericInput.maxValue}
                          step = {theme.NumericInput.step}
                          initValue = {this.props.value}
                          totalWidth = {theme.NumericInput.totalWidth}
                          totalHeight = {theme.NumericInput.totalHeight}
                          editable = {theme.NumericInput.editable}
                          inputStyle = {theme.NumericInput.inputStyle}
                          leftButtonBackgroundColor = {theme.NumericInput.leftButtonBackgroundColor}
                          rightButtonBackgroundColor = {theme.NumericInput.rightButtonBackgroundColor}
                          onChange = {this.props.onValueChange}
                        />
                  </View>
                  <View style={theme.InlineEdit.btnContainer} >
                        <Button icon={theme.InlineEdit.cancelBtnIcon}
                            buttonStyle ={theme.InlineEdit.editBtn}
                            onPress={this.onBtnCancel}
                            type = {theme.showStyle.type}
                            />
                        <Button icon={theme.InlineEdit.confirmBtnIcon}
                            buttonStyle ={theme.InlineEdit.editBtn}
                            onPress={this.onBtnConfirm}
                            type = {theme.showStyle.type}
                        />
                  </View>
                
                 </>}
                  
                </View>
                )}
            </ThemeConsumer>
        );
    }
}
