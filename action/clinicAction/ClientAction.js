
import { SET_CLIENT_LOADING,
     SET_CLIENT_SEARCHKEY,
     SEARCH_CLIENT_FAMILY,
     SEARCH_CLIENT_FAMILY_SUCCESS,
     SEARCH_CLIENT_FAMILY_ERROR,
     POST_CLIENT_FAMILY,
     POST_CLIENT_FAMILY_SUCCESS,
     POST_CLIENT_FAMILY_ERROR,
     PUT_CLIENT_FAMILY,
     PUT_CLIENT_FAMILY_SUCCESS,
     PUT_CLIENT_FAMILY_ERROR
    } from '../../actiontype/clinicActionType/ClientType';

export const setClientLoading = loading =>({
    type: SET_CLIENT_LOADING,
    payload: { loading:loading}
})

export const setClientSearchKey = key =>({
    type: SET_CLIENT_SEARCHKEY,
    payload: { search:key }
})


export const searchClientMember = key => ({
    type: SEARCH_CLIENT_MEMBER,
    payload: { search: key }
})

export const searchClientMemberSuccess = content =>({
    type: SEARCH_CLIENT_MEMBER_SUCCESS,
    payload : { content }
})

export const searchClientMemberError = error =>({
    type: SEARCH_CLIENT_MEMBER_ERROR,
    payload: { error }
})

export const searchClientFamily = key => ({
    type: SEARCH_CLIENT_FAMILY,
    payload: { search: key }
})

export const searchClientFAMILYSuccess = content =>({
    type: SEARCH_CLIENT_FAMILY_SUCCESS,
    payload : { content }
})

export const searchClienFamilyError = error =>({
    type: SEARCH_CLIENT_FAMILY_ERROR,
    payload: { error }
})



export const postClientFamily = family => ({
    type: POST_CLIENT_FAMILY,
    payload: { family }
})

export const postClientFamilySuccess = content =>({
    type: POST_CLIENT_FAMILY_SUCCESS,
    payload : { content }
})

export const postClientFamilyError = error =>({
    type: POST_CLIENT_FAMILY_ERROR,
    payload: { error }
})

export const putClientFamily = family => ({
    type: PUT_CLIENT_FAMILY,
    payload: { family }
})

export const putClientFamilySuccess = content =>({
    type: PUT_CLIENT_FAMILY_SUCCESS,
    payload : { content }
})

export const putClientFamilyError = error =>({
    type: PUT_CLIENT_FAMILY_ERROR,
    payload: { error }
})