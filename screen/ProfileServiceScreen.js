import React, {Component}from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider, Icon, ListItem, Header, Button, Text, Divider } from 'react-native-elements'
import BusinessHeader2 from '../element/BusinessHeader2';
import { mytheme } from '../mytheme';
import ProfileServiceList from '../element/commElement/ProfileServiceList';


export default class ProfileServiceScreen extends Component{
    constructor(props){
        super(props);
        this.state={};
    }

    render (){
        return (
          <ThemeProvider theme={mytheme('light')}>
              <BusinessHeader2 {...this.props} />    
              <ProfileServiceList {...this.props} />
          </ThemeProvider>
       );
      }
}



