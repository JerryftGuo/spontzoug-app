import {
    GET_APPOINTMENT_BYDATE,
    GET_APPOINTMENT_BYDATE_SUCCESS,
    GET_APPOINTMENT_BYPDATE_ERROR,
    SET_APPOINTMENT_LOADING,
    SET_APPOINTMENT_DATE,
    SET_APPOINTMENT_DATETIME,
    POST_APPOINTMENT,
    PUT_APPOINTMENT,
    DELETE_APPOINTMENT,
    BUILD_INVOICE,
    GET_PRACTITIONERS,
    GET_SERVICES,
    GET_CLIENTS,
    SET_APPOINTMENT_BYROOM,
    SET_APPOINTMENT_BYPRACT,
} from '../../actiontype/clinicActionType/AppointmentType';

export const getAppointmentByDate = date => ({
    type: GET_APPOINTMENT_BYDATE,
    payload: { date }
})

export const getAppointmentByDateSuccess = content => ({
    type: GET_APPOINTMENT_BYDATE_SUCCESS,
    payload: { content }
})


export const getAppointmentByDateError = err => ({
    type: GET_APPOINTMENT_BYPDATE_ERROR,
    payload: { err }
})


export const setAppointmentDate = date => ({
    type: SET_APPOINTMENT_DATE,
    payload: { date: date}
})

export const setAppointmentByRoom = appts =>({
    type: SET_APPOINTMENT_BYROOM,
    payload: appts
})

export const setAppointmentByPract = appts =>({
    type: SET_APPOINTMENT_BYPRACT,
    payload: appts
})

export const setAppointmentDateTime = datetime => ({
    type: SET_APPOINTMENT_DATETIME,
    payload: { datetime: datetime}
})

export const postAppointment = appt => ({
    type: POST_APPOINTMENT,
    payload: { appt }
})

export const putAppointment = appt => ({
    type: PUT_APPOINTMENT,
    payload: { appt }
})

export const deleteAppointment = apptid => ({
    type: DELETE_APPOINTMENT,
    payload: { id: apptid }
})

export const buildInvoice = invoiceid =>({
    type: BUILD_INVOICE,
    payload: {id:invoiceid}
});

export const getPractitioners = () =>({
    type: GET_PRACTITIONERS,
    payload:{}
})

export const getServices = () =>({
    type: GET_SERVICES,
    payload:{}
})

export const getClients = () =>({
    type: GET_CLIENTS,
    payload:{}
})


