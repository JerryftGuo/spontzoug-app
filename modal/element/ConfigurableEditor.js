
import React,{setState, Component} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text,  ThemeConsumer,Input } from  'react-native-elements';
import { Icon } from 'react-native-vector-icons/Ionicons';
import { Boxer,
    RegularBtn,
    } from '../../element/basic';

import {
    postConfigurableCategory,
    postConfigurableItem,
} from '../../action/commAction/ConfigurableAction';
import { connect } from 'react-redux';
import {View,Platform,  TouchableWithoutFeedbackBase, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import i18n from '../../i18n/i18n';
import  * as DEF   from '../../constant';


import { from, forkJoin } from 'rxjs';
import { filter, throwIfEmpty } from 'rxjs/operators';
import { COLOR_DATA } from '../selectData';

import { SwitchWrapper,
    IntegerSlider,
    PriceInput,
    SelectWrapper,
    DateTimeWrapper,
    TextArea,
    IntegerInput
 } from '../../element/basic/wrapperElement';
import { InlineImage } from '../../element/basic/inlineElement';

class ConfigurableEditor extends Component{
    constructor(props){
        super(props);
        const { type, subtype, cmd, key, category} = this.props.route.params;
        let s = {};
        if( cmd === DEF.ADDCATEGORY ){
            this.props.config.config.category[key][DEF.P_DEFINE].forEach(element => {
                if( ! element[DEF.P_DEPRECATED]) 

                s = Object.assign({}, s, { [element[DEF.P_NAME]]: element.default});
//                eval('this.on'+ element[DEF.P_NAME] +'Change()=this.on'+element[DEF.P_NAME]+'Change().bind();');
            });
          
        }
        if( cmd === DEF.ADDITEM ){
            this.props.config.config.item[key].forEach(element => {
                if( element[DEF.P_DEPRECATED]) {

                } else  if ( element[DEF.P_TYPE] === DEF.T_IMAGE ){
                    let imgs =[];
                    for( let i=0; i< element[DEF.P_LIMIT]; i++){
                        let img = { id: i };
                        element[DEF.P_DEFINE].forEach( ele =>{
                            img = Object.assign({}, img, { [ele[DEF.P_NAME]]: ele[DEF.P_DEFAULT]})
                        })
                        imgs = [...imgs, img];
                    }
                    s = Object.assign({}, s, { [element[DEF.P_NAME]]: imgs});
                } else if (element[DEF.P_TYPE] === DEF.T_GROUP  || element[DEF.P_TYPE] === DEF.T_SWITCHGROUP ) {
                    let ss ={};
                    element[DEF.P_DEFINE].forEach( (ele) => {
                        ss = Object.assign({}, ss, { [ele[DEF.P_NAME]]: ele[DEF.P_DEFAULT]});
                    });
                    s = Object.assign({}, s, { [element[DEF.P_NAME]]: ss});
                } else if ( element[DEF.P_TYPE] === DEF.T_LISTGROUP){
                    let s1 ={};
                    let s2 = {};
                    element[DEF.P_DEFINE].forEach( (ele) => {
                        if( ele[DEF.P_TYPE] == DEF.T_REFERENCE){
                            s1 = Object.assign({}, s1, { [ele[DEF.P_NAME]]: this.props.config.config.define_default[ele[DEF.P_DEFINE_DEFAULT]]});
                        } else {
                            s1 = Object.assign({}, s1, { [ele[DEF.P_NAME]]: ele[DEF.P_DEFAULT]});
                        }
                      
                    });
                    element[DEF.P_LIST].forEach( (ele) => {
                        s2 = Object.assign({}, s2, { [ele[DEF.P_NAME]]: s1});
                    });
                    s = Object.assign({}, s, { [element[DEF.P_NAME]]: s2});

                } else {
                    s = Object.assign({}, s, { [element[DEF.P_NAME]]: element[DEF.P_DEFAULT]});
                }
            });
          
        }
        this.state = s;
    
    } 

   saveConfigurableCategory =() =>{
    this.props.postConfigurableCategory(this.props.route.params.key, {
            id:'',
            ...this.state,
    });
   }

   saveConfigurableItem =() =>{
    this.props.postConfigurableItem(this.props.route.params.key, {
            id:'',
            ...this.state,
    });
   }

    render(){
        const {cmd, key, category} = this.props.route.params;
        let data;
        let btn;
        let ttl;
        if( cmd === DEF.ADDCATEGORY ){
            ttl = this.props.config.config.category[key].title;
            data = this.props.config.config.category[key][DEF.P_DEFINE];
            btn = <RegularBtn title={i18n.t('button.save')}
                onPress = {this.saveConfigurableCategory} />
        } else if( cmd === DEF.ADDITEM ){
            ttl = key;
            data = this.props.config.config.item[key];
            btn = <RegularBtn title={i18n.t('button.save')}
            onPress = {this.saveConfigurableItem} />
        }
        else {
            return <></>
        }
//console.warn('data:'+ JSON.stringify(data))

        let  content = 
                <ThemeConsumer>
                { ({theme}) => (
                <>
                <Boxer title={ i18n.t('title.'+ ttl) } >
                    { data.map( ele =>(
                        (ele[DEF.P_TYPE] === DEF.T_STRING && !ele[DEF.P_DEPRECATED] && !ele[DEF.P_EDITONLY] &&
                            <Input label={i18n.t('label.'+ele[DEF.P_NAME])}
                                value = {this.state[ele[DEF.P_NAME]]}
                                onChangeText={ (value) => (this.setState({[ele[DEF.P_NAME]]:value})) } />) ||
                        (ele[DEF.P_TYPE] === DEF.T_TEXT && !ele[DEF.P_DEPRECATED] && !ele[DEF.P_EDITONLY] &&
                            ! ele[DEF.P_READONLY] &&  
                            <TextArea label={i18n.t('label.'+ele[DEF.P_NAME])}
                                value = {this.state[ele[DEF.P_NAME]]}
                                maxLength = { ele[DEF.P_MAXLANGTH]}
                                onChange={ (value) => (this.setState({[ele[DEF.P_NAME]]:value})) } />) ||
                        (ele[DEF.P_TYPE] === DEF.T_INTEGER && !ele[DEF.P_DEPRECATED] && !ele[DEF.P_EDITONLY] &&
                            <IntegerSlider  label={i18n.t('label.'+ele[DEF.P_NAME])}
                                value = {this.state[ele[DEF.P_NAME]]}
                                onChange={ (value) => (this.setState({[ele[DEF.P_NAME]]:value})) } />) ||
                        (ele[DEF.P_TYPE] === DEF.T_QUANTITY && !ele[DEF.P_DEPRECATED] && !ele[DEF.P_EDITONLY] &&
                            <IntegerInput  label={i18n.t('label.'+ele[DEF.P_NAME])}
                                        value = {this.state[ele[DEF.P_NAME]]}
                                        onChange={ (value) => (this.setState({[ele[DEF.P_NAME]]:value})) } />) ||
                        (ele[DEF.P_TYPE] === DEF.T_BOOLEAN && !ele[DEF.P_DEPRECATED] && !ele[DEF.P_EDITONLY] &&
                            <SwitchWrapper label={i18n.t('label.'+ele[DEF.P_NAME])}
                                checked = {this.state[ele[DEF.P_NAME]]}
                                onChange={ (value) => (this.setState({[ele[DEF.P_NAME]]: !this.state[ele[DEF.P_NAME]]})) }/> ) ||
                        (ele[DEF.P_TYPE] === DEF.T_ENUM && !ele[DEF.P_DEPRECATED] && !ele[DEF.P_EDITONLY] &&
                            <SelectWrapper label={i18n.t('label.'+ele[DEF.P_NAME])}
                                items = {this.props.config.config.data[ele[DEF.P_DATA_REF]]}
                                placeholder = {ele[DEF.P_PLACEHOLDER]}
                                value = {this.state[ele[DEF.P_NAME]]}
                                onChange ={ (value) => (this.setState({[ele[DEF.P_NAME]]: value})) }/> ) ||
                        (ele[DEF.P_TYPE] === DEF.T_PRICE && !ele[DEF.P_DEPRECATED] && !ele[DEF.P_EDITONLY] &&
                            <PriceInput label={i18n.t('label.'+ele[DEF.P_NAME])}
                                value ={this.state[ele[DEF.P_NAME]]}
                                onChange={ (value) => (this.setState({[ele[DEF.P_NAME]]: value})) }/> ) ||
                        (( ele[DEF.P_TYPE] === DEF.T_DATE || ele[DEF.P_TYPE] === DEF.T_TIME || ele[DEF.P_TYPE] === DEF.T_DATETIME) &&
                         !ele[DEF.P_DEPRECATED] && !ele[DEF.P_EDITONLY] && !ele[DEF.P_READONLY] &&
                            <DateTimeWrapper label ={i18n.t('label.'+ele[DEF.P_NAME])}
                                mode = {ele[DEF.P_TYPE]}
                                datetime = {this.state[ele[DEF.P_NAME]]}
                                save = { (value) => (this.setState({[ele[DEF.P_NAME]]: value})) } /> ) ||

                        ( ( ele[DEF.P_TYPE] === DEF.T_GROUP || ele[DEF.P_TYPE] === DEF.T_SWITCHGROUP) &&
                          Object.keys(ele.define).length === ele.size && !ele[DEF.P_EDITONLY] &&
                        <Boxer title={ele[DEF.P_NAME]} >
                           {ele.define.map( it => (
                            (it[DEF.P_TYPE] === DEF.T_STRING && !ele[DEF.P_DEPRECATED] &&
                                <Input label={i18n.t('label.'+it[DEF.P_NAME])}
                                   value = {this.state[ele[DEF.P_NAME]][it[DEF.P_NAME]]}
                                   onChangeText={ (value) => (this.setState({[ele[DEF.P_NAME]]:{...this.state[ele[DEF.P_NAME]],[it[DEF.P_NAME]]:value}})) } />) ||
                            (it[DEF.P_TYPE] === DEF.T_TEXT && !ele[DEF.P_DEPRECATED] &&
                                <TextArea label={i18n.t('label.'+it[DEF.P_NAME])}
                                   value = {this.state[ele[DEF.P_NAME]][it[DEF.P_NAME]]}
                                   maxLength = { it[DEF.P_MAXLANGTH]}
                                   onChange={ (value) => (this.setState({[ele[DEF.P_NAME]]:{...this.state[ele[DEF.P_NAME]],[it[DEF.P_NAME]]:value}})) } />) ||
                            (it[DEF.P_TYPE] === DEF.T_INTEGER && !ele[DEF.P_DEPRECATED] &&
                                <IntegerSlider label={i18n.t('label.'+it[DEF.P_NAME])}
                                    value = {this.state[ele[DEF.P_NAME]][it[DEF.P_NAME]]}
                                    onChange={ (value) => (this.setState({[ele[DEF.P_NAME]]:{...this.state[ele[DEF.P_NAME]],[it[DEF.P_NAME]]:value}})) } />) ||
                            (it[DEF.P_TYPE] === DEF.T_QUANTITY && !ele[DEF.P_DEPRECATED] &&
                                <IntegerInput label={i18n.t('label.'+it[DEF.P_NAME])}
                                value = {this.state[ele[DEF.P_NAME]][it[DEF.P_NAME]]}
                                onChange={ (value) => (this.setState({[ele[DEF.P_NAME]]:{...this.state[ele[DEF.P_NAME]],[it[DEF.P_NAME]]:value}})) } />) ||
                            (it[DEF.P_TYPE] === DEF.T_BOOLEAN && !ele[DEF.P_DEPRECATED] &&
                                <SwitchWrapper label={i18n.t('label.'+it[DEF.P_TITLE])}
                                    checked = {this.state[ele[DEF.P_NAME]][it[DEF.P_NAME]]}
                                    onChange={ (value) => (this.setState({[ele[DEF.P_NAME]]:{...this.state[ele[DEF.P_NAME]],[it[DEF.P_NAME]]:
                                     !this.state[ele[DEF.P_NAME]][it[DEF.P_NAME]]}})) }/> ) ||
                            (it[DEF.P_TYPE] === DEF.T_ENUM &&  !ele[DEF.P_DEPRECATED] &&
                                <SelectWrapper label={i18n.t('label.'+it[DEF.P_NAME])}
                                    items = {this.props.config.config.data[it[DEF.P_DATA_REF]]}
                                    value = {this.state[ele[DEF.P_NAME]][it[DEF.P_NAME]]}
                                    placeholder = {it.placeholder}
                                    onChange ={ (value) => (this.setState({[ele[DEF.P_NAME]]:{...this.state[ele[DEF.P_NAME]],[it[DEF.P_NAME]]:value}})) }/> ) ||
                            (it[DEF.P_TYPE] === DEF.T_PRICE &&  !ele[DEF.P_DEPRECATED] &&
                                <PriceInput label={i18n.t('label.'+it[DEF.P_NAME])}
                                    value ={this.state[ele[DEF.P_NAME]][it[DEF.P_NAME]]}
                                    onChange={ (value) => (this.setState({[ele[DEF.P_NAME]]: value})) }/> ) ||
                            (( it[DEF.P_TYPE] === DEF.T_DATE || it[DEF.P_TYPE] === DEF.T_TIME || it[DEF.P_TYPE] === DEF.T_DATETIME) &&
                                 !ele[DEF.P_DEPRECATED] &&
                                <DateTimeWrapper label ={i18n.t('label.'+it[DEF.P_NAME])}
                                    mode = {it[DEF.P_TYPE]}
                                    datetime = {this.state[ele[DEF.P_NAME]][it[DEF.P_NAME]]}
                                    onChange= { (value) => (this.setState({[ele[DEF.P_NAME]]:{...this.state[ele[DEF.P_NAME]],[it[DEF.P_NAME]]:value}})) } /> ) 

                            ))}
                        </Boxer> )
                    ))}
                </Boxer>
                <View style={theme.btnBox} >
                {btn}
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

export default connect(mapStateToProps,{
        postConfigurableCategory,
        postConfigurableItem,
})(ConfigurableEditor); 

