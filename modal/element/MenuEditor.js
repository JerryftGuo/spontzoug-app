
import React,{setState, Component} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text,  ThemeConsumer,Input } from  'react-native-elements';
import { Icon } from 'react-native-vector-icons/Ionicons';
import { Boxer,
    RegularBtn,
    } from '../../element/basic';

import {
    postMenuCategory,
    postMenuItem,
} from '../../action/commAction/MenuAction';
import { connect } from 'react-redux';
import {View,Platform,  TouchableWithoutFeedbackBase, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import i18n from '../../i18n/i18n';
import  * as DEF   from '../../constant';


import { from } from 'rxjs';
import { filter, throwIfEmpty } from 'rxjs/operators';
import { COLOR_DATA } from '../selectData';

import { SwitchWrapper,
    IntegerSlider,
    PriceInput,
    SelectWrapper,
    DateTimeWrapper,
    TextArea
 } from '../../element/basic/wrapperElement';
import { InlineImage } from '../../element/basic/inlineElement';

class MenuEditor extends Component{
    constructor(props){
        super(props);
        const { type, subtype, cmd, name, category} = this.props.route.params;
        let s = {};
        if( cmd === DEF.ADDCATEGORY ){
            this.props.config.config.category.forEach(element => {
                if( ! element[DEF.P_DEPRECATED]) 

                s = Object.assign({}, s, { [element[DEF.P_NAME]]: element.default});
//                eval('this.on'+ element[DEF.P_NAME] +'Change()=this.on'+element[DEF.P_NAME]+'Change().bind();');
            });
          
        }
        if( cmd === DEF.ADDITEM ){
            this.props.config.config.item[name].forEach(element => {
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
                } else if (element[DEF.P_TYPE] === DEF.T_GROUP ) {
                    let ss ={};
                    element[DEF.P_DEFINE].forEach( (ele) => {
                        ss = Object.assign({}, ss, { [ele[DEF.P_NAME]]: ele[DEF.P_DEFAULT]});
                    });
                    s = Object.assign({}, s, { [element[DEF.P_NAME]]: ss});
                } else {
                    s = Object.assign({}, s, { [element[DEF.P_NAME]]: element[DEF.P_DEFAULT]});
                }
            });
          
        }
        this.state = s;
    
    } 

   saveMenuCategory =() =>{
    this.props.postMenuCategory({
            id:'',
            ...this.state,
    });
   }

   saveMenuItem =() =>{
    this.props.postMenuItem({
            id:'',
            ...this.state,
    });
   }

    render(){
        const {cmd, name, category} = this.props.route.params;
        let content;

        if( cmd === DEF.ADDCATEGORY ){
             content = 
        <ThemeConsumer>
        { ({theme}) => (
            <>
            <Boxer title={ i18n.t('label.category') } >
            { this.props.config.config.category.map( ele =>(
            (ele[DEF.P_TYPE] === DEF.T_STRING && !ele[DEF.P_DEPRECATED] &&
                <Input label={i18n.t('label.'+ele[DEF.P_NAME])}
                  value = {this.state[ele[DEF.P_NAME]]}
                  onChangeText={ (value) => (this.setState({[ele[DEF.P_NAME]]:value})) } />) ||
            (ele[DEF.P_TYPE] === DEF.T_TEXT && !ele[DEF.P_DEPRECATED] &&
                <TEXTAREA label={i18n.t('label.'+ele[DEF.P_NAME])}
                    value = {this.state[ele[DEF.P_NAME]]}
                    onChange={ (value) => (this.setState({[ele[DEF.P_NAME]]:value})) } />) ||
            (ele[DEF.P_TYPE] === DEF.T_BOOLEAN && !ele[DEF.P_DEPRECATED] &&
                <SwitchWrapper label={i18n.t('label.'+ele[DEF.P_NAME])}
                    checked = {this.state[ele[DEF.P_NAME]]}
                    onChange={ (value) => (this.setState({[ele[DEF.P_NAME]]: value})) }/> ) ||
            (ele[DEF.P_TYPE] === DEF.T_ENUM && !ele[DEF.P_DEPRECATED] &&
                <SelectWrapper label={i18n.t('label.'+ele[DEF.P_NAME])}
                    items = {this.props.config.config.data[ele[DEF.P_NAME]]}
                    placeholder = {ele[DEF.P_NAME]}
                    onChange ={ (value) => (this.setState({[ele[DEF.P_NAME]]: value})) }/> ) ||
            (ele[DEF.P_TYPE] === DEF.T_PRICE && !ele[DEF.P_DEPRECATED] &&
              <PriceInput label={i18n.t('label.'+ele[DEF.P_NAME])}
                value ={item[ele[DEF.P_NAME]]}
                onChange={ (value) => (this.setState({[ele[DEF.P_NAME]]: value})) }/> ) ||
            ( ( ele[DEF.P_TYPE] === DEF.T_DATE || ele[DEF.P_TYPE] === DEF.T_TIME || ele[DEF.P_TYPE] === DEF.T_DATETIME) && !ele[DEF.P_DEPRECATED] &&
              <DateTimeWrapper label ={i18n.t('label.'+ele[DEF.P_NAME])}
              mode = {ele[DEF.P_TYPE]}
              datetime = {item[ele[DEF.P_NAME]]}
              save = { (value) => (this.setState({[ele[DEF.P_NAME]]: value})) } /> ) ||

            (ele[DEF.P_TYPE] === DEF.T_GROUP &&  Object.keys(ele.define).length === ele.size &&
              <Boxer title={ele[DEF.P_NAME]} >
              {
                ele.define.map( it => (
                    (it[DEF.P_TYPE] === DEF.T_STRING && !ele[DEF.P_DEPRECATED] &&
                        <Input label={i18n.t('label.'+it[DEF.P_NAME])}
                           value = {this.state[ele[DEF.P_NAME]][it[DEF.P_NAME]]}
                           onChangeText={ (value) => (this.setState({[ele[DEF.P_NAME]]:{...ele[DEF.P_NAME],[it[DEF.P_NAME]]:value}})) } />) ||
                    (it[DEF.P_TYPE] === DEF.T_TEXT && !ele[DEF.P_DEPRECATED] &&
                        <TEXTAREA label={i18n.t('label.'+it[DEF.P_NAME])}
                           value = {this.state[ele[DEF.P_NAME]][it[DEF.P_NAME]]}
                           onChange={ (value) => (this.setState({[ele[DEF.P_NAME]]:{...ele[DEF.P_NAME],[it[DEF.P_NAME]]:value}})) } />) ||
                    (it[DEF.P_TYPE] === DEF.T_BOOLEAN && !ele[DEF.P_DEPRECATED] &&
                        <SwitchWrapper label={i18n.t('label.'+it[DEF.P_NAME])}
                            checked = {this.state[ele[DEF.P_NAME]][it[DEF.P_NAME]]}
                            onChange={ (value) => (this.setState({[ele[DEF.P_NAME]]:{...ele[DEF.P_NAME],[it[DEF.P_NAME]]:value}})) }/> ) ||
                    (it[DEF.P_TYPE] === DEF.T_ENUM &&  !ele[DEF.P_DEPRECATED] &&
                        <SelectWrapper label={i18n.t('label.'+it[DEF.P_NAME])}
                            items = {this.props.config.config.data[ele[DEF.P_NAME]]}
                            placeholder = {it.placeholder}
                            onChange ={ (value) => (this.setState({[ele[DEF.P_NAME]]:{...ele[DEF.P_NAME],[it[DEF.P_NAME]]:value}})) }/> ) ||
                    (it[DEF.P_TYPE] === DEF.T_PRICE &&  !ele[DEF.P_DEPRECATED] &&
                      <PriceInput label={i18n.t('label.'+it[DEF.P_NAME])}
                        value ={this.state[ele[DEF.P_NAME]][it[DEF.P_NAME]]}
                        onChange={ (value) => (this.setState({[ele[DEF.P_NAME]]: value})) }/> ) ||
                    ( ( it[DEF.P_TYPE] === DEF.T_DATE || it[DEF.P_TYPE] === DEF.T_TIME || it[DEF.P_TYPE] === DEF.T_DATETIME) && !ele[DEF.P_DEPRECATED] &&
                      <DateTimeWrapper label ={i18n.t('label.'+it[DEF.P_NAME])}
                      mode = {ele[DEF.P_TYPE]}
                      datetime = {this.state[ele[DEF.P_NAME]][it[DEF.P_NAME]]}
                      onChange= { (value) => (this.setState({[ele[DEF.P_NAME]]:{...ele[DEF.P_NAME],[it[DEF.P_NAME]]:value}})) } /> ) 

             ))
              }
             </Boxer> )
             ))}
             </Boxer>
             </>
         )}
        </ThemeConsumer>
        }
    
        if( cmd === DEF.ADDITEM ){
            content = 
       <ThemeConsumer>
       { ({theme}) => (
           <>
           <Boxer title={ i18n.t('label.item') } >
           { this.props.config.config.item[name].map( ele => (
           (ele[DEF.P_TYPE] === DEF.T_STRING && !ele[DEF.P_DEPRECATED] &&
               <Input label={i18n.t('label.'+ele[DEF.P_NAME])}
                 value = {this.state[ele[DEF.P_NAME]]}
                 onChangeText={ (value) => (this.setState({[ele[DEF.P_NAME]]:value})) } />) ||
           (ele[DEF.P_TYPE] === DEF.T_TEXT && !ele[DEF.P_DEPRECATED] &&
                    <TextArea label={i18n.t('label.'+ele[DEF.P_NAME])}
                    value = {this.state[ele[DEF.P_NAME]]}
                    onChange = { (value) => (this.setState({[ele[DEF.P_NAME]]:value})) } />) ||
           (ele[DEF.P_TYPE] === DEF.T_BOOLEAN &&  !ele[DEF.P_DEPRECATED] &&
               <SwitchWrapper label={i18n.t('label.'+ele[DEF.P_NAME])}
                   checked = {this.state[ele[DEF.P_NAME]]}
                   onChange = { () => (this.setState({[ele[DEF.P_NAME]]: !this.state[ele[DEF.P_NAME]] })) }/> ) ||
           (ele[DEF.P_TYPE] === DEF.T_ENUM &&  !ele[DEF.P_DEPRECATED] &&
               <SelectWrapper label={i18n.t('label.'+ele[DEF.P_NAME])}
                   items = {this.props.config.config.data[ele[DEF.P_NAME]]}
                   placeholder = {ele[DEF.P_NAME]}
                   onChange ={ (value) => (this.setState({[ele[DEF.P_NAME]]: value})) }/> ) ||
           (ele[DEF.P_TYPE] === DEF.T_PRICE &&  !ele[DEF.P_DEPRECATED] &&
               <PriceInput label={i18n.t('label.'+ele[DEF.P_NAME])}
               value ={this.state[ele[DEF.P_NAME]]}
               onChange={ (value) => (this.setState({[ele[DEF.P_NAME]]: value})) }/> ) ||
           ( ( ele[DEF.P_TYPE] === DEF.T_DATE || ele[DEF.P_TYPE] === DEF.T_TIME || ele[DEF.P_TYPE] === DEF.T_DATETIME) &&  !ele[DEF.P_DEPRECATED] &&
             <DateTimeWrapper label ={i18n.t('label.'+ele[DEF.P_NAME])}
             mode = {ele[DEF.P_TYPE]}
             datetime = {this.state[ele[DEF.P_NAME]]}
             save = { (value) => (this.setState({[ele[DEF.P_NAME]]: value})) } /> ) ||

           (ele[DEF.P_TYPE] === DEF.T_GROUP &&  Object.keys(ele.define).length === ele.size &&
             <Boxer title={ele[DEF.P_NAME]} >
             {
               ele.define.map( it => (
                   (it[DEF.P_TYPE] === DEF.T_STRING &&  !ele[DEF.P_DEPRECATED] &&
                       <Input label={i18n.t('label.'+it[DEF.P_NAME])}
                          value = {this.state[ele[DEF.P_NAME]][it[DEF.P_NAME]]}
                          onChangeText={ (value) => (this.setState({[ele[DEF.P_NAME]]:{...ele[DEF.P_NAME],[it[DEF.P_NAME]]:value}})) } />) ||
                   (it[DEF.P_TYPE] === DEF.T_TEXT && !it[DEF.P_DEPRECATED] &&
                            <TextArea label={i18n.t('label.'+it[DEF.P_NAME])}
                            value = {this.state[ele[DEF.P_NAME]][it[DEF.P_NAME]]}
                            onChange={ (value) => (this.setState({[ele[DEF.P_NAME]]:{...ele[DEF.P_NAME],[it[DEF.P_NAME]]:value}})) }/> ) ||
                   (it[DEF.P_TYPE] === DEF.T_BOOLEAN && !ele[DEF.P_DEPRECATED] &&
                       <SwitchWrapper label={i18n.t('label.'+it[DEF.P_NAME])}
                           checked = {this.state[ele[DEF.P_NAME]][it[DEF.P_NAME]]}
                           onChange={ (value) => (this.setState({[ele[DEF.P_NAME]]:{...ele[DEF.P_NAME],[it[DEF.P_NAME]]: !this.state[ele[DEF.P_NAME]][it[DEF.P_NAME]] }})) }/> ) ||
                   (it[DEF.P_TYPE] === DEF.T_ENUM &&  !ele[DEF.P_DEPRECATED] &&
                       <SelectWrapper label={i18n.t('label.'+it[DEF.P_NAME])}
                           items = {this.props.config.config.data[ele[DEF.P_NAME]]}
                           placeholder = {it.placeholder}
                           onChange ={ (value) => (this.setState({[ele[DEF.P_NAME]]:{...ele[DEF.P_NAME],[it[DEF.P_NAME]]:value}})) }/> ) ||
                   (it[DEF.P_TYPE] === DEF.T_PRICE &&  !ele[DEF.P_DEPRECATED] &&
                     <PriceInput label={i18n.t('label.'+it[DEF.P_NAME])}
                       value ={this.state[ele[DEF.P_NAME]][it[DEF.P_NAME]]}
                       onChange={ (value) => (this.setState({[ele[DEF.P_NAME]]: value})) }/> ) ||
                   ( ( it[DEF.P_TYPE] === DEF.T_DATE || it[DEF.P_TYPE] === DEF.T_TIME || it[DEF.P_TYPE] === DEF.T_DATETIME) &&  !ele[DEF.P_DEPRECATED] &&
                     <DateTimeWrapper label ={i18n.t('label.'+it[DEF.P_NAME])}
                     mode = {it[DEF.P_TYPE]}
                     datetime = {this.state[ele[DEF.P_NAME]][it[DEF.P_NAME]]}
                     onChange= { (value) => (this.setState({[ele[DEF.P_NAME]]:{...ele[DEF.P_NAME],[it[DEF.P_NAME]]:value}})) } /> ) 

            ))
             }
            </Boxer> )
            ))}
            </Boxer>
            </>
        )}
       </ThemeConsumer>
        }

        return (
        <ScrollView>
        { content }
        </ScrollView>
        );
    }
}

