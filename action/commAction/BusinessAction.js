
import {
    POST_BUSINESS,
    POST_BUSINESS_SUCCESS,
    POST_BUSINESS_ERROR,
    GET_BUSINESS,
    GET_BUSINESS_SUCCESS,
    GET_BUSINESS_ERROR,
    PUT_BUSINESS,
    PUT_BUSINESS_SUCCESS,
    PUT_BUSINESS_ERROR
} from '../../actiontype/commActionType/BusinessType';

export const postBusiness = (data) => ({
     type: POST_BUSINESS,
     payload : data
})

export const postBusinessSuccess = (data ) =>({
    type: POST_BUSINESS_SUCCESS,
    payload: data 
})
export const postBusinessError = (err) =>({
    type: POST_BUSINESS_ERROR,
    payload: err
})


export const getBusiness = () => ({
    type: GET_BUSINESS,
    payload : {}
})

export const getBusinessSuccess = (data ) =>({
    type: GET_BUSINESS_SUCCESS,
    payload: data 
})

export const getBusinessError = (err) =>({
    type: GET_BUSINESS_ERROR,
    payload: err
})

export const putBusiness = (data) => ({
    type: PUT_BUSINESS,
    payload : data
})

export const putBusinessSuccess = (data ) =>({
    type: PUT_BUSINESS_SUCCESS,
    payload: data
})

export const putBusinessError = (err) =>({
    type: PUT_BUSINESS_ERROR,
    payload: err
})