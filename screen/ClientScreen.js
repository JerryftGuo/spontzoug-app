import React, { Component } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider} from  'react-native-elements';
import BusinessHeader from '../element/BusinessHeader';
import ClientSearch from '../element/clinicElement/ClientSearch';
import { mytheme } from "../mytheme";


export default class ClientScreen extends Component {
    constructor(props){
        super(props);
    }
    render (){
      return (
        <ThemeProvider theme= {mytheme('light')}>
            <BusinessHeader {...this.props}/>
            <ClientSearch {...this.props}/>    
        </ThemeProvider>
     );
    }
}

