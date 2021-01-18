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

import { from, asyncScheduler, Observable, of, pipe } from 'rxjs';
import { merge, reduce, mapTo, partition } from 'rxjs/operators';

const initLocation = {
    loading: true,
    locations:[],
    message:'',
    error:''
}

export default function(state = initLocation, action){
    switch ( action.type ){
        case GET_LOCATION:{
            return Object.assign({},state,{loading: true});
        }
        case GET_LOCATION_SUCCESS: {
            return Object.assign({},state, {
             locations: action.payload,
             loading: false});
        }
        case GET_LOCATION_ERROR:{
            return Object.assign({},state, {error: action.payload});
        }

        case PUT_LOCATION:{
            return Object.assign({},state,{loading: true});
        }
        case PUT_LOCATION_SUCCESS: {
            
            let locations = state.locations;
            for( let i =0; i< locations.length; i++){
                if (locations[i].id === action.payload.id) {
                    locations[i] = action.payload;
                }
            }
            console.warn(locations)
            return Object.assign({},state, {
                locations: locations,
                loading: false});
        
    
        }
        case PUT_LOCATION_ERROR:{
            return Object.assign({},state, {error: action.payload});
        }
        case POST_LOCATION:{
            return Object.assign({},state,{loading: true});
        }
        case POST_LOCATION_SUCCESS: {
            return Object.assign({},state, {
             locations: action.payload,
             loading: false});
        }
        case POST_LOCATION_ERROR:{
            return Object.assign({},state, {error: action.payload});
        }
        
        default :
            return state;
    }
}