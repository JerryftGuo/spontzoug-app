
import {
    POST_LOCATION,
    POST_LOCATION_SUCCESS,
    POST_LOCATION_ERROR,
    GET_LOCATION,
    GET_LOCATION_SUCCESS,
    GET_LOCATION_ERROR,
    PUT_LOCATION,
    PUT_LOCATION_SUCCESS,
    PUT_LOCATION_ERROR
} from '../../actiontype/commActionType/LocationType';

export const postLocation = (data) => ({
     type: POST_LOCATION,
     payload : data
})

export const postLocationSuccess = (data ) =>({
    type: POST_LOCATION_SUCCESS,
    payload: data
})
export const postLocationError = (err) =>({
    type: POST_LOCATION_ERROR,
    payload:err
})


export const getLocation = () => ({
    type: GET_LOCATION,
    payload : {}
})

export const getLocationSuccess = (data ) =>({
    type: GET_LOCATION_SUCCESS,
    payload: data 
})

export const getLocationError = (err) =>({
    type: GET_LOCATION_ERROR,
    payload: err
})

export const putLocation = (data) => ({
    type: PUT_LOCATION,
    payload : data
})

export const putLocationSuccess = (data ) =>({
    type: PUT_LOCATION_SUCCESS,
    payload: data
})

export const putLocationError = (err) =>({
    type: PUT_LOCATION_ERROR,
    payload: err
})