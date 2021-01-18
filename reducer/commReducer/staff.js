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

import { from, asyncScheduler, Observable, of, pipe } from 'rxjs';
import { merge, reduce, mapTo, partition } from 'rxjs/operators';

const initStaff = {
    loading: true,
    staffs:[],
    message:'',
    error:''
}

export default function(state = initStaff, action){
    switch ( action.type ){
        case GET_STAFF:{
            return Object.assign({},state,{loading: true});
        }
        case GET_STAFF_SUCCESS: {
            return Object.assign({},state, {
             staffs: action.payload,
             loading: false});
        }
        case GET_STAFF_ERROR:{
            return Object.assign({},state, {error: action.payload});
        }

        case PUT_STAFF:{
            return Object.assign({},state,{loading: true});
        }
        case PUT_STAFF_SUCCESS: {
            
            let staffs = state.staffs;
            for( let i =0; i< staffs.length; i++){
                if (staffs[i].id === action.payload.id) {
                    staffs[i] = action.payload;
                }
            }
            console.warn(staffs)
            return Object.assign({},state, {
                staffs: staffs,
                loading: false});
    
        }
        case PUT_STAFF_ERROR:{
            return Object.assign({},state, {error: action.payload});
        }
        case POST_STAFF:{
            return Object.assign({},state,{loading: true});
        }
        case POST_STAFF_SUCCESS: {
            return Object.assign({},state, {
             staffs: action.payload,
             loading: false});
        }
        case POST_STAFF_ERROR:{
            return Object.assign({},state, {error: action.payload});
        }
        
        default :
            return state;
    }
}