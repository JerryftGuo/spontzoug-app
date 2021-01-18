import React, { Component } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider} from  'react-native-elements';
import ModalHeader from './ModalHeader';
import LocationEditor from '../modal/element/LocationEditor';
import { mytheme } from "../mytheme";
import i18n from '../i18n/i18n';
import { ADDADDRESS, EDITHOURS } from '../constant';


export default class ClientModal extends Component {
    constructor(props){
        super(props);
    }
    render (){
      const {type} = this.props.route.params;
      let ttl;
      if( type === ADDADDRESS) {
        ttl = i18n.t('title.address');
      } else if ( type === EDITHOURS){
        ttl = i18n.t('title.hours');
      }
      return (
        <ThemeProvider theme= {mytheme('light')}>
            <ModalHeader  title={ttl} {...this.props} />
            <LocationEditor {...this.props} />    
        </ThemeProvider>
     );
    }
}


