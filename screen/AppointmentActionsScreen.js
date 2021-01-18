import React, { Component } from 'react';

import { ThemeProvider} from  'react-native-elements';
import BusinessHeader2 from '../element/BusinessHeader2';
import AppointmentActuator from '../element/clinicElement/AppointmentActuator';
import { mytheme } from "../mytheme";

export default class AppointmentActionsScreen extends Component {
  constructor(props){
      super(props);
  }
  render (){
    return (
      <ThemeProvider theme= {mytheme('light')}>
          <BusinessHeader2 {...this.props} />
          <AppointmentActuator {...this.props}/>    
      </ThemeProvider>
   );
  }
}
