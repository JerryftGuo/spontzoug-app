import React, {Component}  from 'react';
import { ScrollView, FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import { Button, ThemeConsumer, ButtonGroup } from 'react-native-elements';
import {Icon} from 'react-native-vector-icons/Ionicons';

import { 
    getConfigurableCategory,
    putConfigurableCategory
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
   TitleWithBtn
 } from '../basic';

import { from, pipe } from 'rxjs';
import { filter,reduce, isEmpty} from 'rxjs/operators';
import { COLOR_DATA } from '../../modal/selectData';
import { ThemeColors } from 'react-navigation';


class ProfileConfigurableCategoryList extends Component {
    constructor(props){
        super(props);
        this.state = {
            key: this.props.route.params.key,
        }
        this.updateConfigurableCategory = this.updateConfigurableCategory.bind();
    }


    componentDidMount = async () =>{
//        this.props.getConfigurableCategory &&
//        await this.props.getConfigurableCategory(this.state.key);
    }

    updateConfigurableCategory = (id, type, sid, name, value) => {
     
      from(this.props.configurable.categories[this.state.key])
      .pipe(
        filter( item => item.id === id),
      ).subscribe(
        item =>{
            if( type === 'root' ){
                this.props.putConfigurableCategory(this.state.key, Object.assign({}, item, { [name]: value})); 
              } else {
                this.props.putConfigurableCategory(this.state.key, Object.assign({}, item,
                  { [type]:{
                    ...item[type],
                    [name]: value}
                 }));
             }
        }
      );
    }

    render (){
        const { title, key  } = this.props.route.params;
       const ttl = key +"."+ i18n.t('title.'+( this.props.config.config.category[key].title || 'category'));
     
        return (
            <ThemeConsumer>
                {({theme}) => (
                 <>

                { this.props.configurable.categories[key].length <this.props.config.config.keys.filter( item => item.name === key)[0].categoryLimit &&
                 <TitleWithBtn title ={ttl}
                  onPress= {()=> this.props.navigation.navigate("ConfigurableModal",{
                      cmd: DEF.ADDCATEGORY,
                      key: key,
                    })}
                  icon={theme.IconBtn.listaddBtn}
                />
                }
                { this.props.configurable.categories[key].length === this.props.config.config.keys.filter( item => item.name === key)[0].categoryLimit &&
                 <Title title ={ttl}  />
                }
                  
                   <FlatList
                      data = {this.props.configurable.categories[key]}
                      keyExtractor = {item =>item.id} 
                      renderItem= {({item}) => <>
                         <View style={theme.List.listsContainer} >
                             <View style ={theme.List.listsLeft}>
                             {           
                                this.props.config.config.category[key][DEF.P_DEFINE].map(ele => (
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
                                          data = { this.props.config.config.data[ele[DEF.P_DATA_REF]]}
                                          save={this.updateConfigurableCategory}/> )
                                ) )
                              }
                              </View>
                              <View style ={theme.List.listsRight}>
                                  <IconBtn onPress= {()=> this.props.navigation.navigate("ProfileConfigurableItem",{
                                     key: key,
                                     category: item[DEF.P_NAME],
                                     })}
                                      icon={theme.IconBtn.navigaterightBtn}
                                  />
                              </View>
                          </View>
                      </>}
                    />
                   
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
      putConfigurableCategory
    }
    )(ProfileConfigurableCategoryList);
