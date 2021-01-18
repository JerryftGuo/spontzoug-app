import React,{setState, Component} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Header, Input, CheckBox, ThemeConsumer } from  'react-native-elements';
import { Icon } from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
import { Title,Boxer, RegularBtn } from '../../element/basic';
import {
    postClientFamily,
    putClientFamily
} from '../../action/clinicAction/ClientAction';
import { connect } from 'react-redux';
import {View,Platform,  TouchableWithoutFeedbackBase } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ADDFAMILY,ADDMEMBER, EDITFAMILY, EDITMEMBER } from '../../constant';
import i18n from '../../i18n/i18n';
import { PROVINCE_DATA } from '../selectData';
import { SwitchWrapper } from '../../element/basic/wrapperElement';

class ClientEditor extends Component{
    constructor(props){
        super(props);
        this.state = {
            familyid: props.route.params.fid,
            familyphone: '',
            familystreet: '',
            familycity: '',
            familyprovince: '',
            familypostcode: '',
            memberfirstname: '',
            memberlastname: '',
            memberphone: '',
            memberemail: '',
            memberprimary: false                  
        }

      this.familyidChange = this.familyidChange.bind();
      this.familyphoneChange = this.familyphoneChange.bind();
      this.familystreetChange = this.familystreetChange.bind();
      this.familycityChange = this.familycityChange.bind();
      this.familyprovinceChange = this.familyprovinceChange.bind();
      this.familypostcodeChange = this.familypostcodeChange.bind();
      this.memberfirstnameChange = this.memberfirstnameChange.bind();
      this.memberlastnameChange = this.memberlastnameChange.bind();
      this.memberphoneChange = this.memberphoneChange.bind();
      this.memberemailChange = this.memberemailChange.bind();
      this.memberprimaryChange = this.memberprimaryChange.bind();

    }
    
    familyidChange= (val)=> { this.setState( { familyid : val} ) };
    familyphoneChange= (val)=> { this.setState( { familyphone : val} ) };
    familystreetChange= (val)=> { this.setState( { familystreet : val} ) };
    familycityChange= (val)=> { this.setState( { familycity : val} ) };
    familyprovinceChange= (val)=> { this.setState( { familyprovince : val} ) };
    familypostcodeChange= (val)=> { this.setState( { familyphone : val} ) };
    memberfirstnameChange= (val)=> { this.setState( { memberfirstname : val} ) };
    memberlastnameChange= (val)=> { this.setState( { memberlastname : val} ) };
    memberphoneChange= (val)=> { this.setState( { memberphone : val} ) };
    memberemailChange= (val)=> { this.setState( { memberemail : val} ) };
    memberprimaryChange= ()=> {
      this.setState( { memberprimary : !this.state.memberprimary} ) };

    
    render(){
        const { type, fid } = this.props.route.params;
        
        let content;
        if( type == ADDFAMILY ){
            let data = PROVINCE_DATA;
            content = 
                <ThemeConsumer>
                  {({theme}) => (
              <>
              <Boxer title= {i18n.t('label.address')} >
              <Input label={i18n.t('label.street')}
                     onPress = {this.familystreetChange }
                     />
              <Input label={i18n.t('label.city')}
                    onPress = {this.familycityChange }
                     />
              <RNPickerSelect
                onValueChange = {this.familyprovinceChange}
                items = { data }
                placeholder = { {label: i18n.t('label.province'), value:null}}
              />
              <Input label={i18n.t('label.postcode')}
                 onValueChange = {this.familyprovinceChange}
                />
              <Input label={i18n.t('label.homephone')}
                 onValueChange = {this.familyprovinceChange}
                 />
              </Boxer>
              <Boxer title ={i18n.t('label.patient')} >
              <Input label={i18n.t('label.firstname')}
                    onValueChange = {this.memberfirstnameChange}
                    />
              <Input label={i18n.t('label.lastname')}
                    onValueChange = {this.memberlastnameChange}
                    />
              <Input label={i18n.t('label.cellphone')}
                    onValueChange = {this.memberphoneChange}
                    />
              <Input label={i18n.t('label.email')}
                    onValueChange = {this.memberemailChange}
                    />
              <SwitchWrapper label ={i18n.t('label.primary')}
                    checked = {this.state.memberprimary }
                    onPress = {this.memberprimaryChange}
                    />
              </Boxer>
            <View style={theme.btnBox} >
             <RegularBtn onPress = {() => this.props.postClientFamily({
                 id:'',
                 phone: this.state.familyphone,
                 address:{
                     street: this.state.familystree,
                     city: this.state.familycity,
                     province: this.state.familyprovince,
                     postcode: this.state.familypostcode
                 },
                 members:[{
                    id: 1,
                    firstname: this.state.memberfirstname,
                    lastname: this.state.memberlastname,
                    cellphone: this.state.memberphone,
                    email: this.state.memberemail
                 },]
             })} title={i18n.t('button.save')}
              />
             </View>
            </>
            )}
             </ThemeConsumer>
            
        } else   if( type === ADDMEMBER ){
             content = 
                    <ThemeConsumer>
                      {({theme}) =>(                   
                <>
                 <Boxer title={i18n.t('label.member')} >
              <Input label={i18n.t('label.firstname')}
                onValueChange = {this.memberfirstnameChange}  />
              <Input label={i18n.t('label.lastname')}
                onValueChange = {this.memberlastnameChange}  />
              <Input label={i18n.t('label.cellphone')}
                onValueChange = {this.memberphoneChange} />
              <Input label={i18n.t('label.email')}
                onValueChange = {this.memberphoneChange}  />
              <SwitchWrapper label={i18n.t('label.primary')}
                checked = {this.state.memberprimary }
                onChange = {this.memberprimaryChange} />
              <View style={theme.btnBox} >
                 <RegularBtn onPress = {() => this.props.putClientFamily({
                 id: fid, 
                 phone: this.state.familyphone,
                 address: {
                     street: this.state.familystreet,
                     city: this.state.familycity,
                     province: this.state.familyprovince,
                     postcode: this.state.familypostcode
                 },
                 members:[
                    ...members,
                    {
                        id: emmbsize,
                        firstname: this.state.memberfirstname,
                        lastname: this.state.memberlastname,
                        phone: this.state.memberphone,
                        email: this.state.memberemmail,
                        primary: this.state.memberprimary
                    },
                 ]                              
             })} title={i18n.t('button.save')}
            
             />
             </View>
             </Boxer>         
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

const mapStateToProps = state =>{
    return { client: state.client };
};

export default connect(mapStateToProps,{
        postClientFamily,
        putClientFamily
})(ClientEditor); 
