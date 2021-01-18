import React, { Component } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider} from  'react-native-elements';
import ModalHeader from './ModalHeader';
import ConfigurableEditor from '../modal/element/ConfigurableEditor';
import { mytheme } from "../mytheme";
import i18n from '../i18n/i18n';
import { ADDCATEGORY, ADDITEM, ADDOPTION} from '../constant';


export default class ConfigurableModal extends Component {
    constructor(props){
        super(props);
    }
    render (){
      const {cmd, key, category,item } = this.props.route.params;
      let ttl;
      if( cmd === ADDCATEGORY) {
        ttl = key;
      } else if ( cmd === ADDITEM){
        ttl =  key +'.'+ category;
      } else if ( cmd === ADDOPTION){
        ttl = key + '.' +category+'.'+item;
      }
      return (
        <ThemeProvider theme= {mytheme('light')}>
            <ModalHeader  title={ttl} {...this.props} />
            <ConfigurableEditor {...this.props} />    
        </ThemeProvider>
     );
    }
}


