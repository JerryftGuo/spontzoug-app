import React, {setState, Component } from 'react';
import { View, Text } from 'react-native';
import { ThemeConsumer, Button  } from 'react-native-elements';
import { Price } from '../basicElement';



export default class InlinePrice extends Component {
    constructor(props){
        super(props);
        this.state ={
            showText: true,
            showSelect: false,
            value: this.props.value
        }
        this.onLongPress = this.onLongPress.bind();
        this.onBtnConfirm = this.onBtnConfirm.bind();
        this.onBtnCancel = this.onBtnCancel.bind();
        this.onChangeValue = this.onChangeValue.bind();
    }

    onLongPress = ()=> {
        this.setState({showSelect:true});
        this.setState({showText:false });

    }
    onBtnConfirm = () =>{
        this.setState({showSelect:false});
        this.setState({showText:true });
        this.props.save && this.props.save(this.props.id, this.props.type, this.props.sid, this.props.name, this.state.value);
    }
    onBtnCancel = () =>{
        this.setState({showSelect:false});
        this.setState({showText:true });
    }

    onChangeValue = (val) =>{
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
                { this.state.showSelect && 
                  <>
                  <View style= {theme.InlineEdit.selectContainer}>                    
                  <Price
                  onChange = {this.onChangeValue}
                  value = {this.state.value}
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
