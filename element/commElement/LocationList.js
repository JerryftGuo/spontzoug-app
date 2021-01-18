import React, {Component}  from 'react';
import { ScrollView, FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import { ListItem, ThemeConsumer, ButtonGroup } from 'react-native-elements';
import {Icon} from 'react-native-vector-icons/Ionicons';

import { 
    getLocation,
    putLocation
} from '../../action/commAction/LocationAction';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import i18n from '../../i18n/i18n';
import { ADDADDRESS, EDITHOURS } from '../../constant';
import { InlineInput,
  InlineSelect
 } from '../basic/inlineElement';
 import { IconBtn,
  RegularBtn
} from '../basic';

import { from, pipe } from 'rxjs';
import { filter,reduce, isEmpty} from 'rxjs/operators';
import { PROVINCE_DATA } from '../../modal/selectData';
import { BusinessHoursDisplay } from '../basic/basicElement';

class LocationList extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
        this.updateLocation = this.updateLocation.bind();
    }

    componentDidMount = async () =>{
        await this.props.getLocation();
    }

    updateLocation = (id, type, name, value) => {
      from(this.props.location.locations)
      .pipe(
        filter( item => item.id === id),
      ).subscribe(
        item =>{
          if( type === 'root' ){
            this.props.putLocation(Object.assign({}, item, { [name]: value}));
          } else if ( type === 'address'){
            this.props.putLocation(Object.assign({}, item,
               { address:{
                 ...item.address,
                 [name]: value}
              }));
          } else if ( type === 'hours'){
            this.props.putLocation(Object.assign({}, item,
              { hours:{
                ...item.hours,
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
                  data = {this.props.location.locations}
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
                             save={this.updateLocation}/>
                          <InlineInput label={i18n.t('label.street')}
                             text={item.address.street}
                             id = {item.id} type='address' name='street'
                             save={this.updateLocation}/>
                          <InlineInput label={i18n.t('label.city')}
                             text={item.address.city}
                             id = {item.id} type='address' name='city'
                             save={this.updateLocation}/>
                          <InlineSelect label={i18n.t('label.province')}
                             text={item.address.province}
                             id = {item.id} type='address' name='province'
                             placeholder = {i18n.t('label.province')}
                             data = { PROVINCE_DATA }
                             save={this.updateLocation}/>
                          <InlineInput label={i18n.t('label.postcode')}
                             text={item.address.postcode}
                             id = {item.id} type='address' name='postcode'
                             save={this.updateLocation}/>
                          <InlineInput label={i18n.t('label.phone')}
                             text={item.phone}
                             id = {item.id} type='root' name='phone'
                             save={this.updateLocation}/>
                      
                        </View>
                        <View style={theme.List.listsContainer}>
                          <View style={theme.List.listsLeft} >
                           <View style={theme.List.listsTitleContainer}>
                           <Text style ={theme.List.listsTitleText}> {i18n.t('title.hours')}</Text>
                           </View>
                            { Object.keys(item.hours.sun).length !== 0 &&
                               <BusinessHoursDisplay label={i18n.t('label.sun')} day={item.hours.sun} /> }
                            { Object.keys(item.hours.mon).length !== 0 &&
                               <BusinessHoursDisplay label={i18n.t('label.mon')} day={item.hours.mon} /> }
                             { Object.keys(item.hours.tue).length !== 0 &&
                               <BusinessHoursDisplay label={i18n.t('label.tue')} day={item.hours.tue} /> }
                             { Object.keys(item.hours.wed).length !== 0 &&
                               <BusinessHoursDisplay label={i18n.t('label.wed')} day={item.hours.wed} /> }
                             { Object.keys(item.hours.thu).length !== 0 &&
                               <BusinessHoursDisplay label={i18n.t('label.thu')} day={item.hours.thu} /> }
                             { Object.keys(item.hours.fri).length !== 0 &&
                               <BusinessHoursDisplay label={i18n.t('label.fri')} day={item.hours.fri} /> }
                             { Object.keys(item.hours.sat).length !== 0 &&
                               <BusinessHoursDisplay label={i18n.t('label.sat')} day={item.hours.sat} /> }
                             { Object.keys(item.hours.holiday).length !== 0 &&
                               <BusinessHoursDisplay label={i18n.t('label.holiday')} day={item.hours.holiday} /> }
                             
                          </View>
                         <View style={theme.List.listsRight} >
                           <IconBtn onPress= {()=> this.props.navigation.navigate("LocationModal",{
                               type: EDITHOURS
                           })}
                            icon ={theme.IconBtn.editBtn}
                            />

                         </View>
                       </View>
                       </>
                  }
                 
                  ListFooterComponent ={
                    <View style={theme.btnBox} >
                    <RegularBtn onPress= {()=> this.props.navigation.navigate("LocationModal",{
                        type: ADDADDRESS
                    })}
                     title={i18n.t('button.addaddress')} />
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
    return { location: state.location };
};

export default connect(mapStateToProps,
    {
      getLocation,
      putLocation
    }
    )(LocationList); 

    /*
    <Text style={theme.listContentText}> {i18n.t('label.mon')} {item.hours.mon}</Text>
                             <Text style={theme.listContentText}> {i18n.t('label.tue')} {item.hours.tue}</Text>
                             <Text style={theme.listContentText}> {i18n.t('label.wed')} {item.hours.wed}</Text>
                             <Text style={theme.listContentText}> {i18n.t('label.thu')} {item.hours.thu}</Text>
                             <Text style={theme.listContentText}> {i18n.t('label.fri')} {item.hours.fri}</Text>
                             <Text style={theme.listContentText}> {i18n.t('label.sat')} {item.hours.sat}</Text>
                             <Text style={theme.listContentText}> {i18n.t('label.holiday')} {item.hours.holiday}</Text>
*/