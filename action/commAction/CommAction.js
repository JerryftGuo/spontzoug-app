import { SET_BUSINESS_NAME,
    SET_APP_INIT    
   } from '../../actiontype/commActionType/CommType';

export const setBusinessName = name =>({
   type: SET_BUSINESS_NAME,
   payload: { businessname:name}
})