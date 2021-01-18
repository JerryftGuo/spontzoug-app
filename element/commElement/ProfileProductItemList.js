import React, {Component}  from 'react';
import { ScrollView, FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import { Button, ThemeConsumer, ButtonGroup } from 'react-native-elements';
import {Icon} from 'react-native-vector-icons/Ionicons';

import { 
    getProductItem,
    putProductItem
} from '../../action/commAction/ProductAction';
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
} from '../basic/inlineElement';
 import {
   IconBtn,
   RegularBtn,
   Boxer,
   DatesSetter,
   Title,
   TitleWithBtn
 } from '../basic';

import { from, pipe } from 'rxjs';
import { filter,reduce, isEmpty} from 'rxjs/operators';
import { COLOR_DATA } from '../../modal/selectData';
import { ThemeColors } from 'react-navigation';
import { SwitchWrapper } from '../basic/wrapperElement';


class ProfileProductItemList extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
        this.updateProductItem = this.updateProductItem.bind();
    }


    componentDidMount = async () =>{
        await this.props.getProductItem();
    }

    updateProductItem = (id, type, sid, name, value) => {
      from(this.props.product.items)
      .pipe(
        filter( item => item.id === id),
      ).subscribe(
        item =>{
          if( type === 'root' ){
            this.props.putProductItem(Object.assign({}, item, { [name]: value})); 
          } else {
            this.props.putProductItem(Object.assign({}, item,
              { [type]:{
                ...item[type],
                [name]: value}
             }));
          }
        }
      );
    }

    render (){
       const {name} = this.props.route.params;
       let ttl = this.props.route.params.name +'.'+ this.props.route.params.category;
       return (
            <ThemeConsumer>
                {({theme}) => (
                 <>
                 <TitleWithBtn title ={ttl}
                  onPress= {()=> this.props.navigation.navigate("ProductModal",{
                      cmd: DEF.ADDITEM,
                      name: this.props.route.params.name,
                      category: this.props.route.params.category
                       })}
                  icon={theme.IconBtn.listaddBtn}
                />
            
           
                   <FlatList
                      data = {this.props.product.items}
                      keyExtractor = {item =>item.id}
                      renderItem= {({item}) => <>
                         <View style={theme.List.container} >
                             <Title text={item.name} />
                             {            
                                this.props.config.config.item.menu.map(ele => (
                                  (ele[DEF.P_TYPE] === DEF.T_IMAGE &&
                                    <InlineImage 
                                      images = {item[ele[DEF.P_NAME]]}
                                      config = {ele}
                                      id = {item.id} type='root' name={ele[DEF.P_NAME]}
                                      save={this.updateProductItem}/>) ||
        
                                  (ele[DEF.P_TYPE] ===DEF.T_STRING &&
                                      <InlineInput label={i18n.t('label.'+ele[DEF.P_NAME])}
                                          text={item[ele[DEF.P_NAME]]}
                                          id = {item.id} type='root' name={ele[DEF.P_NAME]}
                                         save={this.updateProductItem}/>) ||
                                  (ele[DEF.P_TYPE] ===DEF.T_TEXT &&
                                      <InlineText label={i18n.t('label.'+ele[DEF.P_NAME])}
                                          text={item[ele[DEF.P_NAME]]}
                                          id = {item.id} type='root' name={ele[DEF.P_NAME]}
                                          lines = {ele.lines}
                                          maxLength = {ele.maxLength}
                                          save={this.updateProductItem}/>) ||
                                  (ele[DEF.P_TYPE] ===DEF.T_ENUM && 
                                      <InlineSelect label={i18n.t('label.'+ele[DEF.P_NAME])}
                                          text={item[ele[DEF.P_NAME]]}
                                          id = {item.id} type='root' name={ele[DEF.P_NAME]}
                                          placeholder = {i18n.t('label.'+ele.placeholder)}
                                          data = { this.props.config.config.data[ele.data_ref]}
                                          save={this.updateProductItem}/> ) ||
                                  (ele[DEF.P_TYPE] ===DEF.T_BOOLEAN && 
                                      <InlineSwitch label={i18n.t('label.'+ele[DEF.P_NAME])}
                                          id = {item.id} type='root' name={ele[DEF.P_NAME]}
                                          checked = {item[ele[DEF.P_NAME]]}
                                          save ={this.updateProductItem}/> ) ||
                                  (ele[DEF.P_TYPE] ===DEF.T_PRICE && 
                                    <InlinePrice label={i18n.t('label.'+ele[DEF.P_NAME])}
                                       value ={item[ele[DEF.P_NAME]]}
                                      id = {item.id} type='root' name={ele[DEF.P_NAME]}
                                      save={this.updateProductItem}/> ) ||
                                  ( ( ele[DEF.P_TYPE] ===DEF.T_DATE || ele[DEF.P_TYPE] === DEF.T_TIME || ele[DEF.P_TYPE] === DEF.T_DATETIME) &&
                                    <InlineDateTimePicker label ={i18n.t('label.'+ele[DEF.P_NAME])}
                                    id = {item.id} type='root' name={ele[DEF.P_NAME]}
                                    mode = {ele[DEF.P_TYPE]}
                                    datetime = {item[ele[DEF.P_NAME]]}
                                    save = {this.updateProductItem} /> ) ||
                      
                                     
                                  (ele[DEF.P_TYPE] ===DEF.T_GROUP &&  Object.keys(ele.define).length === ele.size &&
                                    <Boxer title={ele[DEF.P_NAME]} >
                                    {
                                      ele.define.map( it => (
                                      (it[DEF.P_TYPE] ===DEF.T_BOOLEAN && 
                                          <InlineSwitch label={i18n.t('label.'+it[DEF.P_NAME])}
                                              id = {item.id} type={ele[DEF.P_NAME]} name={it[DEF.P_NAME]}
                                              checked = {item[ele[DEF.P_NAME]][it[DEF.P_NAME]]}
                                              save ={this.updateProductItem}/> ) ||
                                      (it[DEF.P_TYPE] === DEF.T_STRING && 
                                        <InlineInput label={i18n.t('label.'+it[DEF.P_NAME])}
                                          text={item[ele[DEF.P_NAME]][it[DEF.P_NAME]]}
                                          id = {item.id} type={item[ele[DEF.P_NAME]]} name={it[DEF.P_NAME]}
                                         save={this.updateProductItem}/>) ||
                                      ( (it[DEF.P_TYPE] === DEF.T_DATE || it[DEF.P_TYPE] === DEF.T_TIME || it[DEF.P_TYPE] === DEF.T_DATETIME )&& 
                                        <InlineDateTimePicker label={i18n.t('label.'+it[DEF.P_NAME])}
                                          mode = {it[DEF.P_TYPE]}
                                          id = {item.id} type={ele[DEF.P_NAME]} name={it[DEF.P_NAME]}
                                          datetime = {item[ele[DEF.P_NAME]][it[DEF.P_NAME]]}
                                          save ={this.updateProductItem}/> ) ||
                                      (  it[DEF.P_TYPE] ===DEF.T_PRICE && 
                                          <InlinePrice label={i18n.t('label.'+it[DEF.P_NAME])}
                                              value ={item[ele[DEF.P_NAME]][it[DEF.P_NAME]]}
                                              id = {item.id} type={ele[DEF.P_NAME]} name={it[DEF.P_NAME]}
                                            save={this.updateProductItem}/> ) 
                                        
                                      ))
                                    }
                                    </Boxer> )
                        
                                     
                                ) )
                              }
                              </View>
                        
                      </>}
                    />
                    <View style ={theme.btnBox}>
                         <RegularBtn onPress= {()=> this.props.navigation.navigate("ProfileProductEditor",{
                             type: DEF.ADDCATEGORY,
                             category: this.props.route.params
                           })}
                           title={i18n.t('button.additem')}
                          />
                    </View>
                </>
               )}
            </ThemeConsumer>
         );
    };
}


const mapStateToProps = state =>{
    return { product: state.product, config: state.config };
};

export default connect(mapStateToProps,
    {
      getProductItem,
      putProductItem
    }
    )(ProfileProductItemList);

 
    