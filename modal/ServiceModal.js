import React, { Component } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider} from  'react-native-elements';
import ModalHeader from './ModalHeader';
import ServiceEditor from '../modal/element/ServiceEditor';
import { mytheme } from "../mytheme";
import i18n from '../i18n/i18n';
import { ADDSERVICE, ADDOPTION} from '../constant';


export default class ServiceModal extends Component {
    constructor(props){
        super(props);
    }
    render (){
      const {type} = this.props.route.params;
      let ttl;
      if( type === ADDSERVICE) {
        ttl = i18n.t('title.service');
      } else if ( type === ADDOPTION){
        ttl = i18n.t('title.option');
      }
      return (
        <ThemeProvider theme= {mytheme('light')}>
            <ModalHeader  title={ttl} {...this.props} />
            <ServiceEditor {...this.props} />    
        </ThemeProvider>
     );
    }
}


