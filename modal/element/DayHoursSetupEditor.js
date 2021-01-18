
import React,{setState, Component} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text,  ThemeConsumer,Input, CheckBox } from  'react-native-elements';
import { Icon } from 'react-native-vector-icons/Ionicons';
import { Boxer,
RegularBtn,
HoursSetter } from '../../element/basic';

import { putConfigurableItem } from '../../action/commAction/ConfigurableAction';


import { connect } from 'react-redux';
import {View,Platform,  TouchableWithoutFeedbackBase, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import i18n from '../../i18n/i18n';
import  * as DEF   from '../../constant';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';


class DayHoursSetupEditor extends Component{
    constructor(props){

        super(props);
        let s = {};

        props.route.params.config[DEF.P_LIST].forEach(config => {
            s = Object.assign({}, s, { [config]: false} );
        });
        props.route.params.config[DEF.P_DEFINE].forEach(config => {
  
            if ( config[DEF.P_TYPE] === DEF.T_REFERENCE ) {
  
                s = Object.assign({}, s, { [config[DEF.P_NAME]]: props.config.config.define_default[config[DEF.P_DEF_REF]]});
            }          
        });
     
        this.state ={
            key: props.route.params.key,
            config: props.route.params.config,
            id: props.route.params.id,
            name: props.route.params.config.name || 'hours',
            data: s,
        } ;

        this.updateHours = this.updateHours.bind();
    } 


    updateHours = () => {
    
        let value = {};
        this.state.config[DEF.P_DEFINE].forEach( ele => {
              value = { ...value, [ele[DEF.P_NAME]]:this.state.data[ele[DEF.P_NAME]] }
        })

        let it ={};
        from(this.props.configurable.items[this.state.key])
        .pipe(
          filter( item => item.id === this.state.id),
        ).subscribe(
          item =>{ it = Object.assign({},item) }
        );

        let hours = it.hours;
        this.state.config[DEF.P_LIST].forEach( ele => {
        if( this.state.data[ele] ){
            hours = {
                 ...hours,
                 [ele]: value
             }
         }
         });


        this.props.putConfigurableItem(this.state.key,
             Object.assign({}, it,
                 { [this.state.name]: hours})
        ); 

    }


    render(){

        let    content = 
       <ThemeConsumer>
       { ({theme}) => (
           <>
           <Boxer title={ i18n.t('title.selectday') } >
           { this.state.config[DEF.P_LIST].map( ele => (
              <CheckBox title={i18n.t('label.'+ ele)}
               onPress={()=>(this.setState({ data:{
                   ...this.state.data,
                   [ele]:! this.state.data[ele]
                }}))}
                checked={this.state.data[ele]} />
           ))}
           </Boxer>

          
           { this.state.config[DEF.P_DEFINE].map( ele => (
              <Boxer title={ i18n.t('title.'+ ele[DEF.P_NAME]) } >
                    <CheckBox title={i18n.t('label.'+ (ele.switchon || ele.switchoff))}      
                       onPress={ ()=> (this.setState(
                           {data: {
                                ...this.state.data,
                                 [ele[DEF.P_NAME]]:
                                   { ...this.state.data[ele[DEF.P_NAME]],
                                    switch: !this.state.data[ele[DEF.P_NAME]].switch
                                   }
                            }}
                        ))}
                        checked={this.state.data[ele[DEF.P_NAME]].switch} />
                    <HoursSetter start = {this.state.data[ele[DEF.P_NAME]].start}
                              saveStart ={ (val)=> (this.setState(
                                    { data:{
                                        ...this.state.data,
                                        [ele[DEF.P_NAME]]:
                                        { ...this.state.data[ele[DEF.P_NAME]],
                                            start: val
                                        }
                                    }}
                              ))}
                              end = {this.state.data[ele[DEF.P_NAME]].end}
                              saveEnd ={ (val)=> (this.setState(
                                { data:{
                                    ...this.state.data,
                                    [ele[DEF.P_NAME]]:
                                    { ...this.state.data[ele[DEF.P_NAME]],
                                        end: val
                                    }
                                }}
                            ))}
                         />
              </Boxer>
           ))}

            <View style={theme.btnBox} >
                <RegularBtn title={i18n.t('button.save')}
                 onPress = {this.updateHours} />
            </View>

         </>
        )}
       </ThemeConsumer>

        

        return (
        <ScrollView>
        { content }
        </ScrollView>
        );
    }
}


const mapStateToProps = state =>{
    return { configurable: state.configurable, config:state.config };
};

export default connect(mapStateToProps,
        {
            putConfigurableItem,
        }
)(DayHoursSetupEditor); 