
import React,{setState, Component} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text,  CheckBox, ThemeConsumer } from  'react-native-elements';
import { Icon } from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';

import {
    postStaff
} from '../../action/commAction/StaffAction';
import { connect } from 'react-redux';
import {View,Platform,  TouchableWithoutFeedbackBase } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import i18n from '../../i18n/i18n';
import { ADDSTAFF, EDITHOURS } from '../../constant';
import { Input } from 'react-native-elements';
import { from } from 'rxjs';
import { filter, throwIfEmpty } from 'rxjs/operators';
import { PROVINCE_DATA } from '../selectData';
import {
    DatesSetter, 
    HoursSetter,
    Boxer,
    RegularBtn,
 } from '../../element/basic';

 

class StaffEditor extends Component{
    constructor(props) {
        super(props);
        this.state = {
            title:'',
            firstname:'',
            lastname:'',
            certificateno:'',
            street:'',
            city:'',
            province:'',
            postcode:'',
            phone:'',
            mon:false,
            tue:false,
            wed:false,
            thu:false,
            fri:false,
            sat:false,
            sun:false,
            schedule:{
                onschedule:true,
                start: new Date(),
                end: new Date(),
            },
            vacation:{
                onvacation:true,
                start: new Date(),
                end: new Date(),
            },
            
        }
     
      this.titleChange = this.titleChange.bind();
      this.firstnameChange = this.firstnameChange.bind();
      this.lastnameChange = this.lastnameChange.bind();
      this.certificatenoChange = this.certificatenoChange.bind();
      this.streetChange = this.streetChange.bind();
      this.cityChange = this.cityChange.bind();
      this.provinceChange = this.provinceChange.bind();
      this.postcodeChange = this.postcodeChange.bind();
      this.phoneChagne = this.phoneChagne.bind();
      this.toggleSun = this.toggleSun.bind();
      this.toggleMon = this.toggleMon.bind();
      this.toggleTue = this.toggleTue.bind();
      this.toggleWed = this.toggleWed.bind();
      this.toggleThu = this.toggleThu.bind();
      this.toggleFri = this.toggleFri.bind();
      this.toggleSat = this.toggleSat.bind();
      this.toggleOnVacation = this.toggleOnVacation.bind();
      this.toggleOnSchedule = this.toggleOnSchedule.bind();
      this.setScheduleStart = this.setScheduleStart.bind();
      this.setScheduleEnd = this.setScheduleEnd.bind();
      this.setVacationStart = this.setVacationStart.bind();
      this.setVacationEnd = this.setVacationEnd.bind();
    } 

    titleChange= (val) =>{this.setState({title:val})};
    firstnameChange= (val) =>{this.setState({firstname:val})};
    lastnameChange= (val) =>{this.setState({lastname:val})};
    certificatenoChange= (val) =>{this.setState({certificateno:val})};

    streetChange= (val)=> { this.setState( { street : val} ) };
    cityChange= (val)=> { this.setState( { city : val} ) };
    provinceChange= (val)=> { this.setState( { province: val} ) };
    postcodeChange = (val)=>{ this.setState({postcode:val})};
    phoneChagne = (val)=> {this.setState({phone:val})};


    toggleSun= () => {
        this.setState({sun: !this.state.sun})
    }
    toggleMon= () => {
        this.setState({mon: !this.state.mon})
    }
    toggleTue= () => {
        this.setState({tue: !this.state.tue})
    }
    toggleWed= () => {
        this.setState({wed: !this.state.wed})
    }
    toggleThu= () => {
        this.setState({thu: !this.state.thu})
    }
    toggleFri= () => {
        this.setState({fri: !this.state.fri})
    }
    toggleSat= () => {
        this.setState({sat: !this.state.sat})
    }
    
    toggleOnVacation= () => {
        this.setState({ vacation:{
            ...this.state.vacation,
            onvacation: !this.state.vacation.onvacation}})
    }
    toggleOnSchedule= () => {
        this.setState({ schedule:{
            ...this.state.schedule,
            onschedule: !this.state.schedule.onschedule}})
    }

   
    setVacationStart =(time) =>{

        this.setState({vacation:{
            ...this.state.vacation,
            start:time}})
    }
    setScheduleStart =(time) =>{
        this.setState({schedule:{
            ...this.state.schedule,
            start:time}})
    }
    setVacationEnd =(time) =>{
        this.setState({vacation:{
            ...this.state.vacation,
            end:time}})
    }
    setScheduleEnd =(time) =>{
        this.setState({schedule:{
            ...this.state.schdule,
            end:time}})
    }

