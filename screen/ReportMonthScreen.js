import React, { setState, Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider, ButtonGroup, ThemeConsumer} from  'react-native-elements';
import BusinessHeader2 from '../element/BusinessHeader2';
import ReportMonth from '../element/commElement/ReportMonth';
import { mytheme } from "../mytheme";


export default class ReportMonthScreen extends Component {
    constructor(props){
        super(props);
    }
    render (){
      return (
        <ThemeProvider theme= {mytheme('light')}>
            <BusinessHeader2 {...this.props}/>
            <ReportMonth {...this.props}/>    
        </ThemeProvider>
     );
    }

}
