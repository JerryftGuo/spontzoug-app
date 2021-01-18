import React, { Component } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider} from  'react-native-elements';
import BusinessHeader2 from '../element/BusinessHeader2';
import ProductCategoryList from '../element/commElement/ProductCategoryList';
import { mytheme } from "../mytheme";


export default class ProductCategoryScreen extends Component {
    constructor(props){
        super(props);
    }
    render (){
      return (
        <ThemeProvider theme= {mytheme('light')}>
            <BusinessHeader2 {...this.props}/>
            <ProductCategoryList {...this.props}/>    
        </ThemeProvider>
     );
    }
}

