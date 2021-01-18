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

const initReport = {
    reportdate: {},
    loading: true,
    dayreport:{},
    monthreport:[],
    message:'',
    error:''
}

export default function(state = initReport, action){
    switch ( action.type ){
        case GET_DAY_REPORT:{
            return Object.assign({},state,{loading: true});
        }
        case GET_DAY_REPORT_SUCCESS: {
            return Object.assign({},state, {
             dayreport: action.payload,
             loading: false});
        }
        case GET_DAY_REPORT_ERROR:{
            return Object.assign({},state, {error: action.payload});
        }
        case GET_MONTH_REPORT:{
            return Object.assign({},state,{loading: action.payload.loading});
        }
        case GET_MONTH_REPORT_SUCCESS:{
            return Object.assign({},state, {monthreport: action.payload});
        }
        case GET_MONTH_REPORT_ERROR:{
            return Object.assign({},state, {error: action.payload});
        }
        case SET_REPORT_DATE: {
            return Object.assign({},state,{reportdate: action.payload.date});
        }
        case SET_REPORT_MONTH: {
            return Object.assign({}, state,{ reportmonth: action.payload});
        }
        default :
            return state;
    }
}