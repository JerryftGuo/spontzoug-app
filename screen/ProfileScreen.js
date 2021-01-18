import React, { Component } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { View, } from  'react-native';
import { ThemeProvider, Icon, ListItem, Header,Text,Button  } from 'react-native-elements'
import i18n from '../i18n/i18n';
import BusinessHeader from '../element/BusinessHeader';
import ProfileList from '../element/commElement/ProfileList';
import { mytheme } from '../mytheme';


export default class ProfileScreen extends Component{
    constructor(props){
        super(props);
    }

    render(){
    let list =[];
    list.push(
        {
            id: 1,
            title:i18n.t('title.general'),
            onpress: 'ProfileGeneral',
            key:'general'
        }
    );
    list.push(
        {
            id: 2,
            title:i18n.t('title.location'),
            onpress: 'ProfileConfigurableItem',
            key:'location'
        }
    );
    list.push(
        {
            id: 3,
            title:i18n.t('title.service'),
            onpress: 'ProfileConfigurableItem',
            key:'service'
        }
    );
    list.push(
        {
            id: 4,
            title:i18n.t('title.staff'),
            onpress: 'ProfileConfigurableItem',
            key:'staff'
        }
    );
    list.push(
        {
            id: 4,
            title:i18n.t('title.menu'),
            onpress: 'ProfileMenuCategory',
            key:'menu'
        }
    );
    list.push(
        {
            id: 4,
            title:i18n.t('title.product'),
            onpress: 'ProfileConfigurableCategory',
            key:'product',
        }
    );
    list.push(
        {
            id: 4,
            title:i18n.t('title.billing'),
            onpress: 'ProfileBilling',
            key:'billing',
        }
    );



    return (
        <ThemeProvider theme= {mytheme('light')}>
            <BusinessHeader {...this.props}/>
           <ProfileList {...this.props} />
      
        </ThemeProvider>
    );
    }
}