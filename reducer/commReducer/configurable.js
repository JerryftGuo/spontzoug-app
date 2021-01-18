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

import { from, asyncScheduler, Observable, of, pipe } from 'rxjs';
import { merge, reduce, mapTo, partition } from 'rxjs/operators';


const initConfigurable = {
    loading: true,
    items:[],
    categories:[],    
    message:'',
    error:''
}

export default function(state = initConfigurable, action){
    switch ( action.type ){
        case GET_CONFIGURABLE_CATEGORY:{

            return Object.assign({},state,{loading: true});
        }
        case GET_CONFIGURABLE_CATEGORY_SUCCESS: {
            return Object.assign({},state, {
             categories: { [action.key]: action.payload },
             loading: false});
        }
        case GET_CONFIGURABLE_CATEGORY_ERROR:{
            return Object.assign({},state, {error: action.payload});
        }

        case PUT_CONFIGURABLE_CATEGORY:{
            return Object.assign({},state,{loading: true});
        }
        case PUT_CONFIGURABLE_CATEGORY_SUCCESS: {

            let categories = state.categories[action.key];
            for( let i =0; i< categories.length; i++){
                if (categories[i].id === action.payload.id) {
                    categories[i] = action.payload;
                }
            }
            return Object.assign({},state, {
                categories: { [action.key]:categories },
                loading: false});
    
        }
        case PUT_CONFIGURABLE_CATEGORY_ERROR:{
            return Object.assign({},state, {error: action.payload});
        }
        case POST_CONFIGURABLE_CATEGORY:{
            return Object.assign({},state,{loading: true});
        }
        case POST_CONFIGURABLE_CATEGORY_SUCCESS: {

            return Object.assign({},state, {
                categories: { ...state.categories,
                    [action.key]: [...state.categories[action.key], action.payload] },
                loading: false});
        }
        case POST_CONFIGURABLE_CATEGORY_ERROR:{
            return Object.assign({},state, {error: action.payload});
        }



        case GET_CONFIGURABLE_ITEM:{

            return Object.assign({},state,{loading: true});
        }
        case GET_CONFIGURABLE_ITEM_SUCCESS: {
            return Object.assign({},state, {
                items: { [action.key]: action.payload },
                loading: false});
        }
        case GET_CONFIGURABLE_ITEM_ERROR:{
            return Object.assign({},state, {error: action.payload});
        }

        case PUT_CONFIGURABLE_ITEM:{
            return Object.assign({},state,{loading: true});
        }
        case PUT_CONFIGURABLE_ITEM_SUCCESS: {
            let items = state.items[action.key];
            for( let i =0; i< items.length; i++){
                if (items[i].id === action.payload.id) {
                    items[i] = action.payload;
                }
            }
    
            return Object.assign({},state, {
                items: { [action.key]:items },
                loading: false});
    
        }
        case PUT_CONFIGURABLE_ITEM_ERROR:{
            return Object.assign({},state, {error: action.payload});
        }
        case POST_CONFIGURABLE_ITEM:{
console.warn('post:'+ JSON.stringify(action.payload))
            return Object.assign({},state,{loading: true});
        }
        case POST_CONFIGURABLE_ITEM_SUCCESS: {
            return Object.assign({},state, {
                message: action.payload,
                loading: false});
        }
        case POST_CONFIGURABLE_ITEM_ERROR:{
            return Object.assign({},state, {error: action.payload});
        }
        default :
            return state;
    }
}

/*
return Object.assign({},state, {
    items: { ...state.items,
        [action.key]: [...state.items[action.key], action.payload] },
    loading: false});
    */