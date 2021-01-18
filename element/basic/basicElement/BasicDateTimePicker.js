import React, {setState, Component } from 'react';
import { View, Text } from 'react-native';
import { ThemeConsumer, Button  } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { TapGestureHandler } from 'react-native-gesture-handler';



export default class BasicDateTimePicker extends Component {
    constructor(props){
        super(props),
        this.state ={
            showPicker: false,
        }
        this.onPress = this.onPress.bind();
        this.onConfirm = this.onConfirm.bind();
        this.onCancel = this.onCancel.bind();
    }

    onConfirm = (time) => {
        this.setState({showPicker:false});
        this.props.save && this.props.save(time);
    }

    onCancel = () =>{
        this.setState({showPicker:false});
    }

    onPress = ()=> {
        this.setState({showPicker:true});
    }
   
    render(){
        let datetime;
        let icon;
        if( this.props.mode === 'date'){
            datetime = JSON.stringify(this.props.datetime).substr(1,10);
        }else if (this.props.mode === 'time'){
            datetime = JSON.stringify(this.props.datetime).substr(12,5);
        }else if (this.props.mode === 'datetime') {
            datetime = JSON.stringify(this.props.datetime).substr(4,15);
        }else {
            return <></>
        }

        return (
            <ThemeConsumer>
                {({theme}) =>(
                <View style={theme.BasicDateTimePicker.datetimeContainer}>
                   <Button icon={ this.props.mode === 'date' ? theme.BasicDateTimePicker.dateBtnIcon: theme.BasicDateTimePicker.timeBtnIcon}
                      buttonStyle ={theme.BasicDateTimePicker.datetimeBtn}
                      onPress={this.onPress}
                      type ={theme.showStyle.type}
                    />
                    <Text onLongPress ={this.onPress}
                        style = {theme.BasicDateTimePicker.datetimeText}
                    >{ datetime }</Text>
                   
                    <DateTimePicker
                      isVisible = {this.state.showPicker}
                      date =  {this.props.datetime}
                      mode =  {this.props.mode}
                      onConfirm = {this.onConfirm}
                      onCancel = {this.onCancel}
                    />
                </View>
                )}
            </ThemeConsumer>
        );
    }
}

