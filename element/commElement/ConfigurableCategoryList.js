import React, {Component}  from 'react';
import { ScrollView, FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import { Button, ThemeConsumer, ButtonGroup, ListItem } from 'react-native-elements';
import {Icon} from 'react-native-vector-icons/Ionicons';

import { 
    getConfigurableCategory,
} from '../../action/commAction/ConfigurableAction';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import i18n from '../../i18n/i18n';
import * as DEF from '../../constant';
import { InlineInput,
  InlineSelect,
 } from '../basic/inlineElement';
 import {
   IconBtn,
   RegularBtn,
   TitleWithBtn,
   Title
 } from '../basic';

import { from, pipe } from 'rxjs';
import { filter,reduce, isEmpty} from 'rxjs/operators';
import { COLOR_DATA } from '../../modal/selectData';
import { ThemeColors } from 'react-navigation';


class ConfigurableCategoryList extends Component {
    constructor(props){
        super(props);
        this.state = {
            key: 'menu'
        }
        this.updateConfigurableCategory = this.updateConfigurableCategory.bind();
    }


    componentDidMount = async () =>{
        await this.props.getConfigurableCategory(this.state.key);
    }

    updateConfigurableCategory = (id, type, sid, name, value) => {
     
      from(this.props.configurable.categories[this.state.key])
      .pipe(
        filter( item => item.id === id),
      ).subscribe(
        item =>{
            if( type === 'root' ){
                this.props.putConfigurableItem(this.state.key, Object.assign({}, item, { [name]: value})); 
              } else {
                this.props.putConfigurableItem(this.state.key, Object.assign({}, item,
                  { [type]:{
                    ...item[type],
                    [name]: value}
                 }));
             }
        }
      );
    }

    render (){

       const ttl = this.state.key +"."+ i18n.t('label.category');
console.warn('category:' + JSON.stringify( this.props.configurable.categories));
        return (
            <ThemeConsumer>
                {({theme}) => (
                 <>
                 <Title title ={ttl}
                 
                  ></Title>
                  
                {
                    this.props.configurable.categories.menu.map( (item, idx) =>(
                        <ListItem 
                            key={idx}
                            title = {item.name}
                            leftAvatar = {  {source: {uri: 'https://unsplash.it/400/400?image=1'}}}
                            bottomDivider
                            chevron
                        />
                    ))
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
      getConfigurableCategory,
    }
    )(ConfigurableCategoryList);

/*
    this.props.config.config.category.map(ele => (
        (ele[DEF.P_TYPE] === DEF.T_IMAGE &&
            <InlineImage 
              images = {item[ele[DEF.P_NAME]]}
              config = {ele}
              id = {item.id} type='root' name={ele[DEF.P_NAME]}
              save={this.updateConfigurableCategory}/>) ||

      (ele[DEF.P_TYPE] === DEF.T_STRING && 
          <InlineInput label={i18n.t('label.'+ele[DEF.P_NAME])}
              text={item[ele[DEF.P_NAME]]}
              id = {item.id} name={ele[DEF.P_NAME]}
             save={this.updateConfigurableCategory}/>) ||
      (ele[DEF.P_TYPE] ===DEF.T_BOOLEAN && 
                <InlineSwitch label={i18n.t('label.'+ele[DEF.P_NAME])}
                    id = {item.id} type='root' name={ele[DEF.P_NAME]}
                    checked = {item[ele[DEF.P_NAME]]}
                    save ={this.updateConfigurableCategory}/> ) ||
      (ele[DEF.P_TYPE] === DEF.T_ENUM && 
           <InlineSelect label={i18n.t('label.'+ele[DEF.P_NAME])}
              text={item[ele[DEF.P_NAME]]}
              id = {item.id}  name={ele[DEF.P_NAME]}
              placeholder = {i18n.t('label.'+ele.placeholder)}
              data = { this.props.config.config.data[ele.data_ref]}
              save={this.updateConfigurableCategory}/> )
    ) )
    */