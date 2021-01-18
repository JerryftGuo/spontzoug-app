import React, { Component } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider} from  'react-native-elements';
import BusinessHeader2 from '../element/BusinessHeader2';
import ConfigurableItemList from '../element/commElement/ConfigurableItemList';
import { mytheme } from "../mytheme";


export default class ConfigurableItemScreen extends Component {
    constructor(props){
        super(props);
    }
    render (){
      return (
        <ThemeProvider theme= {mytheme('light')}>
            <BusinessHeader2 {...this.props}/>
            <ConfigurableItemList {...this.props}/>    
        </ThemeProvider>
     );
    }
}

