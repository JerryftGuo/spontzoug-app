import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { ThemeConsumer, SearchBar, Button } from 'react-native-elements';
import { throwIfEmpty } from 'rxjs/operators';

export default class SearchBarBtn extends Component{
    constructor(props){
        super(props);
        this.state ={
            text: this.props.value,
        }
        this.textChange = this.textChange.bind();
        this.onSearch = this.onSearch.bind();
    }

    onSearch =() =>{
        this.props.updateSearch && this.props.updateSearch();
    }

    textChange = (text) =>{
        this.props.textChange && this.props.textChange(text);
    }

    render(){
        return(
        <ThemeConsumer>
        { ({theme}) => (
            <View style={theme.SearchBarBtn.container}>
              <View style={theme.SearchBarBtn.searchContainer}>
              <SearchBar
                placeholder={this.props.placeholder}
                onChangeText={ this.textChange}
                value={this.state.text}
                platform={Platform.OS}
              />
              </View>
              <View style ={theme.SearchBarBtn.btnContainer} >
                     <Button onPress= {this.onSearch}
                        icon ={ theme.BtnIcon.searchBtn}
                        buttonStyle ={ theme.BtnIcon.btnStyle}
                        containerStyle ={theme.BtnIcon.containerStyle}
                        type ={theme.iconStyle.type} />
                    {this.props.children}
              </View>
            </View>
        )}
        </ThemeConsumer>
        );
    }
}