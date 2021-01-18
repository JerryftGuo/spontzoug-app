import React, {Component}  from 'react';
import { ScrollView, FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import { Button, ThemeConsumer, ButtonGroup } from 'react-native-elements';
import {Icon} from 'react-native-vector-icons/Ionicons';

import { 
    getProductCategory,
    putProductCategory
} from '../../action/commAction/ProductAction';
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


class ProfileProductCategoryList extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
        this.updateProductCategory = this.updateProductCategory.bind();
    }


    componentDidMount = async () =>{
        await this.props.getProductCategory();
    }

    updateProductCategory = (id, type, sid, name, value) => {
     
      from(this.props.menu.categories)
      .pipe(
        filter( item => item.id === id),
      ).subscribe(
        item =>{
            this.props.putProductCategory(Object.assign({}, item, { [name]: value}));
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
                  onPress= {()=> this.props.navigation.navigate("ProductModal",{
                      cmd: ADDCATEGORY,
                      name: this.props.route.params.name
                       })}
                  icon={theme.IconBtn.listaddBtn}
                  ></TitleWithBtn>
                  
                   <FlatList
                      data = {this.props.product.categories}
                      keyExtractor = {item =>item.id} 
                      renderItem= {({item}) => <>
                         <View style={theme.List.listsContainer} >
                             <View style ={theme.List.listsLeft}>
                             {           
                                this.props.config.config.category.map(ele => (
                                               
                                  (ele[DEF.P_TYPE] === DEF.T_STRING && 
                                      <InlineInput label={i18n.t('label.'+ele[DEF.P_NAME])}
                                          text={item[ele[DEF.P_NAME]]}
                                          id = {item.id} name={ele[DEF.P_NAME]}
                                         save={this.updateProductCategory}/>) ||
                                  (ele[DEF.P_TYPE] === DEF.T_ENUM && 
                                       <InlineSelect label={i18n.t('label.'+ele[DEF.P_NAME])}
                                          text={item[ele[DEF.P_NAME]]}
                                          id = {item.id}  name={ele[DEF.P_NAME]}
                                          placeholder = {i18n.t('label.'+ele.placeholder)}
                                          data = { this.props.config.config.data[ele.data_ref]}
                                          save={this.updateProductCategory}/> )
                                ) )
                              }
                              </View>
                              <View style ={theme.List.listsRight}>
                                  <IconBtn onPress= {()=> this.props.navigation.navigate("ProfileProductItem",{
                                     name: this.props.route.params.name,
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
    return { product: state.product, config: state.config };
};

export default connect(mapStateToProps,
    {
      getProductCategory,
      putProductCategory
    }
    )(ProfileProductCategoryList);
