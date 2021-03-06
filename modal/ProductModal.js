import React, { Component } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider} from  'react-native-elements';
import ModalHeader from './ModalHeader';
import ProductEditor from '../modal/element/ProductEditor';
import { mytheme } from "../mytheme";
import i18n from '../i18n/i18n';
import { ADDCATEGORY, ADDITEM, ADDOPTION} from '../constant';


export default class ProductModal extends Component {
    constructor(props){
        super(props);
    }
    render (){
      const {cmd, name, category,item } = this.props.route.params;
      let ttl;
      if( cmd === ADDCATEGORY) {
        ttl = name;
      } else if ( cmd === ADDITEM){
        ttl =  name +'.'+ category;
      } else if ( cmd === ADDOPTION){
        ttl = name + '.' +category+'.'+item;
      }
      return (
        <ThemeProvider theme= {mytheme('light')}>
            <ModalHeader  title={ttl} {...this.props} />
            <ProductEditor {...this.props} />    
        </ThemeProvider>
     );
    }
}


