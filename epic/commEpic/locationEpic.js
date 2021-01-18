import {
    GET_LOCATION,
    GET_LOCATION_SUCCESS,
    GET_LOCATION_ERROR,
    POST_LOCATION,
    POST_LOCATION_SUCCESS,
    POST_LOCATION_ERROR,
    PUT_LOCATION,
    PUT_LOCATION_SUCCESS,
    PUT_LOCATION_ERROR,
    } from '../../actiontype/commActionType/LocationType';
import { pipe, mapTo, map, take } from 'rxjs/operators';
import { ofType } from 'redux-observable';

export const  getLocationEpic = (action$) =>
    action$.pipe(
    ofType(GET_LOCATION),
    mapTo({ type:GET_LOCATION_SUCCESS, payload:[
        {
            id:'3435',
            name: 'location',
            phone: '4032303323',
            address:{
                street: '31 Edghill Dr NW',
                city: 'Calgary',
                province: 'AB',
                postcode: 'T3A 2R9',
            },
            hours: {
                sun: {},
                mon:{
                    firstperiod:{
                        closed: false,
                        start: new Date(),
                        end: new Date(),
                    },
                    secondperiod:{
                        closed: false,
                        start: new Date(),
                        end: new Date(),
                    },
                },
                tue:{
                    firstperiod:{
                        closed: false,
                        start: new Date(),
                        end: new Date(),
                    },
                    secondperiod:{
                        closed: true,
                        start: new Date(),
                        end: new Date(),
                    },
                },
                wed: {},
                thu: {},
                fri: {},
                sat: {},
                holiday: {},
            }
            
        },
        {
            id:'3438',
            name: 'dalhousie',
            phone: '403230334',
            address:{
                street: '31 Dal Dr NW',
                city: 'Calgary',
                province: 'AB',
                postcode: 'T3A 5R9',
            },
            hours: {
                sun: {
                    firstperiod:{
                        closed: true,
                        start: new Date(),
                        end: new Date(),
                    },
                    secondperiod:{
                        closed: true,
                        start: new Date(),
                        end: new Date(),
                    },
                },
                mon:{
                    firstperiod:{
                        closed: false,
                        start: new Date(),
                        end: new Date(),
                    },
                    secondperiod:{
                        closed: false,
                        start: new Date(),
                        end: new Date(),
                    },
                },
                tue:{
                    firstperiod:{
                        closed: false,
                        start: new Date(),
                        end: new Date(),
                    },
                    secondperiod:{
                        closed: true,
                        start: new Date(),
                        end: new Date(),
                    },
                },
                wed: {},
                thu: {},
                fri: {},
                sat: {},
                holiday: {},
            }
        },
    ]})
 );

 export const  putLocationEpic = (action$) =>
    action$.pipe(
    ofType(PUT_LOCATION),
    map( (action) => ({ type:PUT_LOCATION_SUCCESS, payload:action.payload }) )
);
