
import {
    POST_STAFF,
    POST_STAFF_SUCCESS,
    POST_STAFF_ERROR,
    GET_STAFF,
    GET_STAFF_SUCCESS,
    GET_STAFF_ERROR,
    PUT_STAFF,
    PUT_STAFF_SUCCESS,
    PUT_STAFF_ERROR
} from '../../actiontype/commActionType/StaffType';

export const postStaff = (data) => ({
     type: POST_STAFF,
     payload : data
})

export const postStaffSuccess = (data ) =>({
    type: POST_STAFF_SUCCESS,
    payload: data 
})
export const postStaffError = (err) =>({
    type: POST_STAFF_ERROR,
    payload: err
})


export const getStaff = () => ({
    type: GET_STAFF,
    payload : {}
})

export const getStaffSuccess = (data ) =>({
    type: GET_STAFF_SUCCESS,
    payload: data 
})

export const getStaffError = (err) =>({
    type: GET_STAFF_ERROR,
    payload: err
})

export const putStaff = (data) => ({
    type: PUT_STAFF,
    payload : data
})

export const putStaffSuccess = (data ) =>({
    type: PUT_STAFF_SUCCESS,
    payload: data
})

export const putStaffError = (err) =>({
    type: PUT_STAFF_ERROR,
    payload: err
})