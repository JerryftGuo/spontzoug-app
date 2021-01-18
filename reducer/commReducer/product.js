import {
    GET_PRODUCT_CATEGORY,
    GET_PRODUCT_CATEGORY_SUCCESS,
    GET_PRODUCT_CATEGORY_ERROR,
    POST_PRODUCT_CATEGORY,
    POST_PRODUCT_CATEGORY_SUCCESS,
    POST_PRODUCT_CATEGORY_ERROR,
    PUT_PRODUCT_CATEGORY,
    PUT_PRODUCT_CATEGORY_SUCCESS,
    PUT_PRODUCT_CATEGORY_ERROR,
    GET_PRODUCT_ITEM,
    GET_PRODUCT_ITEM_SUCCESS,
    GET_PRODUCT_ITEM_ERROR,
    POST_PRODUCT_ITEM,
    POST_PRODUCT_ITEM_SUCCESS,
    POST_PRODUCT_ITEM_ERROR,
    PUT_PRODUCT_ITEM,
    PUT_PRODUCT_ITEM_SUCCESS,
    PUT_PRODUCT_ITEM_ERROR,
   
} from '../../actiontype/commActionType/ProductType';

import { from, asyncScheduler, Observable, of, pipe } from 'rxjs';
import { merge, reduce, mapTo, partition } from 'rxjs/operators';


const initProduct = {
    loading: true,
    items:[],
    categories:[],    
    message:'',
    error:''
}

export default function(state = initProduct, action){
    switch ( action.type ){
        case GET_PRODUCT_CATEGORY:{
            return Object.assign({},state,{loading: true});
        }
        case GET_PRODUCT_CATEGORY_SUCCESS: {
            return Object.assign({},state, {
             categories: action.payload,
             loading: false});
        }
        case GET_PRODUCT_CATEGORY_ERROR:{
            return Object.assign({},state, {error: action.payload});
        }

        case PUT_PRODUCT_CATEGORY:{
            return Object.assign({},state,{loading: true});
        }
        case PUT_PRODUCT_CATEGORY_SUCCESS: {
            
            let categories = state.categories;
            for( let i =0; i< categories.length; i++){
                if (categories[i].id === action.payload.id) {
                    categories[i] = action.payload;
                }
            }
            console.warn(categories)
            return Object.assign({},state, {
                categories: categories,
                loading: false});
    
        }
        case PUT_PRODUCT_CATEGORY_ERROR:{
            return Object.assign({},state, {error: action.payload});
        }
        case POST_PRODUCT_CATEGORY:{
            return Object.assign({},state,{loading: true});
        }
        case POST_PRODUCT_CATEGORY_SUCCESS: {
            return Object.assign({},state, {
             categories: action.payload,
             loading: false});
        }
        case POST_PRODUCT_CATEGORY_ERROR:{
            return Object.assign({},state, {error: action.payload});
        }
        case GET_PRODUCT_ITEM:{
            return Object.assign({},state,{loading: true});
        }
        case GET_PRODUCT_ITEM_SUCCESS: {
            return Object.assign({},state, {
             items: action.payload,
             loading: false});
        }
        case GET_PRODUCT_ITEM_ERROR:{
            return Object.assign({},state, {error: action.payload});
        }

        case PUT_PRODUCT_ITEM:{
            return Object.assign({},state,{loading: true});
        }
        case PUT_PRODUCT_ITEM_SUCCESS: {
            
            let items = state.items;
            for( let i =0; i< items.length; i++){
                if (items[i].id === action.payload.id) {
                    items[i] = action.payload;
                }
            }
            console.warn(items)
            return Object.assign({},state, {
                items: items,
                loading: false});
    
        }
        case PUT_PRODUCT_ITEM_ERROR:{
            return Object.assign({},state, {error: action.payload});
        }
        case POST_PRODUCT_ITEM:{
            return Object.assign({},state,{loading: true});
        }
        case POST_PRODUCT_ITEM_SUCCESS: {
            return Object.assign({},state, {
             items: action.payload,
             loading: false});
        }
        case POST_PRODUCT_ITEM_ERROR:{
            return Object.assign({},state, {error: action.payload});
        }
        default :
            return state;
    }
}
