import React,{setState, Component} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text,  CheckBox, ThemeConsumer } from  'react-native-elements';
import { Icon } from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';

import {
    postAppointment,
    putAppointment,
    deleteAppointment,
    setAppointmentDateTime
} from '../../action/clinicAction/AppointmentAction';
import { connect } from 'react-redux';
import {View,Platform,  TouchableWithoutFeedbackBase } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import i18n from '../../i18n/i18n';
import DateTimePicker from  'react-native-modal-datetime-picker';


class AppointmentEditor extends Component{
    constructor(props){
        super(props);
        this.state = {
            id:props.route.params.id,
            datetime: props.route.params.datetime,
            practitioner:props.route.params.practitioner,
            client:props.route.params.client,
            clientid:props.route.params.clientid,
            service:props.route.params.service,
            room: props.route.params.room,
            created:'',
            paied:false,
            showDatePicker: false,
            showTimePicker: false   
        }

      this.practitionerChange = this.practitionerChange.bind();
      this.clientChange = this.clientChange.bind();
      this.serviceChange = this.serviceChange.bind();
      this.roomChange = this.roomChange.bind();
      this.onConfirm = this.onConfirm.bind();
      this.onCancel = this.onCancel.bind();
      this.showDatePicker = this.showDatePicker.bind();    
    } 

    practitionerChange= (val)=> { this.setState( { practitioner : val} ) };
    clientChange= (val)=> { this.setState( { client : val} ) };
    serviceChange= (val)=> { this.setState( { service: val} ) };
    roomChange = (val)=>{ this.setState({room:val})};

    onConfirm = (datetime) => {
        this.setState( datetime );
        this.props.setAppointmentDateTime(datetime);
        this.setState({showDatePicker:false});
    }

    onCancel = () =>{
        this.setState({showDatePicker:false});
    }
   
    showDatePicker = ()=> {
        this.setState({showDatePicker:true});
    }
    
    
    render(){
            
        var items = [];
         let practitioners = this.props.appointment.practitioners;
         let services = this.props.appointment.services;
         let clients = this.props.appointment.clients;
         let rooms = this.props.appointment.rooms;
         items.push(
            <ThemeConsumer>
            {({ theme })  => (
                <>
              <RNPickerSelect
                onValueChange = {this.roomChange}
                items = { rooms }
                placeholder = { {label: i18n.t('selector.room'), value:null}}
                value = {this.state.room}
              />
              <RNPickerSelect
                onValueChange = {this.practitionerChange}
                items = { practitioners }
                placeholder = { {label: i18n.t('selector.practitioner'), value:null}}
                value = {this.state.practitioner}
              />
              <RNPickerSelect
                onValueChange = {this.serviceChange}
                items = { services }
                placeholder = { {label: i18n.t('selector.service'), value:null}}
                value = {this.state.service}
              />
              <RNPickerSelect
                onValueChange = {this.clientChange}
                items = { clients }
                placeholder = { {label: i18n.t('selector.client'), value:null}}
                value = {this.state.client}
                disabled
              />

            <View  style={theme.clientAppointmentBarDateStyle} >
            <Button onPress={this.showDatePicker} title={i18n.t('button.selectdatetime')} type={theme.linkStyle.type} />
            <Button type={theme.showStyle.type} title= {this.props.appointment.datetime.toString().substr(4,17)} />
            </View>
            { this.state.showDatePicker && (
            <DateTimePicker
                  isVisible = {this.state.showDatePicker}
                  date = {this.state.date}
                  mode = 'datetime'
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


        return (
        <ScrollView>
        { items }
        </ScrollView>

     );
    }   
}

const mapStateToProps = state =>{
    return { appointment: state.appointment };
};

export default connect(mapStateToProps,{
        postAppointment,
        putAppointment,
        deleteAppointment,
        setAppointmentDateTime
})(AppointmentEditor); 
