import React, {Component}  from 'react';
import { ScrollView, FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import { SearchBar, ListItem, ThemeConsumer,Icon } from 'react-native-elements';

import { setClientLoading,
    setClientSearchKey,
    searchClientFamily
} from '../../action/clinicAction/ClientAction';
import { connect } from 'react-redux';
import { View, Text  } from 'react-native';
import i18n from '../../i18n/i18n';
import { ADDFAMILY, ADDMEMBER, EDITFAMILY, EDITMEMBER } from '../../constant';
import { PROVINCE_DATA } from '../../modal/selectData';

import {
    InlineInput,
    InlineSelect
} from '../basic/inlineElement';
import {
    IconBtn
} from '../basic';




class ClientSearch extends Component {
    constructor(props){
        super(props);
        this.state = { search: '' }
        this.onSearch = this.onSearch.bind();
    }


    onSearch = (text ) => {
        this.setState({search:text});
        if( text.length > 2) {
            this.props.setClientSearchKey(text);
            this.props.setClientLoading(true);
            this.props.searchClientFamily(text);
        }
    }

    updateFamily = (id, type, sid, name, value) => {
     
        from(this.props.client.families)
        .pipe(
          filter( item => item.id === id),
        ).subscribe(
          item =>{
            if( type === 'root' ){
              this.props.putClientFamily(Object.assign({}, item, { [name]: value}));
            } else if ( type === 'address'){
                this.props.putClientFamily(Object.assign({}, item,
                 { address: {
                     ...item.address,
                     [name]:value
                 }}
                 ));
            } else if ( type === 'members'){
              let membs = arrayReplace(item.members, sid, name, value)
              this.props.putClientFamily(Object.assign({}, item,
                { members:{membs}}
                ));
            }
          }
        );
      }

    render (){
      return (
        <ThemeConsumer>
        {({ theme })  => (
          <>
            <View style={{flex:1, flexDirection:'column' }}>
             <SearchBar
                placeholder={i18n.t('label.firstname')}
                onChangeText={ this.onSearch}
                value={this.state.search}
                platform={Platform.OS}
              />
            <FlatList
                    data = {this.props.client.families}
                    keyExtractor = { (item) => item.id}
                    renderItem = {
                    ({item}) =><>
                        <View style={theme.List.titleContainer}>
                         <Text style ={theme.List.titleText}> {item.members[0].firstname} {item.members[0].lastname}</Text>
                        </View>
                        <View style={theme.List.container}>
                            <InlineInput label={i18n.t('label.street')}
                                 text={item.address.street}
                                 id = {item.id} type='address' name='street'
                                 save={this.updateFamily}/>
                            <InlineInput label={i18n.t('label.city')}
                                 text={item.address.city}
                                 id = {item.id} type='address' name='city'
                                 save={this.updateFamliy}/>
                            <InlineSelect label={i18n.t('label.province')}
                                 text={item.address.province}
                                 id = {item.id} type='address' name='province'
                                 placeholder = {i18n.t('label.province')}
                                 data = { PROVINCE_DATA }
                                 save={this.updateFamily}/>
                            <InlineInput label={i18n.t('label.postcode')}
                                 text={item.address.postcode}
                                 id = {item.id} type='address' name='postcode'
                                 save={this.updateFamliy}/>
                            <InlineInput label={i18n.t('label.phone')}
                                 text={item.phone}
                                 id = {item.id} type='root' name='phone'
                                save={this.updateFamily}/>
                        </View>
                        <View style={theme.List.listsContainer}>
                            <View style={theme.List.listsLeft} >
                                <View style={theme.List.listsTitleContainer}>
                                <Text style ={theme.List.listsTitleText}> {i18n.t('title.members')}</Text>
                                </View>
                                {
                                item.members.map( (mem,idx) => (
                                <ThemeConsumer>
                                {({ theme })  => (
                                    <ListItem 
                                        key = {mem.option} 
                                        leftElement = {
                                        <View style={theme.List.listsListContainer}>
                                            <InlineInput label={i18n.t('label.firstname')}
                                                text={mem.firstname}
                                                id = {item.id} type='members' sid ={mem.id} name='fristname'
                                                save={this.updateFamily}/>
                                            <InlineInput label={i18n.t('label.lastname')}
                                                text={mem.lastname}
                                                id = {item.id} type='members' sid ={mem.id} name='lastname'
                                                save={this.updateFamily}/>
                                             <InlineInput label={i18n.t('label.phone')}
                                                text={mem.phone}
                                                id = {item.id} type='members' sid ={mem.id} name='phone'
                                                save={this.updateFamily}/>
                                             <InlineInput label={i18n.t('label.email')}
                                                text={mem.email}
                                                id = {item.id} type='members' sid ={mem.id} name='email'
                                                save={this.updateFamily}/>
                                        </View>   
                                        }                                      
                                        containerStyle ={{flex:1, margin:1, padding:2}}
                                        contentContainerStyle={{flex:0}}
                                        bottomDivider
                                        checkmark = {false}
                                    />
                                )}
                                </ThemeConsumer>
                                )) 
                                }          
                            </View>
                            <View style={theme.List.listsRight} >
                                <IconBtn onPress= {()=> this.props.navigation.navigate("ClientModal",{
                                    type: ADDMEMBER
                                   })}
                                   icon ={ theme.IconBtn.addMember}
                                 />
                            </View>
                        </View>
                        </>
                    }     
                />
                </View>
                </>
            )}
            </ThemeConsumer>
     );
    }
}


const mapStateToProps = state =>{
    return { client: state.client };
};

export default connect(mapStateToProps,
    {
        setClientLoading,
        setClientSearchKey,
        searchClientFamily
    }
    )(ClientSearch); 
