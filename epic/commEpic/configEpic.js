import {
    GET_CONFIG,
    GET_CONFIG_SUCCESS,
    GET_CONFIG_ERROR,
    GET_CONFIGS,
    GET_CONFIGS_SUCCESS,
    GET_CONFIGS_ERROR,
    POST_CONFIG,
    POST_CONFIG_SUCCESS,
    POST_CONFIG_ERROR,
    PUT_CONFIG,
    PUT_CONFIG_SUCCESS,
    PUT_CONFIG_ERROR,
    } from '../../actiontype/commActionType/ConfigType';
import { pipe, mapTo, map, take } from 'rxjs/operators';
import { ofType } from 'redux-observable';

export const  getConfigsEpic = (action$) =>
    action$.pipe(
    ofType(GET_CONFIGS),
    mapTo({ type:GET_CONFIGS_SUCCESS, payload:[
        {   
        },
        {
        },
    ]})
 );

 export const  getConfigEpic = (action$) =>
    action$.pipe(
    ofType(GET_CONFIG),
    mapTo({ type:GET_CONFIG_SUCCESS, payload:{
        type:'restaurant',
        subtype:'fastfood',
        status:'active',
        names:[
            { name: 'menu', hasCategory: true, categoryLimit: 10 , orderable: true, bookable: false},
            { name: 'product', hasCategory: true, categoryLimit: 10, orderable: true, bookable: false},
            { name: 'service', hasCategory: false, categoryLimit: 0, orderable: true, bookable: false},
        ],
        data:{
            color:[
                { label:"Red", value:"red"},
                { label:"Green", value:"green"},
                { label:"Blue", value:"blue"},
                { label:"Grey", value:"grey"},
            ],
        },
       
        category:{
            menu:[
                { name:'name', type:'string', maxLength: 64 },
                { name:'color', type:'enum',  ref:'color_enum' },
            ],
            product:[
                { name:'name', type:'string', maxLength: 64 },
                { name:'color', type:'enum',  data_ref:'data.color' },
            ],
        },
        item:{
            menu:[
                { name : 'id',  type:'string', maxLength: 128},
                { name :'name', type:'string', maxLength: 64 },
                { name :'category', type:'category', maxLength:64 },
                { name :'image', type:'image', limit:5 , width:800, heigth:800},
                { name :'ingredient', type:'string', maxLengt: 512 },
                { name :'instock', type:'boolean', default: false},
                { name :'recommened', type:'boolen', default:true },
                { name : 'price', type:'real', default:1.99},
                { name : 'sale', type:'object', define:[
                    { name:'onsale', type:'boolean', default: false},
                    { name:'start', type:'datetime', default: new Date()},
                    { name:'end', type:'datetime', default: new Date()},
                ]},
            ]
        }

    }})
 );

 export const  putConfigEpic = (action$) =>
    action$.pipe(
    ofType(PUT_CONFIG),
    map( (action) => ({ type:PUT_CONFIG_SUCCESS, payload:action.payload }) )
);
