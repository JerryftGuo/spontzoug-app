
import React,{setState, Component} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text,  ThemeConsumer,Input, CheckBox } from  'react-native-elements';
import { Icon } from 'react-native-vector-icons/Ionicons';
import { Boxer,
RegularBtn,
HoursSetter } from '../../element/basic';

import { putConfigurableItem } from '../../action/commAction/ConfigurableAction';


import { connect } from 'react-redux';
import {View,Platform,  TouchableWithoutFeedbackBase, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import i18n from '../../i18n/i18n';
import  * as DEF   from '../../constant';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';
import { SwitchWrapper,
    IntegerSlider,
    PriceInput,
    SelectWrapper,
    DateTimeWrapper,
    TextArea,
    IntegerInput
 } from '../../element/basic/wrapperElement';
import { InlineImage } from '../../element/basic/inlineElement';


class OptionEditor extends Component{
    constructor(props){

        super(props);
        let s = {};

       
        props.route.params.config[DEF.P_DEFINE].forEach(config => {  
                s = Object.assign({}, s, { [config[DEF.P_NAME]]: config[DEF.P_DEFAULT]});         
        });
     
        this.state ={
            key: props.route.params.key,
            config: props.route.params.config,
            id: props.route.params.id,
            name: props.route.params.config.name || 'options',
            data: s,
        } ;

        this.updateOptions = this.updateOptions.bind();
    } 


    updateOptions = () => {
    
        let value = {};
        this.state.config[DEF.P_DEFINE].forEach( ele => {
              value = { ...value, [ele[DEF.P_NAME]]:this.state.data[ele[DEF.P_NAME]] }
        })

        let it ={};
        from(this.props.configurable.items[this.state.key])
        .pipe(
          filter( item => item.id === this.state.id),
        ).subscribe(
          item =>{ it = Object.assign({},item) }
        );

        this.props.putConfigurableItem(this.state.key,
             Object.assign({}, it,
                 { [this.state.name]: [
                     ...it[this.state.name],
                     value
                 ]}
            )
        ); 

    }


    render(){
        let    content = 
       <ThemeConsumer>
       { ({theme}) => (
           <>
           <Boxer title={ i18n.t('title.options') } >
          
           { this.state.config[DEF.P_DEFINE].map( ele => (
                (ele[DEF.P_TYPE] === DEF.T_STRING && !ele[DEF.P_DEPRECATED] && !ele[DEF.P_EDITONLY] &&
                    <Input label={i18n.t('label.'+ele[DEF.P_NAME])}
                        value = {this.state.data[ele[DEF.P_NAME]]}
                        onChangeText= { (val)=> (this.setState(
                                { data:{
                                    ...this.state.data,
                                    [ele[DEF.P_NAME]]: val
                                }}
                            ))} /> ) ||      
                (ele[DEF.P_TYPE] === DEF.T_TEXT && !ele[DEF.P_DEPRECATED] && !ele[DEF.P_EDITONLY] &&
                    <TextArea label={i18n.t('label.'+ele[DEF.P_NAME])}
                        value = {this.state.data[ele[DEF.P_NAME]]}
                        onChange= { (val)=> (this.setState(
                            { data:{
                                ...this.state.data,
                                [ele[DEF.P_NAME]]: val
                            }}
                        ))} /> ) ||      
                       
                (ele[DEF.P_TYPE] === DEF.T_INTEGER && !ele[DEF.P_DEPRECATED] && !ele[DEF.P_EDITONLY] &&
                    <IntegerSlider  label={i18n.t('label.'+ele[DEF.P_NAME])}
                        value = {this.state.data[ele[DEF.P_NAME]]}
                        onChange= { (val)=> (this.setState(
                            { data:{
                                ...this.state.data,
                                [ele[DEF.P_NAME]]: val
                            }}
                        ))} /> ) ||      
                (ele[DEF.P_TYPE] === DEF.T_QUANTITY && !ele[DEF.P_DEPRECATED] && !ele[DEF.P_EDITONLY] &&
                    <IntegerInput label={i18n.t('label.'+ele[DEF.P_NAME])}
                        value = {this.state.data[ele[DEF.P_NAME]]}
                        onChange= { (val)=> (this.setState(
                            { data:{
                                ...this.state.data,
                                [ele[DEF.P_NAME]]: val
                            }}
                        ))} /> ) ||      
                       
                (ele[DEF.P_TYPE] === DEF.T_BOOLEAN && !ele[DEF.P_DEPRECATED] && !ele[DEF.P_EDITONLY] &&
                    <SwitchWrapper label={i18n.t('label.'+ele[DEF.P_NAME])}
                        checked = {this.state.data[ele[DEF.P_NAME]]}
                        onChange= { (val)=> (this.setState(
                            { data:{
                                ...this.state.data,
                                [ele[DEF.P_NAME]]: val
                            }}
                        ))} /> ) ||      
                        
                (ele[DEF.P_TYPE] === DEF.T_ENUM && !ele[DEF.P_DEPRECATED] && !ele[DEF.P_EDITONLY] &&
                    <SelectWrapper label={i18n.t('label.'+ele[DEF.P_NAME])}
                        items = {this.props.config.config.data[ele[DEF.P_NAME]]}
                        placeholder = {ele[DEF.P_NAME]}
                        onChange= { (val)=> (this.setState(
                            { data:{
                                ...this.state.data,
                                [ele[DEF.P_NAME]]: val
                            }}
                        ))} /> ) ||      
                       
                (ele[DEF.P_TYPE] === DEF.T_PRICE && !ele[DEF.P_DEPRECATED] && !ele[DEF.P_EDITONLY] &&
                    <PriceInput label={i18n.t('label.'+ele[DEF.P_NAME])}
                        value ={this.state.data[ele[DEF.P_NAME]]}
                        onChange= { (val)=> (this.setState(
                            { data:{
                                ...this.state.data,
                                [ele[DEF.P_NAME]]: val
                            }}
                        ))} /> ) ||      
                       
                (( ele[DEF.P_TYPE] === DEF.T_DATE || ele[DEF.P_TYPE] === DEF.T_TIME || ele[DEF.P_TYPE] === DEF.T_DATETIME) &&
                    !ele[DEF.P_DEPRECATED] && !ele[DEF.P_EDITONLY] &&
                    <DateTimeWrapper label ={i18n.t('label.'+ele[DEF.P_NAME])}
                        mode = {ele[DEF.P_TYPE]}
                        datetime = {this.state.data[ele[DEF.P_NAME]]}
                        save ={ (val)=> (this.setState(
                            { data:{
                                ...this.state.data,
                                [ele[DEF.P_NAME]]: val
                            }}
                        ))} /> )        
            ))}
            </Boxer>
            <View style={theme.btnBox} >
                <RegularBtn title={i18n.t('button.save')}
                 onPress = {this.updateOptions} />
            </View>

         </>
        )}
       </ThemeConsumer>

        return (
        <ScrollView>
        { content }
        </ScrollView>
        );
    }
}


const mapStateToProps = state =>{
    return { configurable: state.configurable, config:state.config };
};

export default connect(mapStateToProps,
        {
            putConfigurableItem,
        }
)(OptionEditor); 