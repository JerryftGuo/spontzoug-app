import React, {Component}  from 'react';
import { ScrollView, FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import { Button, ThemeConsumer, ButtonGroup, Overlay } from 'react-native-elements';
import {Icon} from 'react-native-vector-icons/Ionicons';

import { 
    getConfigurableItem,
    putConfigurableItem
} from '../../action/commAction/ConfigurableAction';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import i18n from '../../i18n/i18n';
import * as DEF from '../../constant';
import { InlineInput,
  InlineSelect,
  InlineSwitch,
  InlinePrice,
  InlineDateTimePicker,
  InlineImage,
  InlineText,
  InlineInteger,
  InlineSlider
} from '../basic/inlineElement';
 import {
   IconBtn,
   RegularBtn,
   Boxer,
   DatesSetter,
   Title,
   TitleWithBtn,
   DayHoursSetup,
 } from '../basic';
 
 import {
 BusinessHoursDisplay,
 ScheduleHoursDisplay
 } from '../basic/basicElement';

 import { arrayReplace } from '../../utils';
 import { from, pipe } from 'rxjs';
import { filter,reduce, isEmpty} from 'rxjs/operators';
import { COLOR_DATA } from '../../modal/selectData';
import { ThemeColors } from 'react-navigation';
import { SwitchWrapper, TextArea } from '../basic/wrapperElement';


class ProfileConfigurableItemList extends Component {
    constructor(props){
        super(props);
        let arrayItems = [];
        props.config.config.item[props.route.params.key].forEach(element => {
            if( element[DEF.P_TYPE] === DEF.T_ARRAY) { arrayItems.push(element[DEF.P_NAME])}           
        });

        this.state = {
            key: props.route.params.key,
            arrays: arrayItems,
        }
        this.updateConfigurableItem = this.updateConfigurableItem.bind();
    }


    componentDidMount = async () =>{
 //       this.props.getConfigurableItem &&
 //       await this.props.getConfigurableItem(this.state.key);
    }


    updateConfigurableItem = (id, type, sid, name, value) => {

      from(this.props.configurable.items[this.state.key])
      .pipe(
        filter( item => item.id === id),
      ).subscribe(
        item =>{
          if( type === 'root' ){
            this.props.putConfigurableItem &&
            this.props.putConfigurableItem(this.state.key, Object.assign({}, item, { [name]: value})); 
          } else {
            if( this.state.arrays.includes( type ) ){
              let newopts = arrayReplace(item[type], sid, name, value)
              this.props.putConfigurableItem
              this.props.putConfigurableItem(this.state.key, Object.assign({}, item,
                 { [type]: newopts}
                 ));
            } else {
                this.props.putConfigurableItem &&
                this.props.putConfigurableItem(this.state.key, Object.assign({}, item,
                    { [type]:{
                    ...item[type],
                  [name]: value}
                }));
            }
          }
        }
      );

    }

    render (){
       const { title, key, category  } = this.props.route.params;
       let ttl = key;
       if( category !== undefined ) {ttl += '.'+ category;}
console.warn("result:"+ JSON.stringify( this.props.configurable.items))
       return (
            <ThemeConsumer>
                {({theme}) => (
                 <>
                <Text> message: {JSON.stringify(this.props.configurable.message)} </Text>
                <Text> error: { JSON.stringify(this.props.configurable.error)} </Text>
                { this.props.configurable.items[key].length <this.props.config.config.keys.filter( item => item.name === key)[0].itemLimit &&
                 <TitleWithBtn title ={ttl}
                  onPress= {()=> this.props.navigation.navigate("ConfigurableModal",{
                      cmd: DEF.ADDITEM,
                      key: key,
                    })}
                  icon={theme.IconBtn.itemaddBtn}
                />
                }
                { this.props.configurable.items[key].length === this.props.config.config.keys.filter( item => item.name === key)[0].itemLimit &&
                 <Title title ={ttl}  />
                }
               
              { this.props.configurable.items[key].length > 0 && 
                <FlatList
                      data = {this.props.configurable.items[key]}
                      keyExtractor = {item =>item.id}
                      renderItem= {({item}) => <>
                         <View style={theme.List.container} >
                             <Title title={item.name } />
                             {            
                                this.props.config.config.item[key].map(ele => (
                                  (ele[DEF.P_TYPE] === DEF.T_IMAGE &&
                                    <InlineImage 
                                      images = {item[ele[DEF.P_NAME]]}
                                      config = {ele}
                                      id = {item.id} type='root' name={ele[DEF.P_NAME]}
                                      save={this.updateConfigurableItem}/>) ||
        
                                  (ele[DEF.P_TYPE] ===DEF.T_STRING &&
                                      <InlineInput label={i18n.t('label.'+ele[DEF.P_NAME])}
                                          text={item[ele[DEF.P_NAME]]}
                                          id = {item.id} type='root' name={ele[DEF.P_NAME]}
                                         save={this.updateConfigurableItem}/>) ||
                                  (ele[DEF.P_TYPE] ===DEF.T_TEXT &&
                                      <InlineText label={i18n.t('label.'+ele[DEF.P_NAME])}
                                          text={item[ele[DEF.P_NAME]]}
                                          id = {item.id} type='root' name={ele[DEF.P_NAME]}
                                          lines = {ele.lines}
                                          maxLength = {ele.maxLength}
                                          save={this.updateConfigurableItem}/>) ||
                                  (ele[DEF.P_TYPE] ===DEF.T_INTGER &&
                                      <InlineSlider label={i18n.t('label.'+ele[DEF.P_NAME])}
                                          value={item[ele[DEF.P_NAME]]}
                                          id = {item.id} type='root' name={ele[DEF.P_NAME]}
                                          save={this.updateConfigurableItem}/>) ||
                                  (ele[DEF.P_TYPE] ===DEF.T_QUANTITY &&
                                      <InlineInteger label={i18n.t('label.'+ele[DEF.P_NAME])}
                                          value={item[ele[DEF.P_NAME]]}
                                          id = {item.id} type='root' name={ele[DEF.P_NAME]}
                                          save={this.updateConfigurableItem}/>) ||
                                  (ele[DEF.P_TYPE] ===DEF.T_ENUM && 
                                      <InlineSelect label={i18n.t('label.'+ele[DEF.P_NAME])}
                                          text ={item[ele[DEF.P_NAME]]}
                                          id = {item.id} type='root' name={ele[DEF.P_NAME]}
                                          placeholder = {i18n.t('label.'+ele.placeholder)}
                                          data = { this.props.config.config.data[ele[DEF.P_DATA_REF]]}
                                          save={this.updateConfigurableItem}/> ) ||
                                  (ele[DEF.P_TYPE] ===DEF.T_BOOLEAN && 
                                      <InlineSwitch label={i18n.t('label.'+ele[DEF.P_NAME])}
                                          id = {item.id} type='root' name={ele[DEF.P_NAME]}
                                          checked = {item[ele[DEF.P_NAME]]}
                                          save ={this.updateConfigurableItem}/> ) ||
                                  (ele[DEF.P_TYPE] ===DEF.T_PRICE && 
                                    <InlinePrice label={i18n.t('label.'+ele[DEF.P_NAME])}
                                       value ={item[ele[DEF.P_NAME]]}
                                      id = {item.id} type='root' name={ele[DEF.P_NAME]}
                                      save={this.updateConfigurableItem}/> ) ||
                                  ( ( ele[DEF.P_TYPE] ===DEF.T_DATE || ele[DEF.P_TYPE] === DEF.T_TIME || ele[DEF.P_TYPE] === DEF.T_DATETIME) &&
                                    <InlineDateTimePicker label ={i18n.t('label.'+ele[DEF.P_NAME])}
                                    id = {item.id} type='root' name={ele[DEF.P_NAME]}
                                    mode = {ele[DEF.P_TYPE]}
                                    datetime = {item[ele[DEF.P_NAME]]}
                                    save = {this.updateConfigurableItem} /> ) ||
                                  
                                  (ele[DEF.P_TYPE] ===DEF.T_GROUP &&  Object.keys(ele[DEF.P_DEFINE]).length === ele[DEF.P_SIZE] &&
                                    <Boxer title={ele[DEF.P_NAME]} >
                                    {
                                      ele[DEF.P_DEFINE].map( it => (
                                      (it[DEF.P_TYPE] ===DEF.T_BOOLEAN && 
                                          <InlineSwitch label={i18n.t('label.'+it[DEF.P_NAME])}
                                              id = {item.id} type={ele[DEF.P_NAME]} name={it[DEF.P_NAME]}
                                              checked = {ele[DEF.P_NAME][it[DEF.P_NAME]]}
                                              save ={this.updateConfigurableItem}/> ) ||
                                      (it[DEF.P_TYPE] === DEF.T_STRING && 
                                        <InlineInput label={i18n.t('label.'+it[DEF.P_NAME])}
                                          text={item[ele[DEF.P_NAME]][it[DEF.P_NAME]]}
                                          id = {item.id} type={ele[DEF.P_NAME]} name={it[DEF.P_NAME]}
                                         save={this.updateConfigurableItem}/>) ||
                                      (it[DEF.P_TYPE] === DEF.T_TEXT && 
                                          <InlineText label={i18n.t('label.'+it[DEF.P_NAME])}
                                            text={item[ele[DEF.P_NAME]][it[DEF.P_NAME]]}
                                            id = {item.id} type={ele[DEF.P_NAME]} name={it[DEF.P_NAME]}
                                            lines = {it.lines}
                                            maxLength = {it.maxLength}
                                           save={this.updateConfigurableItem}/>) ||
                                      (it[DEF.P_TYPE] === DEF.T_INTEGER && 
                                        <InlineSlider label={i18n.t('label.'+it[DEF.P_NAME])}
                                          value={item[ele[DEF.P_NAME]][it[DEF.P_NAME]]}
                                          id = {item.id} type={ele[DEF.P_NAME]} name={it[DEF.P_NAME]}
                                          save={this.updateConfigurableItem}/>) ||
                                      (it[DEF.P_TYPE] === DEF.T_QUANTITY && 
                                          <InlineIntger label={i18n.t('label.'+it[DEF.P_NAME])}
                                            value={item[ele[DEF.P_NAME]][it[DEF.P_NAME]]}
                                            id = {item.id} type={ele[DEF.P_NAME]} name={it[DEF.P_NAME]}
                                            save={this.updateConfigurableItem}/>) ||
                                      (it[DEF.P_TYPE] ===DEF.T_ENUM && 
                                          <InlineSelect label={i18n.t('label.'+it[DEF.P_NAME])}
                                              text ={item[ele[DEF.P_NAME]][it[DEF.P_NAME]]}
                                              id = {item.id} type={ele[DEF.P_NAME]} name={it[DEF.P_NAME]}
                                              placeholder = {i18n.t('label.'+it.placeholder)}
                                              data = { this.props.config.config.data[it[DEF.P_DATA_REF]]}
                                              save={this.updateConfigurableItem}/> ) ||
                                      ( (it[DEF.P_TYPE] === DEF.T_DATE || it[DEF.P_TYPE] === DEF.T_TIME || it[DEF.P_TYPE] === DEF.T_DATETIME )&& 
                                        <InlineDateTimePicker label={i18n.t('label.'+it[DEF.P_NAME])}
                                          mode = {it[DEF.P_TYPE]}
                                          id = {item.id} type={ele[DEF.P_NAME]} name={it[DEF.P_NAME]}
                                          datetime = {item[ele[DEF.P_NAME]][it[DEF.P_NAME]]}
                                          save ={this.updateConfigurableItem}/> ) ||
                                      (  it[DEF.P_TYPE] ===DEF.T_PRICE && 
                                          <InlinePrice label={i18n.t('label.'+it[DEF.P_NAME])}
                                              value ={item[ele[DEF.P_NAME]][it[DEF.P_NAME]]}
                                              id = {item.id} type={ele[DEF.P_NAME]} name={it[DEF.P_NAME]}
                                            save={this.updateConfigurableItem}/> ) 
                                        
                                      ))
                                     }
                                    </Boxer> ) ||

                                  (ele[DEF.P_TYPE] ===DEF.T_ARRAY &&  ele[DEF.P_DEFINE].length === ele[DEF.P_SIZE] &&
                                
                                  <Boxer title={ele[DEF.P_NAME]} >
                                  {
                                  <View style={theme.List.listsContainer}>
                                   <View style={theme.List.listsLeft} >
                                     <View style={theme.List.listsTitleContainer}>
                                     <Text style ={theme.List.listsTitleText}> {i18n.t('title.'+ele[DEF.P_NAME])}</Text>
                                      </View>
                                    
                                      { item[ele[DEF.P_NAME]].map(data => (                          
                                         ele[DEF.P_DEFINE].map( it => (
                                          (it[DEF.P_TYPE] ===DEF.T_BOOLEAN && 
                                             <InlineSwitch label={i18n.t('label.'+it[DEF.P_NAME])}
                                              id = {item.id} type={ele[DEF.P_NAME]} sid ={data.id} name={it[DEF.P_NAME]}
                                              checked = {data[it[DEF.P_NAME]]}
                                              save ={this.updateConfigurableItem}/> ) ||
                                          (it[DEF.P_TYPE] === DEF.T_STRING && 
                                             <InlineInput label={i18n.t('label.'+it[DEF.P_NAME])}
                                              text={data[it[DEF.P_NAME]]}
                                              id = {item.id} type={ele[DEF.P_NAME]} sid ={data.id} name={it[DEF.P_NAME]}
                                              save={this.updateConfigurableItem}/>) ||
                                          (it[DEF.P_TYPE] === DEF.T_TEXT && 
                                               <InlineText label={i18n.t('label.'+it[DEF.P_NAME])}
                                                 text={data[it[DEF.P_NAME]]}
                                                 id = {item.id} type={ele[DEF.P_NAME]} sid ={data.id} name={it[DEF.P_NAME]}
                                                 lines = {it.lines}
                                                 maxLength = {it.maxLength}
                                                 save={this.updateConfigurableItem}/>) ||
                                          (it[DEF.P_TYPE] === DEF.T_INTEGER && 
                                              <InlineSlider label={i18n.t('label.'+it[DEF.P_NAME])}
                                                 value={data[it[DEF.P_NAME]]}
                                                 id = {item.id} type={ele[DEF.P_NAME]} sid ={data.id} name={it[DEF.P_NAME]}
                                                 save={this.updateConfigurableItem}/>) ||
                                          (it[DEF.P_TYPE] === DEF.T_QUANTITY && 
                                              <InlineInteger label={i18n.t('label.'+it[DEF.P_NAME])}
                                                value={data[it[DEF.P_NAME]]}
                                                id = {item.id} type={ele[DEF.P_NAME]} sid ={data.id} name={it[DEF.P_NAME]}
                                                save={this.updateConfigurableItem}/>) ||       
                                          (it[DEF.P_TYPE] ===DEF.T_ENUM && 
                                             <InlineSelect label={i18n.t('label.'+it[DEF.P_NAME])}
                                              text ={data[it[DEF.P_NAME]]}
                                              id = {item.id} type={ele[DEF.P_NAME]} sid ={data.id} name={it[DEF.P_NAME]}
                                              placeholder = {i18n.t('label.'+it.placeholder)}
                                              data = { this.props.config.config.data[it[DEF.P_DATA_REF]]}
                                              save={this.updateConfigurableItem}/> ) ||
                                          ((it[DEF.P_TYPE] === DEF.T_DATE || it[DEF.P_TYPE] === DEF.T_TIME || it[DEF.P_TYPE] === DEF.T_DATETIME )&& 
                                            <InlineDateTimePicker label={i18n.t('label.'+it[DEF.P_NAME])}
                                              mode = {it[DEF.P_TYPE]}
                                              id = {item.id} type={ele[DEF.P_NAME]} sid ={data.id}  name={it[DEF.P_NAME]}
                                              datetime = {data[it[DEF.P_NAME]]}
                                              save ={this.updateConfigurableItem}/> ) ||
                                          (it[DEF.P_TYPE] ===DEF.T_PRICE && 
                                            <InlinePrice label={i18n.t('label.'+it[DEF.P_NAME])}
                                              value ={data[it[DEF.P_NAME]]}
                                              id = {item.id} type={ele[DEF.P_NAME]} sid ={data.id} name={it[DEF.P_NAME]}
                                             save={this.updateConfigurableItem}/> )
                                         ))
                                    
                                      ))}
                                  
                                    </View>
                                    {
                                     ( item[ele[DEF.P_NAME]].length < ele[DEF.P_LIMIT] ) &&
                                         <View style={theme.List.listsRight} >
                                          <IconBtn onPress= {()=> this.props.navigation.navigate("OptionModal",{
                                           config: ele,
                                           key: this.state.key,
                                           id: item.id,
                                            })}
                                          icon ={theme.IconBtn.addBtn}
                                         />
                                         </View>
                                    }
                                   
                                 </View>
                                  }
                                </Boxer> ) ||

                                  (ele[DEF.P_TYPE] ===DEF.T_LISTGROUP &&  Object.keys(ele[DEF.P_LIST]).length === ele[DEF.P_SIZE] &&
                                     ele[DEF.P_SUBTYPE] === DEF.T_BUSINESSHOUR &&
                                     <Boxer title={ele[DEF.P_NAME]} >
                                     {
                                     <View style={theme.List.listsContainer}>
                                      <View style={theme.List.listsLeft} >
                                        <View style={theme.List.listsTitleContainer}>
                                        <Text style ={theme.List.listsTitleText}> {i18n.t('title.'+ele[DEF.P_NAME])}</Text>
                                         </View>
                                         { ele[DEF.P_LIST].map( it => (
                                            ( Object.keys( item[ele[DEF.P_NAME]][it] ).length !== 0 &&
                                              <BusinessHoursDisplay label={i18n.t('label.'+ it)} day={ item[ele[DEF.P_NAME]][it] } /> )
                                          ))
                                         }
              
                                       </View>
                                       <View style={theme.List.listsRight} >
                                        <IconBtn onPress= {()=> this.props.navigation.navigate("DayHoursSetupModal",{
                                         config: ele,
                                         key: this.state.key,
                                         id: item.id,
                                         })}
                                        icon ={theme.IconBtn.editBtn}
                                       />
         
                                      </View>
                                    </View>
                                     }
                                   </Boxer> ) ||

                                    (ele[DEF.P_TYPE] ===DEF.T_LISTGROUP &&  Object.keys(ele[DEF.P_LIST]).length === ele[DEF.P_SIZE] &&
                                    ele[DEF.P_SUBTYPE] === DEF.T_SCHEDULEHOUR &&
                                    <Boxer title={ele[DEF.P_NAME]} >
                                    {
                                    <View style={theme.List.listsContainer}>
                                     <View style={theme.List.listsLeft} >
                                       <View style={theme.List.listsTitleContainer}>
                                       <Text style ={theme.List.listsTitleText}> {i18n.t('title.'+ele[DEF.P_NAME])}</Text>
                                        </View>
                                        { ele[DEF.P_LIST].map( it => (
                                           ( Object.keys( item[ele[DEF.P_NAME]][it] ).length !== 0 &&
                                             <ScheduleHoursDisplay label={i18n.t('label.'+ it)} day={ item[ele[DEF.P_NAME]][it] } /> )
                                         ))
                                        }
             
                                      </View>
                                      <View style={theme.List.listsRight} >
                                       <IconBtn onPress= {()=> this.props.navigation.navigate("DayHoursSetupModal",{
                                        config: ele,
                                        key: this.state.key,
                                        id: item.id,
                                        })}
                                       icon ={theme.IconBtn.editBtn}
                                      />
        
                                     </View>
                                   </View>
                                    }
                                  </Boxer> ) ||
    
                                  (ele[DEF.P_TYPE] ===DEF.T_SWITCHGROUP &&  Object.keys(ele.define).length === ele.size &&
                                    <Boxer title={ele[DEF.P_NAME]} >
                                    {
                                      ele.define.map( it => (
                                      (it[DEF.P_TYPE] ===DEF.T_BOOLEAN && 
                                          <InlineSwitch label={i18n.t('label.'+it[DEF.P_TITLE])}
                                              id = {item.id} type={ele[DEF.P_NAME]} name={it[DEF.P_NAME]}
                                              checked = {item[ele[DEF.P_NAME]][it[DEF.P_NAME]]}
                                              save ={this.updateConfigurableItem}/> ) ||
                                      (it[DEF.P_TYPE] === DEF.T_STRING && 
                                        <InlineInput label={i18n.t('label.'+it[DEF.P_NAME])}
                                          text={item[ele[DEF.P_NAME]][it[DEF.P_NAME]]}
                                          id = {item.id} type={ele[DEF.P_NAME]} name={it[DEF.P_NAME]}
                                         save={this.updateConfigurableItem}/>) ||
                                      (it[DEF.P_TYPE] === DEF.T_TEXT && 
                                          <InlineText label={i18n.t('label.'+it[DEF.P_NAME])}
                                            text={item[ele[DEF.P_NAME]][it[DEF.P_NAME]]}
                                            id = {item.id} type={ele[DEF.P_NAME]} name={it[DEF.P_NAME]}
                                            lines = {it.lines}
                                            maxLength = {it.maxLength}
                                           save={this.updateConfigurableItem}/>) ||
                                      (it[DEF.P_TYPE] === DEF.T_INTEGER && 
                                         <InlineSlider label={i18n.t('label.'+it[DEF.P_NAME])}
                                            value ={item[ele[DEF.P_NAME]][it[DEF.P_NAME]]}
                                            id = {item.id} type={ele[DEF.P_NAME]} name={it[DEF.P_NAME]}
                                           save={this.updateConfigurableItem}/>) ||
                                      (it[DEF.P_TYPE] === DEF.T_QUANTITY && 
                                          <InlineInteger label={i18n.t('label.'+it[DEF.P_NAME])}
                                            value={item[ele[DEF.P_NAME]][it[DEF.P_NAME]]}
                                             id = {item.id} type={ele[DEF.P_NAME]} name={it[DEF.P_NAME]}
                                             save={this.updateConfigurableItem}/>) ||
                                      ( (it[DEF.P_TYPE] === DEF.T_DATE || it[DEF.P_TYPE] === DEF.T_TIME || it[DEF.P_TYPE] === DEF.T_DATETIME )&& 
                                        <InlineDateTimePicker label={i18n.t('label.'+it[DEF.P_NAME])}
                                          mode = {it[DEF.P_TYPE]}
                                          id = {item.id} type={ele[DEF.P_NAME]} name={it[DEF.P_NAME]}
                                          datetime = {item[ele[DEF.P_NAME]][it[DEF.P_NAME]]}
                                          save ={this.updateConfigurableItem}/> ) ||
                                      (  it[DEF.P_TYPE] ===DEF.T_PRICE && 
                                          <InlinePrice label={i18n.t('label.'+it[DEF.P_NAME])}
                                              value ={item[ele[DEF.P_NAME]][it[DEF.P_NAME]]}
                                              id = {item.id} type={ele[DEF.P_NAME]} name={it[DEF.P_NAME]}
                                            save={this.updateConfigurableItem}/> ) 
                                        
                                      ))
                                    }
                                    </Boxer> )
                                ))
                              }
                           </View>
                        
                      </>}
                    />
                 }
                
                </>
               )}
            </ThemeConsumer>
         );
    };
}


const mapStateToProps = state =>{
    return { configurable: state.configurable, config: state.config };
};

export default connect(mapStateToProps,
    {
      getConfigurableItem,
      putConfigurableItem
    }
    )(ProfileConfigurableItemList);

 
    

/*
        { ele[DEF.P_DEFINE].map( it => (
                                          (it[DEF.P_TYPE] ===DEF.T_BOOLEAN && 
                                             <InlineSwitch label={i18n.t('label.'+it[DEF.P_NAME])}
                                              id = {item.id} type={ele[DEF.P_NAME]} name={it[DEF.P_NAME]}
                                              checked = {data[it[DEF.P_NAME]]}
                                              save ={this.updateConfigurableItem}/> ) ||
                                          (it[DEF.P_TYPE] === DEF.T_STRING && 
                                             <InlineInput label={i18n.t('label.'+it[DEF.P_NAME])}
                                              text={data[it[DEF.P_NAME]]}
                                              id = {item.id} type={ele[DEF.P_NAME]} name={it[DEF.P_NAME]}
                                              save={this.updateConfigurableItem}/>) ||
                                          (it[DEF.P_TYPE] ===DEF.T_ENUM && 
                                             <InlineSelect label={i18n.t('label.'+it[DEF.P_NAME])}
                                              text ={data[it[DEF.P_NAME]]}
                                              id = {item.id} type={ele[DEF.P_NAME]} name={it[DEF.P_NAME]}
                                              placeholder = {i18n.t('label.'+it.placeholder)}
                                              data = { this.props.config.config.data[it[DEF.P_DATA_REF]]}
                                              save={this.updateConfigurableItem}/> ) ||
                                          ((it[DEF.P_TYPE] === DEF.T_DATE || it[DEF.P_TYPE] === DEF.T_TIME || it[DEF.P_TYPE] === DEF.T_DATETIME )&& 
                                            <InlineDateTimePicker label={i18n.t('label.'+it[DEF.P_NAME])}
                                              mode = {it[DEF.P_TYPE]}
                                              id = {item.id} type={ele[DEF.P_NAME]} name={it[DEF.P_NAME]}
                                              datetime = {data[it[DEF.P_NAME]]}
                                              save ={this.updateConfigurableItem}/> ) ||
                                          (it[DEF.P_TYPE] ===DEF.T_PRICE && 
                                            <InlinePrice label={i18n.t('label.'+it[DEF.P_NAME])}
                                              value ={data[it[DEF.P_NAME]]}
                                              id = {item.id} type={ele[DEF.P_NAME]} name={it[DEF.P_NAME]}
                                             save={this.updateConfigurableItem}/> )
                                         ))
                                      }



*/