
import {
    POST_MENU_CATEGORY,
    POST_MENU_CATEGORY_SUCCESS,
    POST_MENU_CATEGORY_ERROR,
    GET_MENU_CATEGORY,
    GET_MENU_CATEGORY_SUCCESS,
    GET_MENU_CATEGORY_ERROR,
    PUT_MENU_CATEGORY,
    PUT_MENU_CATEGORY_SUCCESS,
    PUT_MENU_CATEGORY_ERROR,
        POST_MENU_ITEM,
        POST_MENU_ITEM_SUCCESS,
        POST_MENU_ITEM_ERROR,
        GET_MENU_ITEM,
        GET_MENU_ITEM_SUCCESS,
        GET_MENU_ITEM_ERROR,
        PUT_MENU_ITEM,
        PUT_MENU_ITEM_SUCCESS,
        PUT_MENU_ITEM_ERROR
} from '../../actiontype/commActionType/MenuType';

export const postMenuCategory = (data) => ({
     type: POST_MENU_CATEGORY,
     payload : data
})

export const postMenuCategorySuccess = (data ) =>({
    type: POST_MENU_CATEGORY_SUCCESS,
    payload: data 
})
export const postMenuCategoryError = (err) =>({
    type: POST_MENU_CATEGORY_ERROR,
    payload: err
})


export const getMenuCategory = () => ({
    type: GET_MENU_CATEGORY,
    payload : {}
})

export const getMenuCategorySuccess = (data ) =>({
    type: GET_MENU_CATEGORY_SUCCESS,
    payload: data 
})

export const getMenuCategoryError = (err) =>({
    type: GET_MENU_CATEGORY_ERROR,
    payload: err
})

export const putMenuCategory = (data) => ({
    type: PUT_MENU_CATEGORY,
    payload : data
})

export const putMenuCategorySuccess = (data ) =>({
    type: PUT_MENU_CATEGORY_SUCCESS,
    payload: data
})

export const putMenuCategoryError = (err) =>({
    type: PUT_MENU_CATEGORY_ERROR,
    payload: err
})



export const postMenuItem = (data) => ({
     type: POST_MENU_ITEM,
     payload : data
})

export const postMenuItemSuccess = (data ) =>({
    type: POST_MENU_ITEM_SUCCESS,
    payload: data 
})
export const postMenuItemError = (err) =>({
    type: POST_MENU_ITEM_ERROR,
    payload: err
})


export const getMenuItem = () => ({
    type: GET_MENU_ITEM,
    payload : {}
})

export const getMenuItemSuccess = (data ) =>({
    type: GET_MENU_ITEM_SUCCESS,
    payload: data 
})

export const getMenuItemError = (err) =>({
    type: GET_MENU_ITEM_ERROR,
    payload: err
})

export const putMenuItem = (data) => ({
    type: PUT_MENU_ITEM,
    payload : data
})

export const putMenuItemSuccess = (data ) =>({
    type: PUT_MENU_ITEM_SUCCESS,
    payload: data
})

export const putMenuItemError = (err) =>({
    type: PUT_MENU_ITEM_ERROR,
    payload: err
})