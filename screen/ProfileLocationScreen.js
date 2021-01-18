import React, {Component}from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider, Icon, ListItem, Header, Button, Text, Divider } from 'react-native-elements'
import BusinessHeader2 from '../element/BusinessHeader2';
import { mytheme } from '../mytheme';
import LocationList from '../element/commElement/LocationList';


export default class ProfileLocationScreen extends Component{
    constructor(props){
        super(props);
        this.state={ address:[]};
    }

    render (){
        return (
          <ThemeProvider theme={mytheme('light')}>
              <BusinessHeader2 {...this.props} />    
              <LocationList {...this.props} />
          </ThemeProvider>
       );
      }
}


