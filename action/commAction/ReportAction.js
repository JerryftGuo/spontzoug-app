import {
    GET_DAY_REPORT,
    GET_DAY_REPORT_SUCCESS,
    GET_DAY_REPORT_ERROR,
    GET_MONTH_REPORT,
    GET_MONTH_REPORT_SUCCESS,
    GET_MONTH_REPORT_ERROR,
    SET_REPORT_DATE,
    SET_REPORT_MONTH
} from '../../actiontype/commActionType/ReportType';



export const getDayReport = (date) =>({
    type: GET_DAY_REPORT,
    payload: { date }
})
export const getDayReportSuccess = report =>({
    type: GET_DAY_REPORT_SUCCESS,
    payload: {report}
})
export const getDayReportError = err =>({
    type: GET_DAY_REPORT_ERROR,
    payload: { err}
})

export const getMonthReport = () =>({
    type: GET_MONTH_REPORT,
    payload: {loading: true}
})
export const getMonthReportSuccess = report =>({
    type: GET_MONTH_REPORT_SUCCESS,
    payload: {report}
})
export const getMonthReportError = err =>({
    type: GET_MONTH_REPORT_ERROR,
    payload: { err}
})


export const setReportDate = date =>({
    type: SET_REPORT_DATE,
    payload: {date}
})
export const setReportMonth = month =>({
    type: SET_REPORT_MONTH,
    payload: {month}
})