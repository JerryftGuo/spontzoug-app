import React, { Component } from "react";

import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemeProvider} from  'react-native-elements';
import BusinessHeader from '../element/BusinessHeader';
import AppointmentList from '../element/clinicElement/AppointmentList';
import { mytheme } from "../mytheme";

export default class AppointmentScreen extends Component {
  constructor(props){
      super(props);
  }
  render (){
    return (
      <ThemeProvider theme= {mytheme('light')}>
          <BusinessHeader {...this.props}/>
          <AppointmentList {...this.props}/>    
      </ThemeProvider>
   );
  }
}

