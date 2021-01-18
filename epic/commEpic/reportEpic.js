import {
    GET_DAY_REPORT,
    GET_DAY_REPORT_SUCCESS,
    GET_DAY_REPORT_ERROR,
    GET_MONTH_REPORT,
    GET_MONTH_REPORT_SUCCESS,
    GET_MONTH_REPORT_ERROR
    } from '../../actiontype/commActionType/ReportType';
import { pipe, mapTo } from 'rxjs/operators';
import { ofType } from 'redux-observable';

export const  getDayReportEpic = (action$) =>
    action$.pipe(
    ofType(GET_DAY_REPORT),
    mapTo({ type:GET_DAY_REPORT_SUCCESS, payload:{
        date: new Date(),
        order: 20,
        names:['service1', 'service2','service3','service4','service5','service6','service7','service8','service9'],
        service1: { count: 5, amount: 20.20 },
        service2: { count: 8, amount: 30.33 },
        service3: { count: 9, amount: 35.55 },
        service4: { count: 9, amount: 35.55 },
        service5: { count: 9, amount: 35.55 },
        service6: { count: 9, amount: 35.55 },
        service7: { count: 9, amount: 35.55 },
        service8: { count: 9, amount: 35.55 },
        service9: { count: 9, amount: 35.55 }
    }})
 );

 export const  getMonthReportEpic = (action$) => 
    action$.pipe(
    ofType(GET_MONTH_REPORT),
    mapTo({ type:GET_MONTH_REPORT_SUCCESS, payload:[
    {
        date: new Date('2020-05-01'),
        order: 20,
        names:['service1', 'service2','service3','service4','service5','service6','service7','service8','service9'],
        service1: { count: 5, amount: 20.20 },
        service2: { count: 8, amount: 30.33 },
        service3: { count: 0, amount: .55 },
        service4: { count: 9, amount: 35.55 },
        service5: { count: 9, amount: 3.55 },
        service6: { count: 17, amount: 44.55 },
        service7: { count: 12, amount: 22.55 },
        service8: { count: 10, amount: 45.55 },
        service9: { count: 10, amount: 30.55 }
    },{
        date: new Date('2020-05-02'),
        order: 20,
        names:['service1', 'service2','service3','service4','service5','service6','service7','service8','service9'],
        service1: { count: 5, amount: 20.20 },
        service2: { count: 8, amount: 30.33 },
        service3: { count: 9, amount: 35.55 },
        service4: { count: 9, amount: 35.55 },
        service5: { count: 19, amount: 30.55 },
        service6: { count: 17, amount: 44.55 },
        service7: { count: 12, amount: 22.55 },
        service8: { count: 10, amount: 45.55 },
        service9: { count: 10, amount: 30.55 }

    },{
        date: new Date('2020-05-03'),
        order: 20,
        names:['service1', 'service2','service3','service4','service5','service6','service7','service8','service9'],
        service1: { count: 5, amount: 20.20 },
        service2: { count: 8, amount: 30.33 },
        service3: { count: 9, amount: 35.55 },
        service4: { count: 9, amount: 35.55 },
        service5: { count: 19, amount: 30.55 },
        service6: { count: 17, amount: 30.55 },
        service7: { count: 10, amount: 22.55 },
        service8: { count: 10, amount: 45.55 },
        service9: { count: 10, amount: 30.55 }

    },{
        date: new Date('2020-05-04'),
        order: 20,
        names:['service1', 'service2','service3','service4','service5','service6','service7','service8','service9'],
        service1: { count: 5, amount: 20.20 },
        service2: { count: 8, amount: 30.33 },
        service3: { count: 9, amount: 35.55 },
        service4: { count: 9, amount: 35.55 },
        service5: { count: 19, amount: 30.55 },
        service6: { count: 17, amount: 44.55 },
        service7: { count: 12, amount: 22.55 },
        service8: { count: 10, amount: 45.55 },
        service9: { count: 10, amount: 30.55 }

    },{
        date: new Date('2020-05-05'),
        order: 20,
        names:['service1', 'service2','service3','service4','service5','service6','service7','service8','service9'],
        service1: { count: 5, amount: 20.20 },
        service2: { count: 8, amount: 30.33 },
        service3: { count: 9, amount: 35.55 },
        service4: { count: 9, amount: 35.55 },
        service5: { count: 19, amount: 30.55 },
        service6: { count: 17, amount: 44.55 },
        service7: { count: 12, amount: 22.55 },
        service8: { count: 10, amount: 45.55 },
        service9: { count: 10, amount: 30.55 }

    }
    ]})
 );


 