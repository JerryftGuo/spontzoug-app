import React, {Component}from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider, Icon, ListItem, Header, Button, Text, Divider } from 'react-native-elements'
import BusinessHeader2 from '../element/BusinessHeader2';
import { mytheme } from '../mytheme';
import ProfileStaffList from '../element/commElement/ProfileStaffList';


export default class ProfileStaffScreen extends Component{
    constructor(props){
        super(props);
        this.state={};
    }

    render (){
        return (
          <ThemeProvider theme={mytheme('light')}>
              <BusinessHeader2 {...this.props} />    
              <ProfileStaffList {...this.props} />
          </ThemeProvider>
       );
      }
}



