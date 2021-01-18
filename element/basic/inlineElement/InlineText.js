import React, {setState, Component } from 'react';
import {TextInput, View, Text } from 'react-native';
import { ThemeConsumer, Button, Overlay  } from 'react-native-elements';
import RegularBtn from '../RegularBtn';
import i18n from '../../../i18n/i18n';
import Paper from '../Paper';

export default class InlineText extends Component {
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
                            <Overlay fullScreen={true} overlayStyle={theme.Overlay.style}>
                            <Paper>
                            
                             <View style ={theme.InlineText.labelContent}>
                             <Text style = {theme.InlineText.labelStyle}
                              >{this.props.label}</Text>
                             </View>
                            
                             <TextInput
                                value= {this.state.text}
                                multiline ={true}
                                numberOfLines ={ this.props.lines || 5}
                                maxLength = { this.props.maxLength || theme.TextArea.defaultLength }
                                onChangeText = {(text)=> this.onChangeText(text)}
                                style = { theme.TextArea.style}
                                />
                            </Paper>
                            <View style={theme.btnBox} >
                                 <RegularBtn
                                 onPress={this.onBtnCancel}
                                 title ={ i18n.t('button.cancel')}
                                  />
                                <RegularBtn
                                 onPress={this.onBtnPress}
                                 title= {i18n.t('button.save')}
                             />
                            </View>
                        
                            </Overlay>}
                    </View>
                )}
            </ThemeConsumer>
        );
    }
}