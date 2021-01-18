import React, { setState,Component } from 'react';

import { View } from 'react-native';
import { Button, Header, Text, Input } from 'react-native-elements';
import { ThemeProvider } from '@react-navigation/native';

export default class SignInScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
            repassword:'',
            passwordsame: false,
        }
        this.signUp = this.signUp.bind(this);
        this.setUserName = this.setUserName.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setRePassword = this.setRePassword.bind(this);
    }
    
  /*
    const { signIn } = React.useContext(AuthContext);
  */
    
    setPassword(pawd){
        this.setState( {password: pawd} );
    }
    setUserName(name){
        this.setState( {username: name} );
    }
    setPasswordSame(same){
        this.setState( { passwordsame: same});
    }
    setRePassword(val){
        this.setState( { repassword: val});
    }


    signUp(){

    }

    centerHeader = () => { 
        return (<Text>Sign Up</Text>);
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
         
        />
        <Input
          label ='Password'
          value={this.state.password}
          onChangeText={this.setPassword}
          textContentType='password'
          secureTextEntry
         
        />
         <Input
          label ='RePassword'
          value={this.state.repassword}
          onChangeText={this.setRePassword}
          textContentType='password'
          secureTextEntry
         
        />
        <Button warning title="Sign Up" onPress={() => signUp()} />
        
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
