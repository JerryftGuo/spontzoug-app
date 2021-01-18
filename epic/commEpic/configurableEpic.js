import {
    GET_CONFIGURABLE_CATEGORY,
    GET_CONFIGURABLE_CATEGORY_SUCCESS,
    GET_CONFIGURABLE_CATEGORY_ERROR,
    POST_CONFIGURABLE_CATEGORY,
    POST_CONFIGURABLE_CATEGORY_SUCCESS,
    POST_CONFIGURABLE_CATEGORY_ERROR,
    PUT_CONFIGURABLE_CATEGORY,
    PUT_CONFIGURABLE_CATEGORY_SUCCESS,
    PUT_CONFIGURABLE_CATEGORY_ERROR,
    GET_CONFIGURABLE_ITEM,
    GET_CONFIGURABLE_ITEM_SUCCESS,
    GET_CONFIGURABLE_ITEM_ERROR,
    POST_CONFIGURABLE_ITEM,
    POST_CONFIGURABLE_ITEM_SUCCESS,
    POST_CONFIGURABLE_ITEM_ERROR,
    PUT_CONFIGURABLE_ITEM,
    PUT_CONFIGURABLE_ITEM_SUCCESS,
    PUT_CONFIGURABLE_ITEM_ERROR,
    } from '../../actiontype/commActionType/ConfigurableType';
import { pipe, mapTo, map, take, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { ofType } from 'redux-observable';
import { API_URL } from  '../env';

export const  getConfigurableCategoryEpic = (action$) =>
    action$.pipe(
    ofType(GET_CONFIGURABLE_CATEGORY),
    map( (action) =>(
        { type:GET_CONFIGURABLE_CATEGORY_SUCCESS, key: action.key, payload:[
        {
            id: '121',
            name:'category 1',
            color:'red'
        },
        {
            id: '124',
            name:'category 2',
            color:'green'
        }
    ]}))

 );

 export const  putConfigurableCategoryEpic = (action$) =>
    action$.pipe(
    ofType(PUT_CONFIGURABLE_CATEGORY),
    map( (action) => ({ type:PUT_CONFIGURABLE_CATEGORY_SUCCESS, key: action.key, payload:action.payload }) )
);

export const  postConfigurableCategoryEpic = (action$) =>
    action$.pipe(
    ofType(POST_CONFIGURABLE_CATEGORY),
    map( (action) => ({ type:POST_CONFIGURABLE_CATEGORY_SUCCESS, key: action.key, payload:action.payload }) )
);


export const  getConfigurableItemEpic = (action$) =>
    action$.pipe(
    ofType(GET_CONFIGURABLE_ITEM),
    mergeMap( action => 
        ajax.getJSON({
            url: API_URL +`/AB/Calgary/clinic/`,
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'rxjs-custom-header':'Rxjs'
            },
            body: action.payload,
        }).pipe(
            map( response => ({ type:POST_CONFIGURABLE_ITEM_SUCCESS, key: action.key, payload: response})),
            catchError( error => of({ type:POST_CONFIGURABLE_ITEM_ERROR, key: action.key, payload:error.xhr.response.message})),
        )
    )
 
 );

 export const  putConfigurableItemEpic = (action$) =>
    action$.pipe(
    ofType(PUT_CONFIGURABLE_ITEM),
    mergeMap( action => 
        ajax.getJSON({
            url: API_URL +`/${action.key}/update/`,
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'rxjs-custom-header':'Rxjs'
            },
            body: action.payload,
        }).pipe(
            map( response => ({ type:POST_CONFIGURABLE_ITEM_SUCCESS, key: action.key, payload: response})),
            catchError( error => of({ type:POST_CONFIGURABLE_ITEM_ERROR, key: action.key, payload:error.xhr.response.message})),
        )
    )
  
);

export const  postConfigurableItemEpic = (action$, state$, {getJSON} ) =>
    action$.pipe(
    ofType(POST_CONFIGURABLE_ITEM),
    mergeMap( action => 
        ajax({
            url: API_URL +`/${action.key}/create/`,
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'rxjs-custom-header':'Rxjs'
            },
            body: action.payload,
        }).pipe(
            map( response => ({ type:POST_CONFIGURABLE_ITEM_SUCCESS, key: action.key, payload: response.xhr.status})),
            catchError( error => of({ type:POST_CONFIGURABLE_ITEM_ERROR, key: action.key, payload:error.xhr.response.message})),
        )
    )
);

/* staff 
    id:'3435',key
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
                        schedule:{
                        onschedule:true,
                        start: new Date(),
                        end: new Date(),
                        },
                    },
                    mon: {
                        schedule:{
                            onschedule:true,
                            start: new Date(),
                            end: new Date(),
                            },
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
                        schedule:{
                            switch:true,
                            start: new Date(),key
                            end: new Date(),
                            },
                    },
                    mon: {
                        schedule:{
                            switch:true,
                            start: new Date(),
                            end: new Date(),
                        },
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

*/

/* location item
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
                            swtich: false,

                            start: new Date(),
                            end: new Date(),
                        },
                        secondperiod:{
                            switch: false,
                            start: new Date(),
                            end: new Date(),
                        },
                    },
                    tue:{
                        firstperiod:{
                            switch: false,
                            start: new Date(),
                            end: new Date(),
                        },
                        secondperiod:{
                            switch: true,
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

*/

/*
product item
{ id: '123',
images:[
    { id:1, title:'test image 1', valid:true, uri:'https://unsplash.it/400/400?image=1'},
    { id:2, title:'test image 2', valid:true, uri:'https://unsplash.it/400/400?image=2'},
    { id:3, title:'test image 3', valid:true, uri:'https://unsplash.it/400/400?image=3'},
    { id:4, title:'test image 4', valid:true, uri:'https://unsplash.it/400/400?image=2'},
    { id:5, title:'test image 5', valid:true, uri:'https://unsplash.it/400/400?image=1'},
],
category:'category 1',
name:'item 1',
ingredient:' test ingredient',
instock: true,
recommended: true,
price: 23.22,
sale:{
    onsale:false,
    start: new Date(),
    end: new Date(),
    price:12.33,
},
},
{ id: '234',
images:[
   { id:1, title:'test image 1', valid:true, uri:'https://unsplash.it/400/400?image=1'},
   { id:2, title:'test image 2', valid:true, uri:'https://unsplash.it/400/400?image=2'},
   { id:3, title:'test image 3', valid:true, uri:'https://unsplash.it/400/400?image=3'},
   { id:4, title:'test image 4', valid:true, uri:'https://unsplash.it/400/400?image=2'},
   { id:5, title:'test image 5', valid:true, uri:'https://unsplash.it/400/400?image=1'},
],
category:'category 1',
name:'item 2',
ingredient:' test ingredient',
instock: true,
recommended: false,
price: 21.22,
sale:{
   onsale:false,
   start: new Date(),
   end: new Date(),
   price:11.33,
}, 
},
*/