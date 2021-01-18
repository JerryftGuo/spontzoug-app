import { combineReducers } from "redux";
import client from "./clinicReduer/client";
import appointment from './clinicReduer/appointment';
import businessname from './commReducer/businessname';
import report from './commReducer/report';
import location from './commReducer/location';
import staff from './commReducer/staff';
import service from './commReducer/service';
import menu from './commReducer/menu';
import product from './commReducer/product';
import config from './commReducer/config';
import configurable from './commReducer/configurable';

export default combineReducers({
   businessname,
   client,
   appointment,
   report,
   location,
   staff,
   service,
   menu,
   product,
   config,
   configurable
});

