import React from 'react';
import { Text, Header,Icon, ThemeConsumer } from 'react-native-elements';
import { connect } from 'react-redux';
import { IconBtn } from './basic';

const BusinessHeader = ( { businessname }) => {

    leftHeader = () => { 
        return(
            <ThemeConsumer>
            {({ theme })  => (
                    <IconBtn icon={ theme.Header.backIcon} />
                
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
    rightHeader = () => { 
        return(
            <ThemeConsumer>
            {({ theme })  => (
                <IconBtn icon={ theme.Header.settingIcon} />
            )}
            </ThemeConsumer>
        );
    }

    return (
        <Header
        leftComponent = { this.leftHeader}
        centerComponent = { this.centerHeader }
        rightComponent = { this.rightHeader}
       ></Header>
    );
 };

const mapStateToProps = state =>{
    return { businessname: state.businessname };
};

export default connect(mapStateToProps)(BusinessHeader); 

/*<Text style={ {color: theme.colors.secondary} } > terst{businessname}</Text>*/