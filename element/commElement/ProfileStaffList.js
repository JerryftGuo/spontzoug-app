import React, {Component}  from 'react';
import { ScrollView, FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import { Button, ListItem, ThemeConsumer, ButtonGroup } from 'react-native-elements';
import {Icon} from 'react-native-vector-icons/Ionicons';

import { 
    getStaff,
    putStaff
} from '../../action/commAction/StaffAction';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import i18n from '../../i18n/i18n';
import { ADDSTAFF, EDITHOURS } from '../../constant';
import { InlineInput,
  InlineSelect
} from '../basic/inlineElement';

import { from, pipe } from 'rxjs';
import { filter,reduce, isEmpty} from 'rxjs/operators';
import { PROVINCE_DATA } from '../../modal/selectData';
import { ScheduleHoursDisplay,
  DatesDisplay,
 } from '../basic/basicElement';
 import { RegularBtn,
 IconBtn 
} from '../basic';


class ProfileStaffList extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
        this.updateStaff = this.updateStaff.bind();
    }


    componentDidMount = async () =>{
        await this.props.getStaff();
    }

    updateStaff = (id, type, name, value) => {

      from(this.props.staff.staffs)
      .pipe(
        filter( item => item.id === id),
      ).subscribe(
        item =>{
          if( type === 'root' ){
            this.props.putStaff(Object.assign({}, item, { [name]: value}));
          } else if ( type === 'address'){
            this.props.putStaff(Object.assign({}, item,
               { address:{
                 ...item.address,
                 [name]: value}
              }));
          } else if ( type === 'hours'){
            this.props.putStaff(Object.assign({}, item,
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
                  data = {this.props.staff.staffs}
                  keyExtractor = { (item) => item.id}
                  renderItem = {
                      ({item}) =><>
                       <View style={theme.List.titleContainer}>
                        <Text style ={theme.List.titleText}> {item.firstname} {item.lastname}</Text>
                       </View>
                       <View style={theme.List.container}>

                          <InlineInput label={i18n.t('label.title')}
                             text={item.title}
                             id = {item.id} type='root' name='title'
                             save={this.updateLocation}/>
                          <InlineInput label={i18n.t('label.firstname')}
                             text={item.firstname}
                             id = {item.id} type='root' name='firstname'
                             save={this.updateLocation}/>
                          <InlineInput label={i18n.t('label.lastname')}
                             text={item.lastname}
                             id = {item.id} type='root' name='lastname'
                             save={this.updateLocation}/>
                          <InlineInput label={i18n.t('label.certificateno')}
                             text={item.certificateno}
                             id = {item.id} type='root' name='certificateno'
                             save={this.updateLocation}/>
                          <InlineInput label={i18n.t('label.phone')}
                             text={item.phone}
                             id = {item.id} type='root' name='phone'
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
                         
                    
                        </View>
                        <View style={theme.List.listsContainer}>
                          <View style={theme.List.listsLeft} >
                          <View style={theme.List.listsTitleContainer}>
                           <Text style ={theme.List.listsTitleText}> {i18n.t('title.hours')}</Text>
                           </View>
                            { Object.keys(item.hours.sun).length !== 0 &&
                               <ScheduleHoursDisplay label={i18n.t('label.sun')} day={item.hours.sun} /> }
                            { Object.keys(item.hours.mon).length !== 0 &&
                               <ScheduleHoursDisplay label={i18n.t('label.mon')} day={item.hours.mon} /> }
                             { Object.keys(item.hours.tue).length !== 0 &&
                               <ScheduleHoursDisplay label={i18n.t('label.tue')} day={item.hours.tue} /> }
                             { Object.keys(item.hours.wed).length !== 0 &&
                               <ScheduleHoursDisplay label={i18n.t('label.wed')} day={item.hours.wed} /> }
                             { Object.keys(item.hours.thu).length !== 0 &&
                               <ScheduleHoursDisplay label={i18n.t('label.thu')} day={item.hours.thu} /> }
                             { Object.keys(item.hours.fri).length !== 0 &&
                               <ScheduleHoursDisplay label={i18n.t('label.fri')} day={item.hours.fri} /> }
                             { Object.keys(item.hours.sat).length !== 0 &&
                               <ScheduleHoursDisplay label={i18n.t('label.sat')} day={item.hours.sat} /> }
                             { Object.keys(item.vacation).length !== 0 &&
                               <DatesDisplay label={i18n.t('label.vacation')} day={item.vacation} /> }
          
                          </View>
                         <View style={theme.List.listsRight} >
                           <IconBtn onPress= {()=> this.props.navigation.navigate("StaffModal",{
                               type: EDITHOURS
                             })}
                            icon={theme.IconBtn.editBtn}
                            />

                         </View>
                       </View>
                       </>
                  }
                 
                  ListFooterComponent ={
                    <View style={theme.btnBox} >
                    <RegularBtn onPress= {()=> this.props.navigation.navigate("StaffModal",{
                        type: ADDSTAFF
                    })}
                     title={i18n.t('button.addstaff')} />
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
    return { staff: state.staff };
};

export default connect(mapStateToProps,
    {
      getStaff,
      putStaff
    }
    )(ProfileStaffList); 

   