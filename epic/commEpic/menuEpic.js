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
import { pipe, mapTo, map, take } from 'rxjs/operators';
import { ofType } from 'redux-observable';

export const  getMenuCategoryEpic = (action$) =>
    action$.pipe(
    ofType(GET_MENU_CATEGORY),
    mapTo({ type:GET_MENU_CATEGORY_SUCCESS, payload:[
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

 export const  putMenuCategoryEpic = (action$) =>
    action$.pipe(
    ofType(PUT_MENU_CATEGORY),
    map( (action) => ({ type:PUT_MENU_CATEGORY_SUCCESS, payload:action.payload }) )
);

  
    

export const  getMenuItemEpic = (action$) =>
    action$.pipe(
    ofType(GET_MENU_ITEM),
    mapTo({ type:GET_MENU_ITEM_SUCCESS, payload:[
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

 export const  putMenuItemEpic = (action$) =>
    action$.pipe(
    ofType(PUT_MENU_ITEM),
    map( (action) => ({ type:PUT_MENU_ITEM_SUCCESS, payload:action.payload }) )
);
