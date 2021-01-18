import React from 'react';
import {Text, Header,Icon,ThemeConsumer } from 'react-native-elements';
import { connect } from 'react-redux';
import { IconBtn } from '../element/basic';

const ModalHeader = ( { title, navigation }) => {
    
     centerHeader =() =>{
        return (
        <ThemeConsumer>
        {({ theme })  => (
            <Text style={ theme.Header.textStyle } > { title }</Text>
        )}
        </ThemeConsumer>
        );        
    }
    rightHeader = () => { 
        return(
            <ThemeConsumer>
            {({ theme })  => (
                <IconBtn icon={ theme.Header.cancelIcon} 
                 onPress={()=> navigation.goBack()} />
            )}
            </ThemeConsumer>
        );
    }

    return (
        <Header
        centerComponent = { this.centerHeader }
        rightComponent = { this.rightHeader}
       ></Header>
    );
 };
/*
const mapStateToProps = state =>{
    return { title:  };
};
*/

export default connect()(ModalHeader); 

/*<Text style={ {color: theme.colors.secondary} } > terst{businessname}</Text>*/