const mapStateToProps = state =>{
    return { service: state.service, config:state.config };
};

export default connect(mapStateToProps,{
        postMenuCategory,
        postMenuItem,
})(MenuEditor); 

/*
  (ele[DEF.P_TYPE] === DEF.T_TEXT && !ele[DEF.P_DEPRECATED] &&
                <TextArea label={i18n.t('label.'+ele[DEF.P_NAME])}
                value = {this.state[ele[DEF.P_NAME]]}
                onChange = { (value) => (this.setState({[ele[DEF.P_NAME]]:value})) } />) ||


<Text>{this.state[DEF.P_NAME]}</Text>
< Button onPress={ () =>( this.setState({name:'text'})) } title='text'></Button>

  (ele[DEF.P_TYPE] === T_BOOLEAN && 
                    <SwitchWrapper label={i18n.t('label.'+ele[DEF.P_NAME])}
                        checked = {this.state[ele[DEF.P_NAME]]}
                        onChange={ (value) => (this.setState({[ele[DEF.P_NAME]]: value})) }/> ) ||
                (ele[DEF.P_TYPE] === T_ENUM && 
                    <SelectWrapper label={i18n.t('label.'+ele[DEF.P_NAME])}
                        items = {this.props.config.config.data[ele[DEF.P_NAME]]}
                        onChange ={ (value) => (this.setState({[ele[DEF.P_NAME]]: value})) }/> ) ||
                (ele[DEF.P_TYPE] === T_PRICE && 
                  <PriceInput label={i18n.t('label.'+ele[DEF.P_NAME])}
                    value ={item[ele[DEF.P_NAME]]}
                    onChange={ (value) => (this.setState({[ele[DEF.P_NAME]]: value})) }/> ) ||
                ( ( ele[DEF.P_TYPE] === T_DATE || ele[DEF.P_TYPE] === T_TIME || ele[DEF.P_TYPE] === T_DATETIME) &&
                  <DateTimeWrapper label ={i18n.t('label.'+ele[DEF.P_NAME])}
                  mode = {ele[DEF.P_TYPE]}
                  datetime = {item[ele[DEF.P_NAME]]}
                  save = { (value) => (this.setState({[ele[DEF.P_NAME]]: value})) } /> ) ||
    
                (ele[DEF.P_TYPE] ===T_GROUP &&  Object.keys(ele.define).length === ele.size &&
                  <Boxer title={ele[DEF.P_NAME]} >
                  {
                    ele.define.map( it => (
                        (it[DEF.P_TYPE] ===T_STRING &&
                            <Input label={i18n.t('label.'+it[DEF.P_NAME])}
                               onChangeText={ (value) => (this.setState({[ele[DEF.P_NAME]]:{...ele[DEF.P_NAME],[it[DEF.P_NAME]]:value}})) } />) ||
                        (it[DEF.P_TYPE] ===T_BOOLEAN && 
                            <SwitchWrapper label={i18n.t('label.'+it[DEF.P_NAME])}
                                checked = {this.state[ele[DEF.P_NAME]][it[DEF.P_NAME]]}
                                onChange={ (value) => (this.setState({[ele[DEF.P_NAME]]:{...ele[DEF.P_NAME],[it[DEF.P_NAME]]:value}})) }/> ) ||
                        (it[DEF.P_TYPE] ===T_ENUM && 
                            <SelectWrapper label={i18n.t('label.'+it[DEF.P_NAME])}
                                items = {this.props.config.config.data[ele[DEF.P_NAME]]}
                                onChange ={ (value) => (this.setState({[ele[DEF.P_NAME]]:{...ele[DEF.P_NAME],[it[DEF.P_NAME]]:value}})) }/> ) ||
                        (it[DEF.P_TYPE] ===T_PRICE && 
                          <PriceInput label={i18n.t('label.'+it[DEF.P_NAME])}
                            value ={this.state[ele[DEF.P_NAME]][it[DEF.P_NAME]]}
                            onChange={ (value) => (this.setState({[ele[DEF.P_NAME]]: value})) }/> ) ||
                        ( ( it[DEF.P_TYPE] ===T_DATE || it[DEF.P_TYPE] === T_TIME || it[DEF.P_TYPE] === T_DATETIME) &&
                          <DateTimeWrapper label ={i18n.t('label.'+it[DEF.P_NAME])}
                          mode = {ele[DEF.P_TYPE]}
                          datetime = {this.state[ele[DEF.P_NAME]][it[DEF.P_NAME]]}
                          onChange= { (value) => (this.setState({[ele[DEF.P_NAME]]:{...ele[DEF.P_NAME],[it[DEF.P_NAME]]:value}})) } /> ) 

                 ))
                  }
             </Boxer> )



*/