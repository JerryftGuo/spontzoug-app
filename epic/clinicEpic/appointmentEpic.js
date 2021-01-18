import {
    GET_APPOINTMENT_BYDATE,
    GET_APPOINTMENT_BYDATE_SUCCESS,
    GET_APPOINTMENT_BYDATE_ERROR   
} from '../../actiontype/clinicActionType/AppointmentType';
import { pipe, mapTo } from 'rxjs/operators';
import { ofType } from 'redux-observable';

export const  getAppointmentByDateEpic = (action$) => 
    action$.pipe(
    ofType(GET_APPOINTMENT_BYDATE),
    mapTo({ type:GET_APPOINTMENT_BYDATE_SUCCESS, payload:[
           {
                    id:'1',
                    room:'room1',
                    practitioner:'Jerry',
                    client:'Jorge',
                    service:'Test',
                    start: new Date().toISOString(),
                    duration: 50,
                    price:'80.00',
                    duration:'30',
                    note:' test'
            },{
                    id:'2',
                    room:'room1',
                    practitioner:'Jerry',
                    client:'John',
                    service:'Test',
                    start: new Date().toISOString(),
                    duration: 100,
                    price:'80.00',
                    duration:'30',
                    note:' test'
            },{
                    id:'3',
                    room:'room2',
                    practitioner:'Jerry',
                    client:'Jorge',
                    service:'Test',
                    start: new Date().toISOString(),
                    duration: 90,
                    price:'80.00',
                    duration:'30',
                    note:' test'
            },{ 
                    id:'4',
                    room:'room2',
                    practitioner:'Jerry',
                    client:'John',
                    service:'Test',
                    start: new Date().toISOString(),
                    duration: 60,
                    price:'80.00',
                    duration:'30',
                    note:' test'
            },
    ]})
 );

 