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

import { from, asyncScheduler, Observable, of, pipe } from 'rxjs';
import { merge, reduce, mapTo, partition } from 'rxjs/operators';

const initBusiness = {
    loading: true,
    business:{},
    message:'',
    error:''
}

export default function(state = initBusiness, action){
    switch ( action.type ){
        case GET_BUSINESS:{
            return Object.assign({},state,{loading: true});
        }
        case GET_BUSINESS_SUCCESS: {
            return Object.assign({},state, {
             business: action.payload,
             loading: false});
        }
        case GET_BUSINESS_ERROR:{
            return Object.assign({},state, {error: action.payload});
        }

        case PUT_BUSINESS:{
            return Object.assign({},state,{loading: true});
        }
        case PUT_BUSINESS_SUCCESS: {
            return Object.assign({},state, {
                action: payload,
                loading: false});
    
        }
        case PUT_BUSINESS_ERROR:{
            return Object.assign({},state, {error: action.payload});
        }
        case POST_BUSINESS:{
            return Object.assign({},state,{loading: true});
        }
        case POST_BUSINESS_SUCCESS: {
            return Object.assign({},state, {
             business: action.payload,
             loading: false});
        }
        case POST_BUSINESS_ERROR:{
            return Object.assign({},state, {error: action.payload});
        }
        
        default :
            return state;
    }
}