import {
    GET_STAFF,
    GET_STAFF_SUCCESS,
    GET_STAFF_ERROR,
    POST_STAFF,
    POST_STAFF_SUCCESS,
    POST_STAFF_ERROR,
    PUT_STAFF,
    PUT_STAFF_SUCCESS,
    PUT_STAFF_ERROR,
    } from '../../actiontype/commActionType/StaffType';
import { pipe, mapTo, map, take } from 'rxjs/operators';
import { ofType } from 'redux-observable';

export const  getStaffEpic = (action$) =>
    action$.pipe(
    ofType(GET_STAFF),
    mapTo({ type:GET_STAFF_SUCCESS, payload:[
        {
            id:'3435',
            title: 'Dr.',
            firstname:'Jerry',
            lastname:'Guo',
            phone: '4032303323',
            role:'cashier',
            images:[
                { id:1, title:'test image 1', valid:true, uri:'https://unsplash.it/400/400?image=1'}
            ],
            certificateno:'32323',
            address:{
                street: '31 Edghill Dr NW',
                city: 'Calgary',
                province: 'AB',
                postcode: 'T3A 2R9',
            },
            hours: {
                sun: {
                    onschedule:true,
                    start: new Date(),
                    end: new Date(),
                },
                mon: {
                    onschedule:false,
                    start: new Date(),
                    end: new Date(),
                },
                tue: {},
                wed: {},
                thu: {},
                fri: {},
                sat: {},  
            },
            vacation:{
                onvaction:true,
                start: new Date(),
                end: new Date(),
            },
        },
        {
            id:'3436',
            title: 'Dr.',
            firstname:'Esther',
            lastname:'Zhou',
            phone: '4032303323',
            role:'practitioner',
            images:[
                { id:1, title:'test image 1', valid:true, uri:'https://unsplash.it/400/400?image=1'},
            ],
            certificateno:'32323',
            address:{
                street: '33 Edghill Dr NW',
                city: 'Calgary',
                province: 'AB',
                postcode: 'T3A 2R9',
            },
            hours: {
                sun: {
                    onschedule:true,
                    start: new Date(),
                    end: new Date(),
                },
                mon: {
                    onschedule:false,
                    start: new Date(),
                    end: new Date(),
                },
                tue: {},
                wed: {},
                thu: {},
                fri: {},
                sat: {},
            },
            vacation:{
                onvaction:true,
                start: new Date(),
                end: new Date(),
            }
        },
    ]})
 );

 export const  putStaffEpic = (action$) =>
    action$.pipe(
    ofType(PUT_STAFF),
    map( (action) => ({ type:PUT_STAFF_SUCCESS, payload:action.payload }) )
);
