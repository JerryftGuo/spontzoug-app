import React, {Component}  from 'react';
import { ScrollView, FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import { ListItem, ThemeConsumer,  } from 'react-native-elements';
import {Icon} from 'react-native-vector-icons/Ionicons';

import { 
    getConfig,
} from '../../action/commAction/ConfigAction';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import i18n from '../../i18n/i18n';




class ProfileList extends Component {
    constructor(props){
        super(props);
        this.state = {
            list: this.props.config.config.keys,
        }
     
    }

    componentDidMount = async () =>{
        await this.props.getConfig();
    }
  
    render (){
        let list = [];
        this.state.list.forEach(( element, idx ) => {
            list.push({
                id: idx,
                title: i18n.t('title.'+ element.name),
                onpress: ( element.hasCategory ? 'ProfileConfigurableCategory':'ProfileConfigurableItem'),
                key: element.name,
            })
        });
       
console.warn('list:'+ JSON.stringify(list))
        return (
            <ThemeConsumer>
                {({theme}) => (
                 <>
                    {
                     list.map( (item, i)=> (
                    <ListItem
                        key={i}
                        title ={item.title}
                        onPress = { () => this.props.navigation.navigate(item.onpress, item )}
                        bottomDivider
                        chevron
                    />
                 ))
                 }
                </>
               )}
            </ThemeConsumer>
         );
    };
}


const mapStateToProps = state =>{
    return { config: state.config };
};

export default connect(mapStateToProps,
    {
      getConfig,
    }
    )(ProfileList);
