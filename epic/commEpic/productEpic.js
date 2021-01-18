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
import { pipe, mapTo, map, take } from 'rxjs/operators';
import { ofType } from 'redux-observable';

export const  getProductCategoryEpic = (action$) =>
    action$.pipe(
    ofType(GET_PRODUCT_CATEGORY),
    mapTo({ type:GET_PRODUCT_CATEGORY_SUCCESS, payload:[
        {
            id: '121',
            name:'category 1',
            color:'red'
        },
        {
            id: '124',
            name:'category 2',
            color:'green'
        }
    ]})

 );

 export const  putProductCategoryEpic = (action$) =>
    action$.pipe(
    ofType(PUT_PRODUCT_CATEGORY),
    map( (action) => ({ type:PUT_PRODUCT_CATEGORY_SUCCESS, payload:action.payload }) )
);

  
    

export const  getProductItemEpic = (action$) =>
    action$.pipe(
    ofType(GET_PRODUCT_ITEM),
    mapTo({ type:GET_PRODUCT_ITEM_SUCCESS, payload:[
        { id: '123',
        images:[
            { id:1, title:'test image 1', valid:true, uri:'https://unsplash.it/400/400?image=1'},
            { id:2, title:'test image 2', valid:true, uri:'https://unsplash.it/400/400?image=2'},
            { id:3, title:'test image 3', valid:true, uri:'https://unsplash.it/400/400?image=3'},
            { id:4, title:'test image 4', valid:true, uri:'https://unsplash.it/400/400?image=2'},
            { id:5, title:'test image 5', valid:true, uri:'https://unsplash.it/400/400?image=1'},
        ],
        category:'category 1',
        name:'item 1',
        ingredient:' test ingredient',
        instock: true,
        recommended: true,
        price: 23.22,
        sale:{
            onsale:false,
            start: new Date(),
            end: new Date(),
            price:12.33,
        },
       },
       { id: '234',
       images:[
           { id:1, title:'test image 1', valid:true, uri:'https://unsplash.it/400/400?image=1'},
           { id:2, title:'test image 2', valid:true, uri:'https://unsplash.it/400/400?image=2'},
           { id:3, title:'test image 3', valid:true, uri:'https://unsplash.it/400/400?image=3'},
           { id:4, title:'test image 4', valid:true, uri:'https://unsplash.it/400/400?image=2'},
           { id:5, title:'test image 5', valid:true, uri:'https://unsplash.it/400/400?image=1'},
       ],
       category:'category 1',
       name:'item 2',
       ingredient:' test ingredient',
       instock: true,
       recommended: false,
       price: 21.22,
       sale:{
           onsale:false,
           start: new Date(),
           end: new Date(),
           price:11.33,
       }, 
      },
    ]})
 );

 export const  putProductItemEpic = (action$) =>
    action$.pipe(
    ofType(PUT_PRODUCT_ITEM),
    map( (action) => ({ type:PUT_PRODUCT_ITEM_SUCCESS, payload:action.payload }) )
);
