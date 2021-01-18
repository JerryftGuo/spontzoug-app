
import {
    POST_CONFIGURABLE_CATEGORY,
    POST_CONFIGURABLE_CATEGORY_SUCCESS,
    POST_CONFIGURABLE_CATEGORY_ERROR,
    GET_CONFIGURABLE_CATEGORY,
    GET_CONFIGURABLE_CATEGORY_SUCCESS,
    GET_CONFIGURABLE_CATEGORY_ERROR,
    PUT_CONFIGURABLE_CATEGORY,
    PUT_CONFIGURABLE_CATEGORY_SUCCESS,
    PUT_CONFIGURABLE_CATEGORY_ERROR,
        POST_CONFIGURABLE_ITEM,
        POST_CONFIGURABLE_ITEM_SUCCESS,
        POST_CONFIGURABLE_ITEM_ERROR,
        GET_CONFIGURABLE_ITEM,
        GET_CONFIGURABLE_ITEM_SUCCESS,
        GET_CONFIGURABLE_ITEM_ERROR,
        PUT_CONFIGURABLE_ITEM,
        PUT_CONFIGURABLE_ITEM_SUCCESS,
        PUT_CONFIGURABLE_ITEM_ERROR
} from '../../actiontype/commActionType/ConfigurableType';

export const postConfigurableCategory = (key,data) => ({
     type: POST_CONFIGURABLE_CATEGORY,
     key: key,
     payload : data
})

export const postConfigurableCategorySuccess = (key, data ) =>({
    type: POST_CONFIGURABLE_CATEGORY_SUCCESS,
    key: key,
    payload: data 
})
export const postConfigurableCategoryError = (key,err) =>({
    type: POST_CONFIGURABLE_CATEGORY_ERROR,
    key: key,
    payload: err
})


export const getConfigurableCategory = (key) => ({
    type: GET_CONFIGURABLE_CATEGORY,
    key: key,
    payload : {}
})

export const getConfigurableCategorySuccess = (key, data ) =>({
    type: GET_CONFIGURABLE_CATEGORY_SUCCESS,
    key: key,
    payload: data 
})

export const getConfigurableCategoryError = (key, err) =>({
    type: GET_CONFIGURABLE_CATEGORY_ERROR,
    key: key,
    payload: err
})

export const putConfigurableCategory = (kye,data) => ({
    type: PUT_CONFIGURABLE_CATEGORY,
    key: key,
    payload : data
})

export const putConfigurableCategorySuccess = (key,data ) =>({
    type: PUT_CONFIGURABLE_CATEGORY_SUCCESS,
    key: key,
    payload: data
})

export const putConfigurableCategoryError = (key,err) =>({
    type: PUT_CONFIGURABLE_CATEGORY_ERROR,
    key: key,
    payload: err
})



export const postConfigurableItem = (key,data) => ({
     type: POST_CONFIGURABLE_ITEM,
     key: key,
     payload : data
})

export const postConfigurableItemSuccess = (key,data ) =>({
    type: POST_CONFIGURABLE_ITEM_SUCCESS,
    key: key,
    payload: data 
})
export const postConfigurableItemError = (key,err) =>({
    type: POST_CONFIGURABLE_ITEM_ERROR,
    key: key,
    payload: err
})


export const getConfigurableItem = (key) => ({
    type: GET_CONFIGURABLE_ITEM,
    key: key,
    payload : {}
})

export const getConfigurableItemSuccess = (key,data ) =>({
    type: GET_CONFIGURABLE_ITEM_SUCCESS,
    key: key,
    payload: data 
})

export const getConfigurableItemError = (key,err) =>({
    type: GET_CONFIGURABLE_ITEM_ERROR,
    key: key,
    payload: err
})

export const putConfigurableItem = (key,data) => ({
    type: PUT_CONFIGURABLE_ITEM,
    key: key,
    payload : data
})

export const putConfigurableItemSuccess = (key, data ) =>({
    type: PUT_CONFIGURABLE_ITEM_SUCCESS,
    key: key,
    payload: data
})

export const putConfigurableItemError = (key,err) =>({
    type: PUT_CONFIGURABLE_ITEM_ERROR,
    key: key,
    payload: err
})