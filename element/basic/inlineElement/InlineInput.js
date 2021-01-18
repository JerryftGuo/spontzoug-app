import React, {setState, Component } from 'react';
import {TextInput, View, Text } from 'react-native';
import { ThemeConsumer, Button  } from 'react-native-elements';

export default class InlineInput extends Component {
    constructor(props){
        super(props);
        this.state ={
            showText: true,
            showInput: false,
            text: this.props.text
        }
        this.onLongPress = this.onLongPress.bind();
        this.onBtnPress = this.onBtnPress.bind();
        this.onChangeText = this.onChangeText.bind();
    }

    onLongPress = ()=> {
        this.setState({showInput:true});
        this.setState({showText:false });

    }
    onBtnPress = () =>{
        this.setState({showInput:false});
        this.setState({showText:true });
        this.props.save(this.props.id, this.props.type, this.props.sid, this.props.name, this.state.text);
    }
    onBtnCancel = ()=>{
        this.setState({showInput:false});
        this.setState({showText:true });
    }

    onChangeText = (text) =>{
        this.setState({text: text});

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
                              >{this.props.text}</Text>
                            </View>
                            <Button icon={theme.InlineEdit.textBtnIcon}
                                buttonStyle ={theme.InlineEdit.textBtn}
                                onPress={this.onLongPress}
                                type ={theme.showStyle.type}
                                />
                            </>}
                        {this.state.showInput &&
                            <>
                            <TextInput defaultValue= {this.state.text}
                                multiline = { this.props.multiline !== undefined}
                                maxLength = { this.props.maxLength || theme.InlineEdit.defaultLength }
                                onChangeText = {(text)=> this.onChangeText(text)}
                                style= {theme.InlineEdit.editInput} />
                            <View style={theme.InlineEdit.btnContainer} >
                                 <Button icon={theme.InlineEdit.cancelBtnIcon}
                                 buttonStyle ={theme.InlineEdit.editBtn}
                                 onPress={this.onBtnCancel}
                                 type = {theme.showStyle.type}
                                  />
                                <Button icon={theme.InlineEdit.confirmBtnIcon}
                                 buttonStyle ={theme.InlineEdit.editBtn}
                                 onPress={this.onBtnPress}
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