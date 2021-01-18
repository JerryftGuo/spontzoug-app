
import { 
    GET_APPOINTMENT_BYDATE_SUCCESS,
    GET_APPOINTMENT_BYDATE_ERROR,
    GET_APPOINTMENT_BYDATE,
    SET_APPOINTMENT_DATE,
    SET_APPOINTMENT_DATETIME,
    POST_APPOINTMENT,
    SET_APPOINTMENT_BYROOM,
    SET_APPOINTMENT_BYPRACT
} from '../../actiontype/clinicActionType/AppointmentType';


const initAppt = {
loading: true,
date: new Date(),
datetime: new Date(),
bydate: [],
byroom:[],
bypractitioner:[],
practitioners:[
    { label:'Jerry Guo', value:'Jerry Guo'},
    { label:'Esther Zhou', value:'Esterh Zhou'}
],
services:[
    { label:'Massage', value:'Massage'},
    { label:'acupucture', value:'Acupecture'},
],
clients:[
    {familyid:'1223', label:'John', value:'John'},
    {familyid:'3434', label:'Wayne', value:'Wanye'},
],
rooms:[
    { label:'Room A', value:'Room A'},
    { label:'Room B', value:'Room B'},
],
practitionerinvalid: false,
serviceinvalid: false,
clientinvalid: false,
appointmentinvalid: false,
message:'',
error:''
}

export default function(state = initAppt, action){
    switch( action.type ){
    case GET_APPOINTMENT_BYDATE:{
        return Object.assign({}, state,
            {loading: true});
    }
   
    case GET_APPOINTMENT_BYDATE_SUCCESS:{
        return Object.assign({}, state,{ 
             bydate: action.payload,
             loading: false
         } );
    }
   
    case GET_APPOINTMENT_BYDATE_ERROR:{
        return Object.assign({}, state,
           { error: action.payload,
            loading: false } );
    }
    case SET_APPOINTMENT_DATE:{
        return Object.assign({}, state,
            { date: action.payload.date });
    }
    case SET_APPOINTMENT_DATETIME:{
        return Object.assign({}, state,
            { datetime: action.payload.datetime });
    }
    case SET_APPOINTMENT_BYROOM:{
        return Object.assign({}, state,
            {byroom: action.payload});
    }
    case SET_APPOINTMENT_BYPRACT:{
        return Object.assign({},state,
            {bypractitioner: action.payload})
    }
    
    default:
        return state;
   }

}