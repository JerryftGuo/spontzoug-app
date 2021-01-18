import React from 'react';
import { Button, Text, Header,Icon, ThemeConsumer } from 'react-native-elements';
import { connect } from 'react-redux';
import { IconBtn } from './basic';

const BusinessHeader2 = ( { navigation, businessname }) => {

    leftHeader = () => { 
        return (
        <ThemeConsumer>
        {({ theme })  => (
        <IconBtn icon={ theme.Header.backIcon}
          onPress={()=>navigation.goBack()} />
        )}
        </ThemeConsumer>
        );
    }
    centerHeader = () => { 
     return (
        <ThemeConsumer>
        {({ theme })  => (
            <Text style={ theme.Header.textStyle } > {businessname}</Text>
        )}
        </ThemeConsumer>
        );
        
    }
   
    return (
        <Header
        leftComponent = { this.leftHeader}
        centerComponent = { this.centerHeader }
        ></Header>
    );
 };

const mapStateToProps = state =>{
    return { businessname: state.businessname };
};

export default connect(mapStateToProps)(BusinessHeader2); 

/*<Text style={ {color: theme.colors.secondary} } > terst{businessname}</Text>*/