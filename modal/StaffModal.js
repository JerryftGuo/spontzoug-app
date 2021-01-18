import React, { Component } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider} from  'react-native-elements';
import ModalHeader from './ModalHeader';
import StaffEditor from '../modal/element/StaffEditor';
import { mytheme } from "../mytheme";
import i18n from '../i18n/i18n';
import { ADDSTAFF, EDITHOURS} from '../constant';


export default class StaffModal extends Component {
    constructor(props){
        super(props);
    }
    render (){
      const {type} = this.props.route.params;
      let ttl;
      if( type === ADDSTAFF) {
        ttl = i18n.t('title.staff');
      } else if ( type === EDITHOURS){
        ttl = i18n.t('title.hours');
      }
      return (
        <ThemeProvider theme= {mytheme('light')}>
            <ModalHeader  title={ttl} {...this.props} />
            <StaffEditor {...this.props} />    
        </ThemeProvider>
     );
    }
}


