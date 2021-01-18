import {SET_BUSINESS_NAME} from '../../actiontype/commActionType/CommType';

export default function(state = {businessname: 'My Business'}, action){
    switch ( action.type ){
        case SET_BUSINESS_NAME:{
            return Object.assign({},state,{businessname: action.payload})
        }
        default :
            return state;
    }
}