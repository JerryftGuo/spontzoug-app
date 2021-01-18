import React, { setState, Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider, ButtonGroup, ThemeConsumer} from  'react-native-elements';
import BusinessHeader from '../element/BusinessHeader';
import ReportDay from '../element/commElement/ReportDay';
import { mytheme } from "../mytheme";



export default class ReportScreen extends Component {
    constructor(props){
        super(props);
    }
    render (){
      return (
        <ThemeProvider theme= {mytheme('light')}>
            <BusinessHeader {...this.props}/>
            <ReportDay {...this.props}/>    
        </ThemeProvider>
     );
    }

}
