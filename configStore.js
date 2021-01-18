import { createStore, applyMiddleware } from 'redux';
import  clinicReducer  from './reducer/clinicReducer';
import clinicEpic  from './epic/clinicEpic';
import { createEpicMiddleware } from 'redux-observable';
import { ajax } from 'rxjs/ajax';


const epicMiddleware = createEpicMiddleware({
    dependencies:{ getJSON: ajax.getJSON}
});

const preLoadStore = {
businessname: 'My Business',

config:{
    loading: true,
    message:'',
    error:'',
    configs:[],
    config:{
        industry:'restaurant',
        subtype:'fastfood',
        title:'restaurant',
        subtitle:' fastfoos',
        status:'active',
        keys:[
            { name: 'business',  release:'production', active:true, created: new Date(),  hasCategory: false, categoryLimit: 0 , itemLimit: 1, orderable: true, bookable: false},
            { name: 'location',  release:'production', active:true, created: new Date(),  hasCategory: false, categoryLimit: 0 , itemLimit: 10, orderable: true, bookable: false},
            { name: 'staff',  release:'production', active:true, created: new Date(),  hasCategory: true, categoryLimit: 10 , itemLimit: 20, orderable: true, bookable: false},
            { name: 'menu',  release:'production', active:true, created: new Date(),  hasCategory: true, categoryLimit: 10 , itemLimit: 200, orderable: true, bookable: false},
            { name: 'product', release:'production', active:true,created: new Date(), hasCategory: true, categoryLimit: 10, itemLimit:100, orderable: true, bookable: false},
            { name: 'service', release:'production', active:true, created: new Date(), hasCategory: false, categoryLimit: 0, itemLimit: 10, orderable: true, bookable: false},
            { name: 'billing', release:'production', active:true, created: new Date(), hasCategory: false, categoryLimit: 0, itemLimit: 1, orderable: true, bookable: false},

        ],
        define: {
            hours: { const: true, deprecated: false, size: 3, define:{
                switch:{ name: 'switch', type:'boolean',deprecated: false, default: false},
                start: { name: 'start', type:'time',deprecated: false, default: new Date(), readonly: false},
                end:   { name: 'end', type:'time', deprecated: false,default: new Date(), readonly: false},
            }},
            dates: { const: true, deprecated: false, size: 3, define:{
                switch:{ name: 'switch', type:'boolean',deprecated: false, default: false},
                start: { name: 'start', type:'date',deprecated: false, default: new Date(), readonly: false},
                end:   { name: 'end', type:'date', deprecated: false,default: new Date(),  readonly: false },
            }},
        },
        define_default:{
            hours:{
                switch: false,
                start: new Date(),
                end: new Date(), 
            },
            dates:{
                switch: false,
                start: new Date(),
                end: new Date(), 
            },
        },

        data: {
            subtype:[
                { label:"Traditional Clinic",value:'traditionalclinic'},
            ],
            province:[
                { label:'Alberta', value:'AB'},
                { label:'British Columbia', value:'BC'},
            ],
            color:[
                { label:'Red', value:'red'},
                { label:'Green', value:'green'},
                { label:'Blue', value:'blue'},
                { label:'Grey', value:'grey'},
            ],
            industry:[
                { label:'Health', value:'health', subtype:[
                    { label:'Traditional Clinic', value:'traditionalclinic'}
                ]},
                { label:'Retalier', value:'retalier', subtype:[
                    { label:'Clothing', value:'clothing'}
                ]}
            ]
        },
       
        category:{
            menu:{ title:'category', define:[
                { name:'name', type:'string', deprecated: false, editonly: false,default:'',maxLength: 64 },
                { name:'color', type:'enum',  deprecated: false, editonly: false, data_ref:'color', placeholder:'color' },
            ]},
            product:{ title:'category', define:[
                { name:'name', type:'string', deprecated: false, editonly: false,default:'',maxLength: 64 },
                { name:'color', type:'enum',  deprecated: false, editonly: false, data_ref:'color', placeholder:'color' },
            ]},
            staff:{ title:'department', define:[
                { name:'name', type:'string', deprecated: false, editonly: false,default:'',maxLength: 64 },
            ]},
            service:{ title:'category', define:[
                { name:'name', type:'string', deprecated: false, editonly: false,default:'',maxLength: 64 },
                { name:'color', type:'enum',  deprecated: false, editonly: false, data_ref:'color', placeholder:'color' },
            ]},
        },

        item:{
            business:[
                { name: 'id', type:'id', default:''},
                { name :'background', type:'image',deprecated: false, editonly: true,limit:1 , width:800, heigth:800,
                    default:'', imagetype:'jpg', define:[
                    { name:'title', type:'string', deprecated: false, default:'background', maxLength:64 },
                    { name:'uri', type:'string', deprecated: false, default:'', maxLength:512 },
                ]},
                { name :'logo', type:'image',deprecated: false, editonly: true,limit:1 , width:200, heigth:200,
                    default:'', imagetype:'png', define:[
                    { name:'title', type:'string', deprecated: false, default:'logo', maxLength:64 },
                    { name:'uri', type:'string', deprecated: false, default:'', maxLength:512 },
                ]},
                { name :'name', type:'string',deprecated: false, editonely:false, default:'',maxLength: 64 },
                { name :'industry', type:'enum',deprecated: false, editonely:false, data_ref:'industry',placeholder:'industry' },
                { name :'subtype', type:'enum',deprecated: false, editonely:false, data_ref:'subtype', placeholder:'subtype'},
                { name :'description', type:'text',deprecated: false, editonely:false, default:'',lines: 10, maxLength: 1024 },
                { name :'address', type:'group',deprecated: false,  editonly: false,size: 4, define:[
                    { name :'street', type:'string',deprecated: false, default:'',maxLength: 128 },
                    { name :'city', type:'string',deprecated: false, default:'',maxLength: 64 },
                    { name :'province', type:'enum',deprecated: false, default: 'AB',data_ref:'province', placeholder:'province' },
                    { name :'postcode', type:'string',deprecated: false, default:'',maxLength: 16 },
                ]},
                { name: 'created', type:'datetime',deprecated: false, editonly: true,readonly: true, default: new Date()},
                { name: 'modified', type:'datetime',deprecated: false,editonly: true, readonly: true, default: new Date()},
                { name :'creator', type:'identity',deprecated: false,  default:'', maxLength:128},

             
            ],
            location:[
                { name :'name', type:'string',deprecated: false, editonly: false, default:'',maxLength: 64 },
                { name :'phone', type:'string',deprecated: false,  editonly: false,default:'',maxLength: 16 },
                { name :'address', type:'group',deprecated: false,  editonly: false,size: 4, define:[
                    { name :'street', type:'string',deprecated: false, default:'',maxLength: 128 },
                    { name :'city', type:'string',deprecated: false, default:'',maxLength: 64 },
                    { name :'province', type:'enum',deprecated: false,  default: 'AB',data_ref:'province', placeholder:'province' },
                    { name :'postcode', type:'string',deprecated: false, default:'',maxLength: 16 },
                ]},
                { name :'hours', type:'listgroup', subtype:'businesshour',deprecated: false,  editonly: true ,size: 8,
                    list:['mon','tue','wed','thu','fri','sat','sun','holiday'],
                    define:[
                        { name : 'firstperiod', switchoff:'closed', type:'reference', def_ref:'hours' },
                        { name : 'secondperiod', switchoff:'closed', type:'reference', def_ref:'hours' },
                    ],
                },
            ],
            staff:[
                { name :'images', type:'image',deprecated: false, editonly: true, limit:1 , width:800, heigth:800,
                    default:'', define:[
                    { name:'title', type:'string',deprecated: false, default:'image', maxLength:64 },
                    { name:'uri', type:'string', deprecated: false,default:'', maxLength:512 },
                ]},
                { name :'title', type:'string',deprecated: false, editonly: false, default:'',maxLength: 64 },
                { name :'firstname', type:'string',deprecated: false, editonly: false, default:'',maxLength: 64 },
                { name :'lastname', type:'string',deprecated: false, editonly: false, default:'',maxLength: 64 },
                { name :'certificateno', type:'string',deprecated: false, editonly: false, default:'',maxLength: 64 },
                { name :'role', type:'string',deprecated: false, editonly: false, default:'',maxLength: 64 },
                { name :'phone', type:'string',deprecated: false,  editonly: false,default:'',maxLength: 16 },
                { name :'address', type:'group',deprecated: false,  editonly: false,size: 4, define:[
                    { name :'street', type:'string',deprecated: false, default:'',maxLength: 128 },
                    { name :'city', type:'string',deprecated: false, default:'',maxLength: 64 },
                    { name :'province', type:'enum',deprecated: false,  default: 'AB',default:'',maxLength: 64 },
                    { name :'postcode', type:'string',deprecated: false, default:'',maxLength: 16 },
                ]},
                { name :'hours', type:'listgroup',subtype:'schedulehour',deprecated: false,  editonly: true ,size: 7,
                    list:['mon','tue','wed','thu','fri','sat','sun'],
                    define:[
                        { name : 'schedule', switchon:'onschedule', type:'reference', def_ref:'hours' },
                    ],
                   
                },
                { name : 'vacation', type:'switchgroup',deprecated: false, size: 3, define:[
                    { name: 'switch', type:'boolean',deprecated: false, title:'onvacation', default: false},
                    { name: 'start', type:'date',deprecated: false, default: new Date(), readonly: false},
                    { name: 'end', type:'date', deprecated: false,default: new Date(), readonly: false},
                ]},
            ],
            menu:[
                { name :'images', type:'image',deprecated: false, editonly: true,limit:5 , width:800, heigth:800,
                    default:'', define:[
                    { name:'title', type:'string', deprecated: false, default:'image', maxLength:64 },
                    { name:'uri', type:'string', deprecated: false, default:'', maxLength:512 },
                ]},
                { name :'name', type:'string',deprecated: false, editonely:false, default:'',maxLength: 64 },
                { name :'category', type:'string',deprecated: false, editonly: false, default:'', maxLength:64 },
                { name :'ingredient', type:'text',deprecated: false, editonly: false,default:'', maxLength: 512, lines:5 },
                { name :'instock', type:'boolean',deprecated: false, editonly: false, default: false},
                { name :'recommended', type:'boolean',deprecated: false, editonly: false,default:false },
                { name : 'price', type:'price',deprecated: false, editonly: false,default: 0.99},
                { name : 'sale', type:'switchgroup',deprecated: false, editonly: false,size: 4, define:[
                    { name: 'switch', type:'boolean', deprecated: false,title:'onsale',default: false},
                    { name: 'start', type:'date', deprecated: false,default: new Date(), readonly: false},
                    { name: 'end', type:'date', deprecated: false,default: new Date(), readonly: false},
                    { name: 'price', type:'price', deprecated: false,default:0.99},
                ]},
            ],
            product:[
                { name :'images', type:'image',deprecated: false, editonly: true, limit:5 , width:800, heigth:800,
                    default:'', define:[
                    { name:'title', type:'string', deprecated: false,default:'image', maxLength:64 },
                    { name:'uri', type:'string', deprecated: false,default:'', maxLength:512 },
                ]},
                { name :'name', type:'string',deprecated: false, editonly: false, default:'',maxLength: 64 },
                { name :'category', type:'string',deprecated: false, editonly: false, default:'', maxLength:64 },
                { name :'ingredient', type:'text',deprecated: false, editonly: false, default:'', maxLength: 512, lines:5 },
                { name :'instock', type:'boolean',deprecated: false, editonly: false, default: false},
                { name :'recommended', type:'boolean',deprecated: false, editonly: false, default:false },
                { name : 'price', type:'price',deprecated: false, editonly: false, default: 0.99},
                { name : 'sale', type:'switchgroup',deprecated: false, size: 4, define:[
                    { name: 'switch', type:'boolean', deprecated: false,title:'onsale',default: false},
                    { name: 'start', type:'date', deprecated: false,default: new Date(), readonly: false},
                    { name: 'end', type:'date', deprecated: false,default: new Date(), readonly: false},
                    { name: 'price', type:'price', deprecated: false,default:0.99},
                ]},
            ],
            service:[   
                { name:'name', type:'string', deprecated: false, editonly: false,default:'',maxLength: 64 },
                { name:'color', type:'enum',  deprecated: false, editonly: false, data_ref:'color', placeholder:'color' },
                { name:'taxable', type:'boolean',deprecated: false, editonly: false, default: false},
                { name:'description', type:'text', deprecated: false, editonly: false,default:'',maxLength: 1024 },
                { name:'options', type:'array', deprecated:false, editonly:true, limit:3, size:3, default:[], define:[
                    { name:'option', type:'string', deprecated: false, editonly: false,default:'',maxLength: 64 },
                    { name:'duration', type:'integer', deprecated: false, editonly: false,default:0, unit:'minute' },
                    { name:'price', type:'price', deprecated: false, editonly: false,default:1.00 },
                ]},
                { name : 'sale', type:'switchgroup',deprecated: false, size: 4, define:[
                    { name: 'switch', type:'boolean', deprecated: false,title:'onsale',default: false},
                    { name: 'start', type:'date', deprecated: false,default: new Date(), readonly: false},
                    { name: 'end', type:'date', deprecated: false,default: new Date(), readonly: false},
                    { name: 'note', type:'text', deprecated: false,default:'', maxLength:512 },
                ]},

            ],
            billing:[
                { name :'billingname', type:'string',deprecated: false, editonely:false, default:'',maxLength: 64 },
                { name :'address', type:'group',deprecated: false,  editonly: false,size: 4, define:[
                    { name :'street', type:'string',deprecated: false, default:'',maxLength: 128 },
                    { name :'city', type:'string',deprecated: false, default:'',maxLength: 64 },
                    { name :'province', type:'enum',deprecated: false, data_ref:'province', placeholder:'province' },
                    { name :'postcode', type:'string',deprecated: false, default:'',maxLength: 16 },
                ]},
               
            ],
        }
    },
},


configurable:{
    loading: true,
    message:'',
    error:'',
    
    categories:{
        menu:[
            {
                id: '121',
                images:[
                    { id:1, title:'test image 1', valid:true, uri:'https://unsplash.it/400/400?image=1'},
                ],
                name:'category 1',
                color:'red'
            },
            {
                id: '124',
                name:'category 2',
                color:'green'
            }
            
        ],
        product:[
            {
                id: '121',
                name:'category one',
                color:'red'
            },
            {
                id: '124',
                name:'category two',
                color:'green'
            }
            
        ],
        staff:[],
    },

    items:{
        business:[

        ],
        menu:[

        ],
        staff:[

        ],
        service:[

        ],
        billing:[

        ],
        product:[
            { id: '123',
                images:[
                { id:1, title:'test image 1', valid:true, uri:'https://unsplash.it/400/400?image=1'},
                { id:2, title:'test image 2', valid:true, uri:'https://unsplash.it/400/400?image=2'},
                { id:3, title:'test image 3', valid:true, uri:'https://unsplash.it/400/400?image=3'},
                { id:4, title:'test image 4', valid:true, uri:'https://unsplash.it/400/400?image=2'},
                { id:5, title:'test image 5', valid:true, uri:'https://unsplash.it/400/400?image=1'},
               ],
              category:'category 1',
              name:'item 1',
              ingredient:' test ingredient',
              instock: true,
              recommended: true,
              price: 23.22,
              sale:{
                onsale:false,
                start: new Date(),
                end: new Date(),
                price:12.33,
              },
            },
            { id: '234',
              images:[
               { id:1, title:'test image 1', valid:true, uri:'https://unsplash.it/400/400?image=1'},
               { id:2, title:'test image 2', valid:true, uri:'https://unsplash.it/400/400?image=2'},
               { id:3, title:'test image 3', valid:true, uri:'https://unsplash.it/400/400?image=3'},
               { id:4, title:'test image 4', valid:true, uri:'https://unsplash.it/400/400?image=2'},
               { id:5, title:'test image 5', valid:true, uri:'https://unsplash.it/400/400?image=1'},
              ],
              category:'category 1',
              name:'item 2',
              ingredient:' test ingredient',
              instock: true,
              recommended: false,
              price: 21.22,
              sale:{
               onsale:false,
               start: new Date(),
               end: new Date(),
               price:11.33,
              }, 
            },
        ],

        location:[
            {
                id:'3435',
                name: 'location',
                phone: '4032303323',
                address:{
                    street: '31 Edghill Dr NW',
                    city: 'Calgary',
                    province: 'AB',
                    postcode: 'T3A 2R9',
                },
                hours: {
                    sun: {},
                    mon:{
                        firstperiod:{
                            closed: false,
                            start: new Date(),
                            end: new Date(),
                        },
                        secondperiod:{
                            closed: false,
                            start: new Date(),
                            end: new Date(),
                        },
                    },
                    tue:{
                        firstperiod:{
                            closed: false,
                            start: new Date(),
                            end: new Date(),
                        },
                        secondperiod:{
                            closed: true,
                            start: new Date(),
                            end: new Date(),
                        },
                    },
                    wed: {},
                    thu: {},
                    fri: {},
                    sat: {},
                    holiday: {},
                }
                
            },
            {
                id:'3438',
                name: 'dalhousie',
                phone: '403230334',
                address:{
                    street: '31 Dal Dr NW',
                    city: 'Calgary',
                    province: 'AB',
                    postcode: 'T3A 5R9',
                },
                hours: {
                    sun: {
                        firstperiod:{
                            closed: true,
                            start: new Date(),
                            end: new Date(),
                        },
                        secondperiod:{
                            closed: true,
                            start: new Date(),
                            end: new Date(),
                        },
                    },
                    mon:{
                        firstperiod:{
                            closed: false,
                            start: new Date(),
                            end: new Date(),
                        },
                        secondperiod:{
                            closed: false,
                            start: new Date(),
                            end: new Date(),
                        },
                    },
                    tue:{
                        firstperiod:{
                            closed: false,
                            start: new Date(),
                            end: new Date(),
                        },
                        secondperiod:{
                            closed: true,
                            start: new Date(),
                            end: new Date(),
                        },
                    },
                    wed: {},
                    thu: {},
                    fri: {},
                    sat: {},
                    holiday: {},
                }
            },
        ],
    }
}
}

//export const clinicStore = createStore(clinicReducer,preLoadStore);
/*
export const clinicStore = createStore(
    clinicReducer,
    preLoadStore,
    applyMiddleware(epicMiddleware)
);
*/

export default function configStore (){
    const store =  createStore(
        clinicReducer,
        preLoadStore,
        applyMiddleware(epicMiddleware)
    );

    epicMiddleware.run(clinicEpic);
    return store;
}


