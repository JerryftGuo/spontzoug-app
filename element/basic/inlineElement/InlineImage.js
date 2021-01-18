import React, {setState, Component } from 'react';
import { View, Text, TouchableHighlightBase} from 'react-native';
import { ThemeConsumer, Button } from 'react-native-elements';
import  FastImage  from 'react-native-fast-image';
import { IconBtn } from '..';
import { ScrollView } from 'react-native-gesture-handler';
import PhotoUpload from 'react-native-photo-upload';
import { throwIfEmpty } from 'rxjs/operators';
import  InlineInput  from './InlineInput';
import { InlineImage } from '.';
import i18n from '../../../i18n/i18n';
import { arrayReplace } from '../../../utils';


export default class InlinImage extends Component {
    constructor(props){
        super(props);
        this.state = {
            current: 0,
            images: this.props.images,
            config: this.props.config,
        }
        this.onPrev = this.onPrev.bind();
        this.onNext = this.onNext.bind();
    }


    toggleValue = () =>{
        this.props.save && 
        this.props.save(this.props.id, this.props.type, this.props.sid, this.props.name, !this.props.checked);

    }

    onNext = ( ) => {
        if( this.state.current < (this.state.config.limit-1) 
           && this.state.current < (this.state.images.length-1) ) {
           this.setState({current: this.state.current+1})
        }
    }

    onPrev = ( ) => {
        if( this.state.current  >0 ) {
            this.setState({current: this.state.current-1})
        }
    }

    updateImage = ( data ) => {
        let imgs = arrayReplace(this.state.images, this.state.images[this.state.current].id, 'uri', data )
        this.props.save && this.props.save( imgs )
    }
    updateTitle = (data) =>{
        const title = 'title'
        console.warn('imgs:'+ JSON.stringify(this.state.images))
        let imgs = arrayReplace(this.state.images, this.state.images[this.state.current].id, title, data )
    console.warn('imgs:'+ JSON.stringify(imgs))
        this.props.save && this.props.save( imgs )

    }
    deleteImage = ()=>{
        let imgs = arrayReplace(this.state.images, this.state.images[this.state.current].id, 'uri', this.state.config.default )
        this.props.save && this.props.save( imgs )
    }

    render(){
        return (
            <ThemeConsumer>
                {({theme}) =>(
                <View style ={theme.InlineImage.container}>
                    <View style ={theme.InlineImage.imageContainer}>
                        <ScrollView>
                        <PhotoUpload 
                            maxWidth = {this.state.config.width || 800}
                            maxHeight ={this.state.config.height || 800}
                        >
                        <FastImage 
                            style = {{width:300, height:300 }}
                            source = {{
                                uri:  this.state.images[this.state.current].uri ,
                                headers:{},
                                priority:  FastImage.priority.normal
                            }}
                            resizeMode ={ FastImage.resizeMode.contain}   
                        />
                        </PhotoUpload>
                        </ScrollView>
                        <View style ={theme.InlineImage.titleContainer}>
                        <InlineInput
                           label ={i18n.t('label.title')}
                           text = {this.state.images[this.state.current].title}
                           save = {this.updateTitle} 
                        />
                        </View>
                    </View>

                    <View style ={theme.InlineImage.cmdContainer}>
                
                        <IconBtn onPress={()=>{}}
                           icon = {theme.IconBtn.deleteBtn}
                         />
                        <IconBtn onPress={this.onNext}
                         icon = {theme.IconBtn.forwardBtn}
                         />
                        <IconBtn onPress={this.onPrev}
                         icon = {theme.IconBtn.backwardBtn}
                       />
                    </View>                 
                </View>
                )}
            </ThemeConsumer>
        );
    }
}
