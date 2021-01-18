
import React,{setState, Component} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text,  ThemeConsumer,Input, CheckBox } from  'react-native-elements';
import { Icon } from 'react-native-vector-icons/Ionicons';
import Boxer from './Boxer';
import  RegularBtn from './RegularBtn';
import HoursSetter from './HoursSetter';


import { connect } from 'react-redux';
import {View,Platform,  TouchableWithoutFeedbackBase, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import i18n from '../../i18n/i18n';
import  * as DEF   from '../../constant';


export default class DayHoursSetup extends Component{
    constructor(props){
        super(props);
        let s = {};
        
        this.props.element[DEF.P_LIST].forEach(element => {
            s = Object.assign({}, s, { [element]: false} );
        });
        this.props.element[DEF.P_DEFINE].forEach(element => {
            if ( element[DEF.P_TYPE] === DEF.T_REFRENCE ) {
                s = Object.assign({}, s, { [ele[DEF.P_NAME]]: this.state.default[element[DEF.DEF_REF]]});
            }          
        });
           
        this.state = s;
    
    } 

   save =() =>{
      let hours = {};
      let value = {};
      this.element[DEF.DEFINE].forEach( ele => {
            value = { ...value, [ele]:this.state[ele] }
      })
      
      this.props.element[DEF.P_LIST].forEach( ele => {
            if( this.state[ele] ){
                hours = {
                    ...hours,
                    [this.state[ele]]: value
                }
            }
      });
      this.props.save && this.props.save(this.props.id, this.props.type, this.props.sid, this.props.name, hours);
   }


    render(){
        const {cmd, key, category} = this.props.route.params;
        let content;

        if( cmd === DEF.ADDITEM ){
            content = 
       <ThemeConsumer>
       { ({theme}) => (
           <>
           <Boxer title={ i18n.t('label.selectday') } >
           { this.props.element[DEF.P_LIST].map( ele => (
              <CheckBox title={i18n.t('label.'+ ele)} onPress={()=>(this.setState({[ele]:! this.state[ele]}))} checked={this.state[ele]} />
           ))}
           </Boxer>

          
           { this.props.element[DEF.P_DEFINE].map( ele => (
              <Boxer title={ i18n.t('label.'+ ele[DEF.P_NAME]) } >
                  {
                      this.props.element[DEF.P_DEFINE].map( e => (
                        ( e[DEF.P_TYPE] === DEF.T_BOOLEAN &&  
                            <CheckBox title={i18n.t('label.'+ e[DEF.P_TITLE])}
                          
                            onPress={ ()=> (this.setState({ [ele[DEF.P_NAME]]:
                                { ...this.state[ele[DEF.P_NAME]],
                                 [e[DEF.P_NAME]]: !this.state[ele[DEF.P_NAME]][e[DEF_P_NAME]]
                                }
                            }))}
                            checked={this.state[ele[DEF_P_NAME]][e[DEF_P_NAME]]} /> ) 
                        ( e[DEF.P_TYPE] === DEF.T_REFERENCE &&  e[DEF.P_DEFREF] === 'hours' &&
                            <HoursSetter start = {this.state[ele[DEF.P_NAME]].start}
                              saveStart ={ (val)=> (this.setState({ [ele[DEF.P_NAME]]:
                                    { ...this.state[ele[DEF.P_NAME]],
                                     start: val
                                    }
                                }))}
                              end = {this.state[ele[DEF.P_NAME]].end}
                              saveEnd ={ (val)=> (this.setState({ [ele[DEF.P_NAME]]:
                                { ...this.state[ele[DEF.P_NAME]],
                                 end: val
                                }
                            }))}
                         /> )
                      ))
        
                  }
              </Boxer>
           ))}

            <View style={theme.btnBox} >
                <RegularBtn title={i18n.t('button.save')}/>
            </View>

         </>
        )}
       </ThemeConsumer>
        }

        return (
        <ScrollView>
        { content }
        </ScrollView>
        );
    }
}