    saveStaff =() =>{
        this.props.postStaff({
                id:'',
                title: this.state.title,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                certificateno: this.state.certificateno,
                phone: this.state.phone,
                address:{
                    street: this.state.street,
                    city: this.state.city,
                    province: this.state.province,
                    postcode: this.state.postcode,
                },
                hours: {
                    sun: {},
                    mon: {},
                    tue: {},
                    wed: {},
                    thu: {},
                    fri: {},
                    sat: {},
                },
                vacation:{},
        });
    }

    render(){
        const {type, id } = this.props.route.params;
        let data = PROVINCE_DATA;
        let content;
        if ( type === ADDSTAFF){
        content = 
            <ThemeConsumer>
            {({theme}) => (
            <>
            <View style={theme.formContainer}>
                <Input label={i18n.t('label.title')} onChangeText = {this.titleChange} /> 
                <Input label={i18n.t('label.firstname')} onChangeText = {this.firstnameChange} />
                <Input label={i18n.t('label.lastname')} onChangeText = {this.lastnameChange} />
                <Input label={i18n.t('label.certificateno')} onChangeText = {this.certificatenoChange} />
                <Input label={i18n.t('label.phone')} onChangeText = {this.phoneChange}/>
                <Input label={i18n.t('label.street')} onChangeText = {this.streetChange} />
                <Input label={i18n.t('label.city')} onChangeText = {this.cityChange}/>
                <RNPickerSelect
                onValueChange = {this.provinceChange}
                items = { data }
                placeholder = { {label: i18n.t('label.province'), value:null}}
                />
                <Input label={i18n.t('label.postcode')} onChangeText = {this.postcodeChange}/>
            </View>
            <View style={theme.btnBox} >
                <RegularBtn title={i18n.t('button.save')} onPress={this.save}/>
            </View>
            </>
            )}

            </ThemeConsumer>
        
        } else if ( type === EDITHOURS){
            content =
            <ThemeConsumer>
            {({theme}) => (
            <>
            <Boxer title={i18n.t('title.selectday')} >
            <View style={theme.formContainer}>
                <CheckBox title={i18n.t('label.sun')} onPress={this.toggleSun} checked={this.state.sun} />
                <CheckBox title={i18n.t('label.mon')} onPress={this.toggleMon} checked={this.state.mon}/>
                <CheckBox title={i18n.t('label.tue')} onPress={this.toggleTue} checked={this.state.tue}/>
                <CheckBox title={i18n.t('label.wed')} onPress={this.toggleWed} checked={this.state.wed}/>
                <CheckBox title={i18n.t('label.thu')} onPress={this.toggleThu} checked={this.state.thu}/>
                <CheckBox title={i18n.t('label.fri')} onPress={this.toggleFri} checked={this.state.fri}/>
                <CheckBox title={i18n.t('label.sat')} onPress={this.toggleSat} checked={this.state.sat}/>
            </View >
            </Boxer>
            <Boxer title={i18n.t('title.schedule')} >
                <CheckBox title={i18n.t('label.onschedule')}
                onPress={this.toggleOnSchedule}
                checked={this.state.schedule.onschedule} />
                { this.state.schedule.onschedule &&
                   <HoursSetter start = {this.state.schedule.start}
                   saveStart ={this.setScheduleStart}
                    end = {this.state.schedule.end}
                    saveEnd = {this.setScheduleEnd}
                    />
                 }
            </Boxer>

            <Boxer title={i18n.t('title.vacation')} >
                <CheckBox title={i18n.t('label.onvacation')} onPress={this.toggleOnVacation}
                 checked={this.state.vacation.onvacation} />
                { this.state.vacation.onvacation &&
                <DatesSetter start = {this.state.vacation.start}
                    saveStart ={this.setVacationStart}
                    end = {this.state.vacation.end}
                    saveEnd = {this.setVacationEnd}
                />
                 }
            </Boxer>
            <View style={theme.btnBox} >
                <RegularBtn title={i18n.t('button.save')}/>
            </View>

            </>
            )}
            </ThemeConsumer>

        }

        return (
        <ScrollView>
        { content }
        </ScrollView>

     );
    }   
}

const mapStateToProps = state =>{
    return { staff: state.staff };
};

export default connect(mapStateToProps,{
        postStaff
})(StaffEditor); 

/*
<Boxer title={i18n.t('title.schedule')} >
<CheckBox title={i18n.t('label.onschedule')}
 onPress={this.toggleOnSchedule}
 checked={this.state.schedule.onschedule} />
 { this.state.schedule.onschedule &&
   <HoursSetter start = {this.state.schedule.start}
    saveStart ={this.setScheduleStart}
    end = {this.state.schedule.end}
    saveEnd = {this.setScheduleEnd}
  />
 }
</Boxer>
*/