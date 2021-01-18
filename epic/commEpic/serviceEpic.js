import {
    GET_SERVICE,
    GET_SERVICE_SUCCESS,
    GET_SERVICE_ERROR,
    POST_SERVICE,
    POST_SERVICE_SUCCESS,
    POST_SERVICE_ERROR,
    PUT_SERVICE,
    PUT_SERVICE_SUCCESS,
    PUT_SERVICE_ERROR,
    } from '../../actiontype/commActionType/ServiceType';
import { pipe, mapTo, map, take } from 'rxjs/operators';
import { ofType } from 'redux-observable';

export const  getServiceEpic = (action$) =>
    action$.pipe(
    ofType(GET_SERVICE),
    mapTo({ type:GET_SERVICE_SUCCESS, payload:[
        {
            id:'3435',
            name: 'servie one',
            taxable: true,
            color: 'blue',
            description:'service one notes',
            imgurl:'',
            options:[{
                id:1,
                option:'tt',
                duration: 90,
                price: 89.99,
            },{
                id:2,
                option:'tt',
                duration: 80,
                price: 79.99,
            },],
            sale: {
                onsale: true,
                start: new Date(),
                end: new Date(),
                note:'onsale',
            },
           
        },
    ]})
 );

 export const  putServiceEpic = (action$) =>
    action$.pipe(
    ofType(PUT_SERVICE),
    map( (action) => ({ type:PUT_SERVICE_SUCCESS, payload:action.payload }) )
);
