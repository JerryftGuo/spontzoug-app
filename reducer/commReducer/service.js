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

import { from, asyncScheduler, Observable, of, pipe } from 'rxjs';
import { merge, reduce, mapTo, partition } from 'rxjs/operators';

const initService = {
    loading: true,
    services:[],
    message:'',
    error:''
}

export default function(state = initService, action){
    switch ( action.type ){
        case GET_SERVICE:{
            return Object.assign({},state,{loading: true});
        }
        case GET_SERVICE_SUCCESS: {
            return Object.assign({},state, {
             services: action.payload,
             loading: false});
        }
        case GET_SERVICE_ERROR:{
            return Object.assign({},state, {error: action.payload});
        }

        case PUT_SERVICE:{
            return Object.assign({},state,{loading: true});
        }
        case PUT_SERVICE_SUCCESS: {
            
            let services = state.services;
            for( let i =0; i< services.length; i++){
                if (services[i].id === action.payload.id) {
                    services[i] = action.payload;
                }
            }
            console.warn(services)
            return Object.assign({},state, {
                services: services,
                loading: false});
    
        }
        case PUT_SERVICE_ERROR:{
            return Object.assign({},state, {error: action.payload});
        }
        case POST_SERVICE:{
            return Object.assign({},state,{loading: true});
        }
        case POST_SERVICE_SUCCESS: {
            return Object.assign({},state, {
             services: action.payload,
             loading: false});
        }
        case POST_SERVICE_ERROR:{
            return Object.assign({},state, {error: action.payload});
        }
        
        default :
            return state;
    }
}