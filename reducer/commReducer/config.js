import {
    GET_CONFIG,
    GET_CONFIG_SUCCESS,
    GET_CONFIG_ERROR,
    GET_CONFIGS,
    GET_CONFIGS_SUCCESS,
    GET_CONFIGS_ERROR,
    POST_CONFIG,
    POST_CONFIG_SUCCESS,
    POST_CONFIG_ERROR,
    PUT_CONFIG,
    PUT_CONFIG_SUCCESS,
    PUT_CONFIG_ERROR,
   
} from '../../actiontype/commActionType/ConfigType';

import { from, asyncScheduler, Observable, of, pipe } from 'rxjs';
import { merge, reduce, mapTo, partition } from 'rxjs/operators';

const initConfig = {
    loading: true,
    configs:[],
    config:{
       
    },
    message:'',
    error:''
}

export default function(state = initConfig, action){
    switch ( action.type ){
        case GET_CONFIG:{
            return Object.assign({},state,{loading: true});
        }
        case GET_CONFIG_SUCCESS: {
            return Object.assign({},state, {
             config: action.payload,
             loading: false});
        }
        case GET_CONFIG_ERROR:{
            return Object.assign({},state, {error: action.payload});
        }

        case GET_CONFIGS:{
            return Object.assign({},state,{loading: true});
        }
        case GET_CONFIGS_SUCCESS: {
            return Object.assign({},state, {
             configs: action.payload,
             loading: false});
        }
        case GET_CONFIGS_ERROR:{
            return Object.assign({},state, {error: action.payload});
        }

        case PUT_CONFIG:{
            return Object.assign({},state,{loading: true});
        }
        case PUT_CONFIG_SUCCESS: {
            
            let configs = state.configs;
            for( let i =0; i< configs.length; i++){
                if (configs[i].id === action.payload.id) {
                    configs[i] = action.payload;
                }
            }
            return Object.assign({},state, {
                configs: configs,
                loading: false});
    
        }
        case PUT_CONFIG_ERROR:{
            return Object.assign({},state, {error: action.payload});
        }
        case POST_CONFIG:{
            return Object.assign({},state,{loading: true});
        }
        case POST_CONFIG_SUCCESS: {
            return Object.assign({},state, {
             configs: action.payload,
             loading: false});
        }
        case POST_CONFIG_ERROR:{
            return Object.assign({},state, {error: action.payload});
        }
        
        default :
            return state;
    }
}