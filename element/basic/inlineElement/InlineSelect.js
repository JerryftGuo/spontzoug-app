import React, {setState, Component } from 'react';
import { View, Text } from 'react-native';
import { ThemeConsumer, Button  } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';



export default class InlineSelect extends Component {
    constructor(props){
        super(props);
        this.state ={
            showText: true,
            showSelect: false,
            text: this.props.text,
            data: this.props.data
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
        this.props.save(this.props.id, this.props.type, this.props.sid, this.props.name, this.state.text);
    }
    onBtnCancel = () =>{
        this.setState({showSelect:false});
        this.setState({showText:true });
    }

    onChangeValue = (val) =>{
        this.setState({text: val});

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
                { this.state.showSelect && 
                  <>
                  <View style= {theme.InlineEdit.selectContainer}>                    
                  <RNPickerSelect
                  onValueChange = {this.onChangeValue}
                  items = {this.state.data }
                  placeholder = {{ label: this.props.placeholder, value:null}}
                  value = {this.state.text}
                  style= {theme.InlineEdit.selectContent}
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
