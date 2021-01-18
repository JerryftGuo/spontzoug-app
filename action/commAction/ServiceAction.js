
import {
    POST_SERVICE,
    POST_SERVICE_SUCCESS,
    POST_SERVICE_ERROR,
    GET_SERVICE,
    GET_SERVICE_SUCCESS,
    GET_SERVICE_ERROR,
    PUT_SERVICE,
    PUT_SERVICE_SUCCESS,
    PUT_SERVICE_ERROR
} from '../../actiontype/commActionType/ServiceType';

export const postService = (data) => ({
     type: POST_SERVICE,
     payload : data
})

export const postServiceSuccess = (data ) =>({
    type: POST_SERVICE_SUCCESS,
    payload: data 
})
export const postServiceError = (err) =>({
    type: POST_SERVICE_ERROR,
    payload: err
})


export const getService = () => ({
    type: GET_SERVICE,
    payload : {}
})

export const getServiceSuccess = (data ) =>({
    type: GET_SERVICE_SUCCESS,
    payload: data 
})

export const getServiceError = (err) =>({
    type: GET_SERVICE_ERROR,
    payload: err
})

export const putService = (data) => ({
    type: PUT_SERVICE,
    payload : data
})

export const putServiceSuccess = (data ) =>({
    type: PUT_SERVICE_SUCCESS,
    payload: data
})

export const putServiceError = (err) =>({
    type: PUT_SERVICE_ERROR,
    payload: err
})