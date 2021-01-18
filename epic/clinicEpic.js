import { combineEpics } from 'redux-observable';
import { searchClientFamilyEpic,
    postClientFamilyEpic,
    putClientFamilyEpic
    } from './clinicEpic/clientEpic';
import { getAppointmentByDateEpic
    } from './clinicEpic/appointmentEpic';
import {
    getDayReportEpic,
    getMonthReportEpic
} from './commEpic/reportEpic';
import {
    getLocationEpic,
    putLocationEpic
} from './commEpic/locationEpic';
import {
    getStaffEpic,
    putStaffEpic
} from './commEpic/staffEpic';
import {
    getServiceEpic,
    putServiceEpic
} from './commEpic/serviceEpic';
import {
    getMenuCategoryEpic,
    getMenuItemEpic,
    putMenuCategoryEpic,
    putMenuItemEpic,
} from './commEpic/menuEpic';
import {
    getProductCategoryEpic,
    getProductItemEpic,
    putProductCategoryEpic,
    putProductItemEpic,
} from './commEpic/productEpic';
import {
    getConfigurableCategoryEpic,
    getConfigurableItemEpic,
    putConfigurableCategoryEpic,
    putConfigurableItemEpic,
    postConfigurableCategoryEpic,
    postConfigurableItemEpic,
} from './commEpic/configurableEpic';

import { catchError } from 'rxjs/operators';

export default (action$, store$, dependencies) =>
    combineEpics(
        searchClientFamilyEpic,
        postClientFamilyEpic,
        putClientFamilyEpic,
        getAppointmentByDateEpic,
        getDayReportEpic,
        getMonthReportEpic,
        getLocationEpic,
        putLocationEpic,
        getStaffEpic,
        putStaffEpic,
        getServiceEpic,
        putServiceEpic,
        getMenuCategoryEpic,
    getMenuItemEpic,
    putMenuCategoryEpic,
    putMenuItemEpic,
    getProductCategoryEpic,
    getProductItemEpic,
    putProductCategoryEpic,
    putProductItemEpic,
    getConfigurableCategoryEpic,
    getConfigurableItemEpic,
    putConfigurableCategoryEpic,
    putConfigurableItemEpic,
    postConfigurableCategoryEpic,
    postConfigurableItemEpic
    )(action$, store$, dependencies).pipe(
        catchError((error, source) => {
            return source;
        })
    )

/*
export default combineEpics(
    searchClientFamilyEpic,
    postClientFamilyEpic,
    putClientFamilyEpic,
    getAppointmentByDateEpic,
    getDayReportEpic,
    getMonthReportEpic
);
*/
/*
export default clinicEpic = (action$, store$, dependencies) =>
    combineEpics(  
    searchClientMemberEpic
    ).pipe(
        catchError((error, source)=>{
            console.error(error);
            return source;
        })
    );
 */
/*
const search (action$, store) => action$.ofType('SEARCH').debounceTime(1000)
        .mergeMap(
            action => ajax:getJSON(`https://host.com/search/{payload}`)
            .map( payload = ({type:'RESULT',payload}))
            catch( error => Observalbe.of({type:'ERROR', error}))
        )
*/


