import React, {Component}  from 'react';
import { ScrollView, FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import { Button, ThemeConsumer, ButtonGroup } from 'react-native-elements';
import {Icon} from 'react-native-vector-icons/Ionicons';

import { 
    getMenuCategory,
    putMenuCategory
} from '../../action/commAction/MenuAction';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import i18n from '../../i18n/i18n';
import { ADDCATEGORY,
   T_STRING,
   T_ENUM,
   } from '../../constant';
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


class ProfileMenuCategoryList extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
        this.updateMenuCategory = this.updateMenuCategory.bind();
    }


    componentDidMount = async () =>{
        await this.props.getMenuCategory();
    }

    updateMenuCategory = (id, type, sid, name, value) => {
     
      from(this.props.menu.categories)
      .pipe(
        filter( item => item.id === id),
      ).subscribe(
        item =>{
            this.props.putMenuCategory(Object.assign({}, item, { [name]: value}));
        }
      );
    }

    render (){
       const title = this.props.route.params.name +"."+ i18n.t('label.category');
     
        return (
            <ThemeConsumer>
                {({theme}) => (
                 <>
                 <TitleWithBtn title ={title}
                  onPress= {()=> this.props.navigation.navigate("MenuModal",{
                      cmd: ADDCATEGORY,
                      name: this.props.route.params.name
                       })}
                  icon={theme.IconBtn.listaddBtn}
                  ></TitleWithBtn>
                  
                   <FlatList
                      data = {this.props.menu.categories}
                      keyExtractor = {item =>item.id} 
                      renderItem= {({item}) => <>
                         <View style={theme.List.listsContainer} >
                             <View style ={theme.List.listsLeft}>
                             {           
                                this.props.config.config.category.map(ele => (
                                               
                                  (ele.type ===T_STRING && 
                                      <InlineInput label={i18n.t('label.'+ele.name)}
                                          text={item[ele.name]}
                                          id = {item.id} name={ele.name}
                                         save={this.updateMenuCategory}/>) ||
                                  (ele.type ===T_ENUM && 
                                       <InlineSelect label={i18n.t('label.'+ele.name)}
                                          text={item[ele.name]}
                                          id = {item.id}  name={ele.name}
                                          placeholder = {i18n.t('label.'+ele.placeholder)}
                                          data = { this.props.config.config.data[ele.data_ref]}
                                          save={this.updateMenuCategory}/> )
                                ) )
                              }
                              </View>
                              <View style ={theme.List.listsRight}>
                                  <IconBtn onPress= {()=> this.props.navigation.navigate("ProfileMenuItem",{
                                     name: this.props.route.params.name,
                                     category: item.name,
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
    return { menu: state.menu, config: state.config };
};

export default connect(mapStateToProps,
    {
      getMenuCategory,
      putMenuCategory
    }
    )(ProfileMenuCategoryList);
