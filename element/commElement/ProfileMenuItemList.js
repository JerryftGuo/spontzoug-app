import React, {Component}  from 'react';
import { ScrollView, FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import { Button, ThemeConsumer, ButtonGroup } from 'react-native-elements';
import {Icon} from 'react-native-vector-icons/Ionicons';

import { 
    getMenuItem,
    putMenuItem
} from '../../action/commAction/MenuAction';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import i18n from '../../i18n/i18n';
import { ADDCATEGORY,
   ADDITEM,
   ADDOPTION,
   T_STRING,
   T_ENUM,
   T_BOOLEAN,
   T_PRICE,
   T_ARRAY,
   T_IMAGE,
   T_GROUP,
   T_DATE,
   T_TIME,
   T_DATETIME,
   T_TEXT,
   } from '../../constant';
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


class ProfileMenuItemList extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
        this.updateMenuItem = this.updateMenuItem.bind();
    }


    componentDidMount = async () =>{
        await this.props.getMenuItem();
    }

    updateMenuItem = (id, type, sid, name, value) => {
      from(this.props.menu.items)
      .pipe(
        filter( item => item.id === id),
      ).subscribe(
        item =>{
          if( type === 'root' ){
            this.props.putMenuItem(Object.assign({}, item, { [name]: value})); 
          } else {
            this.props.putMenuItem(Object.assign({}, item,
              { [type]:{
                ...item[type],
                [name]: value}
             }));
          }
        }
      );
    }

    render (){
       let ttl = this.props.route.params.name +'.'+ this.props.route.params.category;
       return (
            <ThemeConsumer>
                {({theme}) => (
                 <>
                 <TitleWithBtn title ={ttl}
                  onPress= {()=> this.props.navigation.navigate("MenuModal",{
                      cmd: ADDITEM,
                      name: this.props.route.params.name,
                      category: this.props.route.params.category
                       })}
                  icon={theme.IconBtn.listaddBtn}
                />
            
           
                   <FlatList
                      data = {this.props.menu.items}
                      keyExtractor = {item =>item.id}
                      renderItem= {({item}) => <>
                         <View style={theme.List.container} >
                             <Title text={item.name} />
                             {            
                                this.props.config.config.item.menu.map(ele => (
                                  (ele.type === T_IMAGE &&
                                    <InlineImage 
                                      images = {item[ele.name]}
                                      config = {ele}
                                      id = {item.id} type='root' name={ele.name}
                                      save={this.updateMenuItem}/>) ||
        
                                  (ele.type ===T_STRING &&
                                      <InlineInput label={i18n.t('label.'+ele.name)}
                                          text={item[ele.name]}
                                          id = {item.id} type='root' name={ele.name}
                                         save={this.updateMenuItem}/>) ||
                                  (ele.type ===T_TEXT &&
                                      <InlineText label={i18n.t('label.'+ele.name)}
                                          text={item[ele.name]}
                                          id = {item.id} type='root' name={ele.name}
                                          lines = {ele.lines}
                                          maxLength = {ele.maxLength}
                                          save={this.updateMenuItem}/>) ||
                                  (ele.type ===T_ENUM && 
                                      <InlineSelect label={i18n.t('label.'+ele.name)}
                                          text={item[ele.name]}
                                          id = {item.id} type='root' name={ele.name}
                                          placeholder = {i18n.t('label.'+ele.placeholder)}
                                          data = { this.props.config.config.data[ele.data_ref]}
                                          save={this.updateMenuItem}/> ) ||
                                  (ele.type ===T_BOOLEAN && 
                                      <InlineSwitch label={i18n.t('label.'+ele.name)}
                                          id = {item.id} type='root' name={ele.name}
                                          checked = {item[ele.name]}
                                          save ={this.updateMenuItem}/> ) ||
                                  (ele.type ===T_PRICE && 
                                    <InlinePrice label={i18n.t('label.'+ele.name)}
                                       value ={item[ele.name]}
                                      id = {item.id} type='root' name={ele.name}
                                      save={this.updateMenuItem}/> ) ||
                                  ( ( ele.type ===T_DATE || ele.type === T_TIME || ele.type === T_DATETIME) &&
                                    <InlineDateTimePicker label ={i18n.t('label.'+ele.name)}
                                    id = {item.id} type='root' name={ele.name}
                                    mode = {ele.type}
                                    datetime = {item[ele.name]}
                                    save = {this.updateMenuItem} /> ) ||
                      
                                     
                                  (ele.type ===T_GROUP &&  Object.keys(ele.define).length === ele.size &&
                                    <Boxer title={ele.name} >
                                    {
                                      ele.define.map( it => (
                                      (it.type ===T_BOOLEAN && 
                                          <InlineSwitch label={i18n.t('label.'+it.name)}
                                              id = {item.id} type={ele.name} name={it.name}
                                              checked = {item[ele.name][it.name]}
                                              save ={this.updateMenuItem}/> ) ||
                                      (it.type === T_STRING && 
                                        <InlineInput label={i18n.t('label.'+it.name)}
                                          text={item[ele.name][it.name]}
                                          id = {item.id} type={item[ele.name]} name={it.name}
                                         save={this.updateMenuItem}/>) ||
                                      ( (it.type === T_DATE || it.type === T_TIME || it.type === T_DATETIME )&& 
                                        <InlineDateTimePicker label={i18n.t('label.'+it.name)}
                                          mode = {it.type}
                                          id = {item.id} type={ele.name} name={it.name}
                                          datetime = {item[ele.name][it.name]}
                                          save ={this.updateMenuItem}/> ) ||
                                      (  it.type ===T_PRICE && 
                                          <InlinePrice label={i18n.t('label.'+it.name)}
                                              value ={item[ele.name][it.name]}
                                              id = {item.id} type={ele.name} name={it.name}
                                            save={this.updateMenuItem}/> ) 
                                        
                                      ))
                                    }
                                    </Boxer> )
                        
                                     
                                ) )
                              }
                              </View>
                        
                      </>}
                    />
                    <View style ={theme.btnBox}>
                         <RegularBtn onPress= {()=> this.props.navigation.navigate("ProfileMenuEditor",{
                             type: ADDCATEGORY,
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
    return { menu: state.menu, config: state.config };
};

export default connect(mapStateToProps,
    {
      getMenuItem,
      putMenuItem
    }
    )(ProfileMenuItemList);

    /*
 <InlineSwitch label={i18n.t('label.'+ele.define[0].name)}
                                          id = {item.id}  type={ele.name} name={ele.define[0].name}
                                          checked = {item[ele.name][ele.define[0].name]}
                                          save ={this.updateMenuItem}/>
                                    <DatesSetter start = {item[ele.name][ele.define[1].name]}
                                          id = {item.id}  type={ele.name}
                                          end = {item[ele.name][ele.define[2].name]}
                                          startName = {ele.define[1].name}
                                          endName = {ele.define[2].name}
                                          save ={this.updateMenuItem} />
                                    <InlinePrice label={i18n.t('label.'+ele.define[3].name)}
                                      id = {item.id}  type={ele.name} name={ele.define[3].name}
                                       value ={item[ele.name][ele.define[3].name]}
                                       save={this.updateMenuItem}/>      

    <IconBtn onPress= {()=> this.props.navigation.navigate("ProfileMenuEditor",{
      type: ADDCATEGORY,
      category: this.props.route.params.category
    })}
    icon={theme.IconBtn.addBtn}
   />
   */