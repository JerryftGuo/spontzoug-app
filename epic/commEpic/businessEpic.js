import {
    GET_BUSINESS,
    GET_BUSINESS_SUCCESS,
    GET_BUSINESS_ERROR,
    POST_BUSINESS,
    POST_BUSINESS_SUCCESS,
    POST_BUSINESS_ERROR,
    PUT_BUSINESS,
    PUT_BUSINESS_SUCCESS,
    PUT_BUSINESS_ERROR,
    } from '../../actiontype/commActionType/BusinessType';
import { pipe, mapTo, map, take } from 'rxjs/operators';
import { ofType } from 'redux-observable';

export const  getBusinessEpic = (action$) =>
    action$.pipe(
    ofType(GET_BUSINESS),
    mapTo({ type:GET_BUSINESS_SUCCESS, payload:[
        {
            id:'3435',
            name: 'servie one',
            taxable: true,
            color: 'blue',
            description:'service one notes',
            logo:'',
        },
    ]})
 );

 export const  putBusinessEpic = (action$) =>
    action$.pipe(
    ofType(PUT_BUSINESS),
    map( (action) => ({ type:PUT_BUSINESS_SUCCESS, payload:action.payload }) )
);
