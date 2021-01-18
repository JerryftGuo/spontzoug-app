
import { SET_CLIENT_LOADING,
        SET_CLIENT_SEARCHKEY,
        SEARCH_CLIENT_FAMILY,
        SEARCH_CLIENT_FAMILY_SUCCESS,
        SEARCH_CLIENT_FAMILY_ERROR,
        POST_CLIENT_FAMILY_SUCCESS,
        POST_CLIENT_FAMILY_ERROR,
        PUT_CLIENT_FAMILY_SUCCESS,
        PUT_CLIENT_FAMILY_ERROR
} from '../../actiontype/clinicActionType/ClientType';
   

const initClient = {
    loading: true,
    search: '',
    families:[],
    message:'',
    error:''
}

export default function(state = initClient, action){
    switch( action.type ){
        case SET_CLIENT_LOADING:{
            return  Object.assign({}, state,
                 { loading: action.payload});
        }
        case SET_CLIENT_SEARCHKEY:{
            return Object.assign({}, state,
                { search: action.payload });
        }
        case SEARCH_CLIENT_FAMILY:{
            return Object.assign({}, state,
               { loading: true } );
        }
        case SEARCH_CLIENT_FAMILY_SUCCESS:{
            return Object.assign({}, state,
               { families: action.payload,
                loading: false } );
        }
        case POST_CLIENT_FAMILY_SUCCESS: {
            return Object.assign({},sate,
                { message: action.payload });
        }
        case PUT_CLIENT_FAMILY_SUCCESS:{
            return Object.assign({},sate,
                 { families: action.payload});
        }
        case SEARCH_CLIENT_FAMILY_ERROR:{
            return Object.assign({}, state,
               { error: action.payload,
                loading: false } );
        }
        case POST_CLIENT_FAMILY_ERROR: {
            return Object.assign({},sate,
                { error: action.payload});
        }
        case PUT_CLIENT_FAMILY_ERROR:{
            return Object.assign({},sate,
                { error: action.payload});
        }
       
        default:
            return state;
    }    

}