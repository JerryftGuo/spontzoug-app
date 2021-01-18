import React, {Component}  from 'react';
import { ScrollView, FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import { Button, ListItem, ThemeConsumer, ButtonGroup } from 'react-native-elements';
import {Icon} from 'react-native-vector-icons/Ionicons';

import { 
    getService,
    putService
} from '../../action/commAction/ServiceAction';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import i18n from '../../i18n/i18n';
import { ADDSERVICE, ADDOPTION } from '../../constant';
import { InlineInput,
  InlineSlider,
  InlineSelect,
  InlinePrice
 } from '../basic/inlineElement';
 import {
   RegularBtn,
   IconBtn,
 } from '../basic';

 import { arrayReplace } from '../../utils';

import { from, pipe } from 'rxjs';
import { filter,reduce, isEmpty} from 'rxjs/operators';
import { COLOR_DATA } from '../../modal/selectData';


class ProfileServiceList extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
        this.updateService = this.updateService.bind();
    }


    componentDidMount = async () =>{
        await this.props.getService();
    }

    updateService = (id, type, sid, name, value) => {
     
      from(this.props.service.services)
      .pipe(
        filter( item => item.id === id),
      ).subscribe(
        item =>{
          if( type === 'root' ){
            this.props.putService(Object.assign({}, item, { [name]: value}));
          } else if ( type === 'options'){
             let newopts = arrayReplace(item.options, sid, name, value)
            this.props.putService(Object.assign({}, item,
               { options: newopts}
               ));
          } else if ( type === 'sale'){
            this.props.putService(Object.assign({}, item,
              { sale:{
                ...item.sale,
                [name]: value}
             }));
          }
        }
      );
    }

    render (){
        return (
            <ThemeConsumer>
                {({theme}) => (
                <>
               <FlatList
                  data = {this.props.service.services}
                  keyExtractor = { (item) => item.id}
                  renderItem = {
                      ({item}) =><>
                       <View style={theme.List.titleContainer}>
                        <Text style ={theme.List.titleText}> {item.name}</Text>
                       </View>
                       <View style={theme.List.container}>
                          <InlineInput label={i18n.t('label.name')}
                             text={item.name}
              
                             id = {item.id} type='root' name='name'
                             save={this.updateService}/>
                          <InlineSelect label={i18n.t('label.color')}
                             text={item.color}
                             id = {item.id} type='root' name='color'
                             placeholder = {i18n.t('label.color')}
                             data = { COLOR_DATA }
                             save={this.updateService}/>
                          <InlineInput label={i18n.t('label.description')}
                             text={item.description} multiline
                             maxLength = {theme.InlineEdit.maxLength2k}
                             id = {item.id} type='root' name='description'
                             save={this.updateService}/>
                        </View>
                        <View style={theme.List.listsContainer}>
                          <View style={theme.List.listsLeft} >
                           <View style={theme.List.listsTitleContainer}>
                           <Text style ={theme.List.listsTitleText}> {i18n.t('title.option')}</Text>
                           </View>
                          {
                            item.options.map( (opt,idx) => (
                            <ThemeConsumer>
                            {({ theme })  => (
                                <ListItem 
                                    key = {opt.option} 
                                    leftElement = {
                                      <View style={theme.List.listsListContainer}>
                                      <InlineInput label={i18n.t('label.option')}
                                       text={opt.option}
                                      id = {item.id} type='options' sid ={opt.id} name='option'
                                      save={this.updateService}/>
                                      <InlineSlider label ={i18n.t('label.duration')}
                                       value = {opt.duration }
                                       id = {item.id} type='options' sid ={opt.id} name='duration'
                                       onValueChange = {this.durationChange}
                                       save={this.updateService}/>
                                                  
                                      <InlinePrice label={i18n.t('label.price')}
                                       value ={opt.price}
                                      id = {item.id} type='options' sid={opt.id } name='price'
                                      save={this.updateService}/>
                                      </View>   
                                    }                                      
                                    containerStyle ={{flex:1, margin:1, padding:2}}
                                    contentContainerStyle={{flex:0}}
                                    bottomDivider
                                    checkmark = {false}
                                />
                            )}
                            </ThemeConsumer>
                            )) 
                        }
                             
                          </View>
                         <View style={theme.List.listsRight} >
                           <IconBtn onPress= {()=> this.props.navigation.navigate("ServiceModal",{
                               type: ADDOPTION
                           })}
                            icon={theme.IconBtn.addBtn}
                           />

                         </View>
                       </View>
                       </>
                  }
                 
                  ListFooterComponent ={
                    <View style={theme.btnBox} >
                    <RegularBtn onPress= {()=> this.props.navigation.navigate("ServiceModal",{
                        type: ADDSERVICE
                    })}
                     title={i18n.t('button.addservice')} />
                     </View>
                  }
                />
                </>
               )}
            </ThemeConsumer>
          
         );
    };
}


const mapStateToProps = state =>{
    return { service: state.service };
};

export default connect(mapStateToProps,
    {
      getService,
      putService
    }
    )(ProfileServiceList); 

   