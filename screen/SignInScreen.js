import React, { setState,Component } from 'react';

import { View } from 'react-native';
import { Button, Header, Text, Input, Divider } from 'react-native-elements';
import { ThemeProvider } from '@react-navigation/native';

export default class SignInScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:''
        }
        this.signIn = this.signIn.bind(this);
    }
    
  /*
    const { signIn } = React.useContext(AuthContext);
  */
    
    setPassword(val){
        this.setState( {password: val} );
    }
    setUserName(val){
        this.setState( {username:val} );
    }

    signIn(name, pawd){

    }

    centerHeader = () => { 
        return (<Text>Sign In</Text>);
    }

    render(){
    return (
        <ThemeProvider>
          
        <Header 
                centerComponent = { this.centerHeader}
        ></Header>
        <View style={ {flex:1} }>
            <View style={ {flex:1} }/>
            <View style={ {flex:1, flexDirection:'column'} }>
        <Input label='User Name'
         value={this.state.username}
         onChangeText={this.setUserName}
         textContentType = 'username'
         leftIcon='md-person'
        />
        <Input
          label ='Password'
          value={this.state.password}
          onChangeText={this.setPassword}
          textContentType='password'
          secureTextEntry
          leftIcon='locked'
        />
        <Button title="Sign In" onPress={() => signIn({ username, password })} />
        <Divider style={ {height: 20, backgroundColor:'#ffffff'} }/>
        <Button title="Sign Up" onPress={() => this.props.navigation.navigate('SignUp')} />
        </View>
        <View style={ {flex:1} } />
        </View>
      </ThemeProvider>
    );
    }
  }

  /*
  <Input
          label="User Name"
          value={this.state.username}
          onChangeText={this.setUsername}
          textContentType = "username"
        />
        <Input
          label ="Password"
          value={this.state.password}
          onChangeText={this.setPassword}
          textContentType="password"
          secureTextEntry
        />
  */
