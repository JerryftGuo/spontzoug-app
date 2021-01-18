
import {
    POST_CONFIG,
    POST_CONFIG_SUCCESS,
    POST_CONFIG_ERROR,
    GET_CONFIG,
    GET_CONFIG_SUCCESS,
    GET_CONFIG_ERROR,
    PUT_CONFIG,
    PUT_CONFIG_SUCCESS,
    PUT_CONFIG_ERROR
} from '../../actiontype/commActionType/ConfigType';

export const postConfig = (data) => ({
     type: POST_CONFIG,
     payload : data
})

export const postConfigSuccess = (data ) =>({
    type: POST_CONFIG_SUCCESS,
    payload: data 
})
export const postConfigError = (err) =>({
    type: POST_CONFIG_ERROR,
    payload: err
})


export const getConfig = () => ({
    type: GET_CONFIG,
    payload : {}
})

export const getConfigSuccess = (data ) =>({
    type: GET_CONFIG_SUCCESS,
    payload: data 
})

export const getConfigError = (err) =>({
    type: GET_CONFIG_ERROR,
    payload: err
})

export const putConfig = (data) => ({
    type: PUT_CONFIG,
    payload : data
})

export const putConfigSuccess = (data ) =>({
    type: PUT_CONFIG_SUCCESS,
    payload: data
})

export const putConfigError = (err) =>({
    type: PUT_CONFIG_ERROR,
    payload: err
})

export const getConfigs = () => ({
    type: GET_CONFIG,
    payload : {}
})

export const getConfigsSuccess = (data ) =>({
    type: GET_CONFIG_SUCCESS,
    payload: data 
})

export const getConfigsError = (err) =>({
    type: GET_CONFIG_ERROR,
    payload: err
})