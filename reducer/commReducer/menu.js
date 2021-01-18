import {
    GET_MENU_CATEGORY,
    GET_MENU_CATEGORY_SUCCESS,
    GET_MENU_CATEGORY_ERROR,
    POST_MENU_CATEGORY,
    POST_MENU_CATEGORY_SUCCESS,
    POST_MENU_CATEGORY_ERROR,
    PUT_MENU_CATEGORY,
    PUT_MENU_CATEGORY_SUCCESS,
    PUT_MENU_CATEGORY_ERROR,
    GET_MENU_ITEM,
    GET_MENU_ITEM_SUCCESS,
    GET_MENU_ITEM_ERROR,
    POST_MENU_ITEM,
    POST_MENU_ITEM_SUCCESS,
    POST_MENU_ITEM_ERROR,
    PUT_MENU_ITEM,
    PUT_MENU_ITEM_SUCCESS,
    PUT_MENU_ITEM_ERROR,
   
} from '../../actiontype/commActionType/MenuType';

import { from, asyncScheduler, Observable, of, pipe } from 'rxjs';
import { merge, reduce, mapTo, partition } from 'rxjs/operators';


const initMenu = {
    loading: true,
    items:[],
    categories:[],    
    message:'',
    error:''
}

export default function(state = initMenu, action){
    switch ( action.type ){
        case GET_MENU_CATEGORY:{
            return Object.assign({},state,{loading: true});
        }
        case GET_MENU_CATEGORY_SUCCESS: {
            return Object.assign({},state, {
             categories: action.payload,
             loading: false});
        }
        case GET_MENU_CATEGORY_ERROR:{
            return Object.assign({},state, {error: action.payload});
        }

        case PUT_MENU_CATEGORY:{
            return Object.assign({},state,{loading: true});
        }
        case PUT_MENU_CATEGORY_SUCCESS: {
            
            let categories = state.categories;
            for( let i =0; i< categories.length; i++){
                if (categories[i].id === action.payload.id) {
                    categories[i] = action.payload;
                }
            }
            return Object.assign({},state, {
                categories: categories,
                loading: false});
    
        }
        case PUT_MENU_CATEGORY_ERROR:{
            return Object.assign({},state, {error: action.payload});
        }
        case POST_MENU_CATEGORY:{
            return Object.assign({},state,{loading: true});
        }
        case POST_MENU_CATEGORY_SUCCESS: {
            return Object.assign({},state, {
             categories: action.payload,
             loading: false});
        }
        case POST_MENU_CATEGORY_ERROR:{
            return Object.assign({},state, {error: action.payload});
        }
        case GET_MENU_ITEM:{
            return Object.assign({},state,{loading: true});
        }
        case GET_MENU_ITEM_SUCCESS: {
            return Object.assign({},state, {
             items: action.payload,
             loading: false});
        }
        case GET_MENU_ITEM_ERROR:{
            return Object.assign({},state, {error: action.payload});
        }

        case PUT_MENU_ITEM:{
            return Object.assign({},state,{loading: true});
        }
        case PUT_MENU_ITEM_SUCCESS: {
            
            let items = state.items;
            for( let i =0; i< items.length; i++){
                if (items[i].id === action.payload.id) {
                    items[i] = action.payload;
                }
            }
    
            return Object.assign({},state, {
                items: items,
                loading: false});
    
        }
        case PUT_MENU_ITEM_ERROR:{
            return Object.assign({},state, {error: action.payload});
        }
        case POST_MENU_ITEM:{
            return Object.assign({},state,{loading: true});
        }
        case POST_MENU_ITEM_SUCCESS: {
            return Object.assign({},state, {
             items: action.payload,
             loading: false});
        }
        case POST_MENU_ITEM_ERROR:{
            return Object.assign({},state, {error: action.payload});
        }
        default :
            return state;
    }
}
