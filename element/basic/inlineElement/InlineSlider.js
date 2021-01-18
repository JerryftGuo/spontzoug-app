import React, {setState, Component } from 'react';
import { View, Text } from 'react-native';
import { ThemeConsumer, Button } from 'react-native-elements';
import { SliderWithData } from '../basicElement';


export default class InlineSlider extends Component {
    constructor(props){
        super(props);
        this.state ={
            showText: true,
            showSlider: false,
            value: this.props.value,
            lastValue: this.props.value
        }
        this.onLongPress = this.onLongPress.bind();
        this.onBtnConfirm = this.onBtnConfirm.bind();
        this.onBtnCancel = this.onBtnCancel.bind();
        this.onValueChange = this.onValueChange.bind();
    }

    onLongPress = ()=> {
        this.setState({showSlider:true});
        this.setState({showText:false });

    }
    onBtnConfirm = () =>{
        this.setState({showSlider:false});
        this.setState({showText:true });
        this.props.save && ( this.state.lastValiue !== this.state.value ) &&
         this.props.save(this.props.id, this.props.type, this.props.sid, this.props.name, this.state.value);

    }

    onBtnCancel = () =>{
        this.setState({showSlider:false});
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
                { this.state.showSlider && 
                  <>
                  <View style= {theme.InlineEdit.sliderContainer}>
                  <SliderWithData  value = {this.state.value}
                  onChange = {this.onValueChange}
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
