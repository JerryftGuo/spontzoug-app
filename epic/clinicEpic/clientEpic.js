import {
    SEARCH_CLIENT_FAMILY,
    SEARCH_CLIENT_FAMILY_SUCCESS,
    SEARCH_CLIENT_FAMILY_ERROR,
    POST_CLIENT_FAMILY,
    POST_CLIENT_FAMILY_SUCCESS,
    POST_CLIENT_FMIALY_ERROR,
    PUT_CLIENT_FAMILY,
    PUT_CLIENT_FAMILY_SUCCESS,
    PUT_CLIENT_FMIALY_ERROR
        } from '../../actiontype/clinicActionType/ClientType';
import { pipe, mapTo } from 'rxjs/operators';
import { ofType } from 'redux-observable';

export const  postClientFamilyEpic = (action$) => 
    action$.pipe(
    ofType(POST_CLIENT_FAMILY),
    mapTo({ type:POST_CLIENT_FAMILY_SUCCESS, payload:'test'})
 );

 export const  putClientFamilyEpic = (action$) => 
    action$.pipe(
    ofType(POST_CLIENT_FAMILY),
    mapTo({ type:POST_CLIENT_FAMILY_SUCCESS, payload: action$.payload})
 );

 export const searchClientFamilyEpic = (action$) => 
     action$.pipe(
    ofType(SEARCH_CLIENT_FAMILY),
    mapTo({ type:SEARCH_CLIENT_FAMILY_SUCCESS, payload:[
        { 
            id: '1',
            phone: '4032303355',
            address: {
                street: ' 32 edghiell dr',
                city: 'Calgary',
                province: 'AB',
                postcode: 'T3a 2R9'
            },
            members:[
                {
                    id: 1,
                    firstname: 'Jerry',
                    lastname: 'Guo',
                    phone:'4032304455',
                    email:'ft_guo@yahoo.ca',
                    primary: false
                },
            ]
        },
        ]
     })
    );