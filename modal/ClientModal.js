import React, { Component } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider} from  'react-native-elements';
import ModalHeader from './ModalHeader';
import ClientEditor from '../modal/element/ClientEditor';
import { mytheme } from "../mytheme";
import i18n from '../i18n/i18n';


export default class ClientModal extends Component {
    constructor(props){
        super(props);
    }
    render (){
      return (
        <ThemeProvider theme= {mytheme('light')}>
            <ModalHeader  title={i18n.t('title.client')} {...this.props} />
            <ClientEditor {...this.props} />    
        </ThemeProvider>
     );
    }
}

