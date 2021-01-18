import React, {Component}  from 'react';
import { ScrollView, FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import { ListItem, ThemeConsumer, ButtonGroup } from 'react-native-elements';
import {Icon} from 'react-native-vector-icons/Ionicons';

import { 
    getAppointmentByDate,
    setAppointmentDate,
    setAppointmentByRoom,
    setAppointmentByPract
} from '../../action/clinicAction/AppointmentAction';
import { connect } from 'react-redux';
import { View, Text  } from 'react-native';
import i18n from '../../i18n/i18n';
import { ADDFAMILY } from '../../constant';



import { InlineDateTimePicker } from '../basic/inlineElement';
import { BtnGroup,
     LinkBtn,
     RoundBtn
     } from '../basic';
import { FloatingAction } from 'react-native-floating-action';
import  ActionButton, {ActionButtonItem} from 'react-native-action-button';
import { from } from 'rxjs';
import { groupBy, concatMap, mergeMap,map, reduce } from 'rxjs/operators';


class AppointmentList extends Component {
    constructor(props){
        super(props);
        this.state = {
             date: new Date(),
             showRoom: true,
             showPractitioner: false,
         }
        this.setDate = this.setDate.bind();
        this.onShowRoom = this.onShowRoom.bind();
        this.onShowPract = this.onShowPract.bind();
        this.props.setAppointmentDate(this.state.date)
    }

    setDate= (date) => {
        this.setState( date );
        this.props.setAppointmentDate(date);
        this.props.getAppointmentByDate(date);
    }

    onShowRoom =() => {
        this.setState({onShowRoom:true, onShowPractitioner: flase})
    }
    onShowPract =() => {
        this.setState({onShowRoom:false, onShowPractitioner: true})
    }




    floatingAction = (name) =>{
        if ( name === 'bt_addfamily'){
            this.props.navigation.navigate("ClientModal",{type:ADDFAMILY});
        } else if ( name === 'bt_new'){
            this.props.navigation.navigate("AppointmentModal");
        }
    }

    convertToRoom = () =>{
        let rooms = [];
        const appts = from(this.props.appointment.bydate)
        appts.pipe(
            groupBy(appt => appt.room),
            mergeMap( group$ =>
                group$.pipe(
                    reduce( (acc,cur) =>[...acc,cur],[`${group$.key}`]))
            ),
            map( arr =>( { room: arr[0], appts:arr.slice(1) }) )
        ).subscribe(
            p => rooms.push(p)
        );
        this.props.setAppointmentByRoom(rooms);

    }
    convertToPract = () =>{
        let practs = [];
        const appts = from(this.props.appointment.bydate)
        appts.pipe(
            groupBy(appt => appt.practitioner),
            mergeMap( group$ =>
                group$.pipe(
                    reduce( (acc,cur) =>[...acc,cur],[`${group$.key}`]))
            ),
            map( arr =>( { practitioner: arr[0], appts:arr.slice(1) }) )
        ).subscribe(
            p => practs.push(p)
        );
        this.props.setAppointmentByPract(practs);
    }

    componentDidMount = async () =>{
        await this.props.getAppointmentByDate(this.state.date);
        this.convertToRoom();
        this.convertToPract();
    }

   
    render (){
    
        
        const {selectedIndex} = this.state;
        const actions = [
            {
                text:i18n.t('button.new'),
                name:'bt_new',
                icon:require('../../assets/icon.png'),
                position:1
            },
            {
                text: i18n.t('button.addfamily'),
                name:'bt_addfamily',
                icon:require('../../assets/icon.png'),
                position:2
            },
        ];


        return (

        <ThemeConsumer>
         {({ theme })  => (
        <>
        
        <View style={theme.DatePickerBar.container}>
            <View  style={theme.DatePickerBar.dateContainer} >
            <InlineDateTimePicker datetime={this.props.appointment.date}
                type ='date'
                save = {this.setDate}
            />
            </View>
            <View style ={theme.DatePickerBar.btnContainer}> 
            <BtnGroup>
                <RoundBtn title={i18n.t('button.byroom')}
                    onPress = {this.onShowRoom}
                />
                <RoundBtn title={i18n.t('button.bypractitioner')}
                    onPress = {this.onShowPract}
                 />                
            </BtnGroup>
            </View>
                            
        </View>
       
      
            { this.state.showRoom  && !this.props.appointment.loading &&

                <FlatList
                   data={this.props.appointment.byroom}
                   keyExtractor = { (item)=> item.room }
                   renderItem = { ({item, index, separator}) =>(
                    
                        <TouchableHighlight>
                        <>
                        <View sytle={theme.List.titleContainer}>                 
                        <Text style={theme.List.titleText} >{item.room}</Text>
                        </View>       
                        {
                            item.appts.map( (appt,idx) => (
                            <ThemeConsumer>
                            {({ theme })  => (
                                <ListItem 
                                    key = {appt.id} 
                                    leftElement = {
                                        <View style={theme.Appointment.timeBox} >
                                            <Text style ={theme.Appointment.timeText} >{appt.start.substr(11,5)} </Text>
                                            <View style={theme.Appointment.timeSpacer}></View>
                                            <Text style ={theme.Appointment.timeText}>{appt.duration}</Text>
                                        </View>
                                    }
                                    title={<Text style= { theme.Appointment.highLightStyle }> {appt.practitioner}</Text>}
                                    subtitle ={<Text style= { theme.Appointment.serviceStyle }> {appt.service}</Text>}
                                    rightTitle = {<Text style= { theme.Appointment.clientStyle }>{appt.client}</Text>}
                                    rightSubtitle = {<Text style= { theme.Appointment.noteStyle }>{appt.note}</Text>}
                                    rightElement ={
                                        <LinkBtn onPress= {()=> this.props.navigation.navigate("AppointmentActions",{
                                            id: appt.id,
                                            datetime: appt.datetime,
                                            practitioner: appt.practitioner,
                                            client: appt.client,
                                            service: appt.service
                                        })}
                                        title={i18n.t('button.actions')} />
                                    }
                                    containerStyle ={{flex:1}}
                                    contentContainerStyle={{flex:2}}
                                    rightContentContainerStyle={{flex:2}}
                                    bottomDivider
                                    checkmark = {false}
                                />
                            )}
                            </ThemeConsumer>
                            )) 
                        }
                        </>
                        </TouchableHighlight>
            
                    )}
                />
            }       
            { this.state.showPractitioner && !this.props.appointment.loading &&
               <FlatList
               data={this.props.appointment.bypractitioner}
               keyExtractor = { (item)=> item.practitioner }
               renderItem = { ({item, index, separator}) =>(
                    <TouchableHighlight>
                    <>
                        <View sytle={theme.List.titleContainer}>                 
                        <Text style={theme.List.titleText} >{item.practitioner}</Text>
                        </View>        
                    {
                        item.appts.map( (appt,idx) => (
                        <ThemeConsumer>
                        {({ theme })  => (
                            <ListItem 
                                key = {appt.id}
                                leftElement = {
                                    <View style={theme.Appointment.timeBox} >
                                        <Text style ={theme.Appointment.timeText} >{appt.start.substr(11,5)} </Text>
                                        <View style={theme.Appointment.timeSpacer}></View>
                                        <Text style ={theme.Appointment.timeText}>{appt.duration}</Text>
                                    </View>
                                }
                                title={<Text style= { theme.Appointment.highLightStyle }> {appt.room}</Text>}
                                subtitle ={<Text style= { theme.Appointment.serviceStyle }> {appt.service}</Text>}
                                rightTitle = {<Text style= { theme.Appointment.clientStyle }>{appt.client}</Text>}
                                rightSubtitle = {<Text style= { theme.Appointment.noteStyle }>{appt.note}</Text>}
                                rightElement ={
                                    <LinkBtn onPress= {()=> this.props.navigation.navigate("AppointmentActions",{
                                        id: appt.id,
                                        datetime: appt.datetime,
                                        practitioner: appt.practitioner,
                                        client: appt.client,
                                        service: appt.service
                                    })}
                                   title={i18n.t('button.actions')} />
                                }
                                containerStyle ={{flex:1}}
                                contentContainerStyle={{flex:2}}
                                rightContentContainerStyle={{flex:2}}
                                bottomDivider
                                checkmark = {false}
                            />
                        )}
                        </ThemeConsumer>
                        )) 
                    }
                    
                    </>
                    </TouchableHighlight>
                )}
            />
            
            }       
        { this.state.showDatePicker && (
            <DateTimePicker
                  isVisible = {this.state.showDatePicker}
                  date = {this.state.date}
                  mode = 'date'
                  onConfirm = {this.onConfirm}
                  onCancel = {this.onCancel}
            />
        )}
        <FloatingAction
            ref = {(ref)=>{this.FloatingAction = ref;}}
            actions = { actions }
            onPressItem = { this.floatingAction }
            position ='left'
            animated
        />
    
        </>
        )}   
        </ThemeConsumer>
     
    )};
}


const mapStateToProps = state =>{
    return { appointment: state.appointment };
};

export default connect(mapStateToProps,
    {
      getAppointmentByDate,
      setAppointmentDate,
      setAppointmentByRoom,
      setAppointmentByPract
    }
    )(AppointmentList); 

    /*

      
        <View style={theme.btnBox}>
        <Button onPress={()=> this.props.navigation.navigate("AppointmentModal")} title={i18n.t('button.new')}
         type ={theme.btnStyle.type}
         containerStyle={theme.btnStyle.containerStyle} />
        <Button onPress={()=> this.props.navigation.navigate("ClientModal",{type:ADDFAMILY})}
         title={i18n.t('button.addfamily')}
         type ={theme.btnStyle.type}
         containerStyle={theme.btnStyle.containerStyle} />
        </View>
              
    <ActionButton>
            <ActionButtonItem title='new member' onPress={()=>{}} ><Icon name='md-create'/></ActionButtonItem>
            <ActionButtonItem title='new member' onPress={()=>{}} ><Icon name='md-create'/></ActionButtonItem>
        </ActionButton>

    
    */

    /*
        <FloatingAction
            ref = {(ref)=>{this.FloatingAction = ref;}}
            actions = { actions }
            onPressItem = { name => {} }
            postion ='left'
        />
         <ActionButton>
            <ActionButton.Item title='new member' onPress={()=>{}} ><Icon name='md-create'/></ActionButton.Item>
        </ActionButton>
       
*/