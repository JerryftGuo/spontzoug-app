
import React,{setState, Component} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text,  CheckBox, ThemeConsumer } from  'react-native-elements';
import { Icon } from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
import { Boxer,
    RegularBtn,
} from '../../element/basic';

import {
    postLocation
} from '../../action/commAction/LocationAction';
import { connect } from 'react-redux';
import {View,Platform,  TouchableWithoutFeedbackBase } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import i18n from '../../i18n/i18n';
import DateTimePicker from  'react-native-modal-datetime-picker';
import { ADDADDRESS, EDITHOURS } from '../../constant';
import { Input } from 'react-native-elements';
import { from } from 'rxjs';
import { filter, throwIfEmpty } from 'rxjs/operators';
import { PROVINCE_DATA } from '../selectData';
import { HoursSetter } from '../../element/basic/basicElement';
 

class LocationEditor extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:'',
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
            firstperiod:{
                closed:true,
                start: new Date(),
                end: new Date(),
            },
            secondperiod:{
                closed: true,
                start: new Date(),
                end: new Date()
            }
        }

      this.nameChange = this.nameChange.bind();
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
      this.toggleHoliday = this.toggleHoliday.bind();
      this.toggleFirstClosed = this.toggleFirstClosed.bind();
      this.toggleSecondClosed = this.toggleSecondClosed.bind();
      this.setFirstStart = this.setFirstStart.bind();
      this.setSecondStart = this.setSecondStart.bind();
      this.setFirstEnd = this.setFirstEnd.bind();
      this.setSecondEnd = this.setSecondEnd.bind();
    } 

    nameChange= (val) =>{this.setState({name:val})};
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
    toggleHoliday= () => {
        this.setState({holiday: !this.state.holiday})
    }
    toggleFirstClosed= () => {
        this.setState({ firstperiod:{
            ...this.state.firstperiod,
            closed: !this.state.firstperiod.closed}})
    }
    toggleSecondClosed= () => {
        this.setState({ secondperiod:{
            ...this.state.secondperiod,
        closed: !this.state.secondperiod.closed}})
    }
    setFirstStart =(time) =>{
        console.warn("time:"+ JSON.stringify(time))
        this.setState({firstperiod:{
            ...this.state.firstperiod,
            start:time}})
    }
    setSecondStart =(time) =>{
        this.setState({secondperiod:{
            ...this.state.secondperiod,
            start:time}})
    }
    setFirstEnd =(time) =>{
        this.setState({firstperiod:{
            ...this.state.firstperiod,
            end:time}})
    }
    setSecondEnd =(time) =>{
        this.setState({secondperiod:{
            ...this.state.secondperiod,
            end:time}})
    }

    saveLocation =() =>{
        this.props.postLocation({
                id:'',
                name: this.state.name,
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
                    holiday: {},
                }
        });
    }

    render(){
        const {type, id } = this.props.route.params;
        let data = PROVINCE_DATA;
        let content;
        if ( type === ADDADDRESS){
        content = 
            <ThemeConsumer>
            {({theme}) => (
            <>
            <View style={theme.formContainer}>
                <Input label={i18n.t('label.name')} onChangeText = {this.nameChange} />
                <Input label={i18n.t('label.street')} onChangeText = {this.streetChange} />
                <Input label={i18n.t('label.city')} onChangeText = {this.cityChange}/>
                <RNPickerSelect
                onValueChange = {this.provinceChange}
                items = { data }
                placeholder = { {label: i18n.t('label.province'), value:null}}
                />
                <Input label={i18n.t('label.postcode')} onChangeText = {this.postcodeChange}/>
                <Input label={i18n.t('label.phone')} onChangeText = {this.phoneChange}/>
            </View>
            <View style={theme.btnBox} >
                <Button title={i18n.t('button.save')} onPress={this.save}/>
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
                <CheckBox title={i18n.t('label.holiday')} onPress={this.toggleHoliday} checked={this.state.holiday}/>
            </View >
            </Boxer>
            <Boxer title={i18n.t('title.firstperiod')} >
                <CheckBox title={i18n.t('label.closed')} onPress={this.toggleFirstClosed}
                 checked={this.state.firstperiod.closed} />
                 { !this.state.firstperiod.closed &&
                <HoursSetter start = {this.state.firstperiod.start}
                    saveStart ={this.setFirstStart}
                    end = {this.state.firstperiod.end}
                    saveEnd = {this.setFirstEnd}
                />
                 }
            </Boxer>
            <Boxer title={i18n.t('title.secondperiod')} >
                <CheckBox title={i18n.t('label.closed')} onPress={this.toggleSecondClosed}
                 checked={this.state.secondperiod.closed} />
                { !this.state.secondperiod.closed &&
                <HoursSetter start = {this.state.secondperiod.start}
                    saveStart ={this.setSecondStart}
                    end = {this.state.secondperiod.end}
                    saveEnd = {this.setSecondEnd}
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
    return { location: state.location };
};

export default connect(mapStateToProps,{
        postLocation
})(LocationEditor); 

/*
items.push(
    <ThemeConsumer>
    {({ theme })  => (
        <>
      

    { this.state.showTimePicker && (
    <DateTimePicker
          isVisible = {this.state.showDatePicker}
          date = {this.state.date}
          mode = 'time'
          onConfirm = {this.onConfirm}
          onCancel = {this.onCancel}
    />
    )}
    <View style={theme.btnBox} >
     <Button onPress = {() =>{ this.props.postAppoinment({
         id:'',
                        
     })}} title={i18n.t('button.save')} />
    </View>
    </>
    )}
    </ThemeConsumer>
);
*/