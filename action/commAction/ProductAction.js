
import {
    POST_PRODUCT_CATEGORY,
    POST_PRODUCT_CATEGORY_SUCCESS,
    POST_PRODUCT_CATEGORY_ERROR,
    GET_PRODUCT_CATEGORY,
    GET_PRODUCT_CATEGORY_SUCCESS,
    GET_PRODUCT_CATEGORY_ERROR,
    PUT_PRODUCT_CATEGORY,
    PUT_PRODUCT_CATEGORY_SUCCESS,
    PUT_PRODUCT_CATEGORY_ERROR,
        POST_PRODUCT_ITEM,
        POST_PRODUCT_ITEM_SUCCESS,
        POST_PRODUCT_ITEM_ERROR,
        GET_PRODUCT_ITEM,
        GET_PRODUCT_ITEM_SUCCESS,
        GET_PRODUCT_ITEM_ERROR,
        PUT_PRODUCT_ITEM,
        PUT_PRODUCT_ITEM_SUCCESS,
        PUT_PRODUCT_ITEM_ERROR
} from '../../actiontype/commActionType/ProductType';

export const postProductCategory = (data) => ({
     type: POST_PRODUCT_CATEGORY,
     payload : data
})

export const postProductCategorySuccess = (data ) =>({
    type: POST_PRODUCT_CATEGORY_SUCCESS,
    payload: data 
})
export const postProductCategoryError = (err) =>({
    type: POST_PRODUCT_CATEGORY_ERROR,
    payload: err
})


export const getProductCategory = () => ({
    type: GET_PRODUCT_CATEGORY,
    payload : {}
})

export const getProductCategorySuccess = (data ) =>({
    type: GET_PRODUCT_CATEGORY_SUCCESS,
    payload: data 
})

export const getProductCategoryError = (err) =>({
    type: GET_PRODUCT_CATEGORY_ERROR,
    payload: err
})

export const putProductCategory = (data) => ({
    type: PUT_PRODUCT_CATEGORY,
    payload : data
})

export const putProductCategorySuccess = (data ) =>({
    type: PUT_PRODUCT_CATEGORY_SUCCESS,
    payload: data
})

export const putProductCategoryError = (err) =>({
    type: PUT_PRODUCT_CATEGORY_ERROR,
    payload: err
})



export const postProductItem = (data) => ({
     type: POST_PRODUCT_ITEM,
     payload : data
})

export const postProductItemSuccess = (data ) =>({
    type: POST_PRODUCT_ITEM_SUCCESS,
    payload: data 
})
export const postProductItemError = (err) =>({
    type: POST_PRODUCT_ITEM_ERROR,
    payload: err
})


export const getProductItem = () => ({
    type: GET_PRODUCT_ITEM,
    payload : {}
})

export const getProductItemSuccess = (data ) =>({
    type: GET_PRODUCT_ITEM_SUCCESS,
    payload: data 
})

export const getProductItemError = (err) =>({
    type: GET_PRODUCT_ITEM_ERROR,
    payload: err
})

export const putProductItem = (data) => ({
    type: PUT_PRODUCT_ITEM,
    payload : data
})

export const putProductItemSuccess = (data ) =>({
    type: PUT_PRODUCT_ITEM_SUCCESS,
    payload: data
})

export const putProductItemError = (err) =>({
    type: PUT_PRODUCT_ITEM_ERROR,
    payload: err
})