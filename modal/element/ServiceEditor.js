
import React,{setState, Component} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text,  CheckBox, ThemeConsumer,Slider } from  'react-native-elements';
import { Icon } from 'react-native-vector-icons/Ionicons';
import { Boxer,
     DatesSetter,
    RegularBtn,
    } from '../../element/basic';

import {
    postService
} from '../../action/commAction/ServiceAction';
import { connect } from 'react-redux';
import {View,Platform,  TouchableWithoutFeedbackBase, Switch } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import i18n from '../../i18n/i18n';
import { ADDSERVICE, ADDOPTION } from '../../constant';
import { Input } from 'react-native-elements';
import { from } from 'rxjs';
import { filter, throwIfEmpty } from 'rxjs/operators';
import { COLOR_DATA } from '../selectData';

import { SwitchWrapper,
    IntegerSlider,
    PriceInput,
    SelectWrapper
 } from '../../element/basic/wrapperElement';

class ServiceEditor extends Component{
    constructor(props){
        super(props);
        this.state = {
            mid: this.props.route.params.id,
            name:'',
            color:'',
            taxable:true,
            imgurl:'',
            description:'',
            option:'',
            duration:0,
            price:1.01,
            sale:{
                onsale: false,
                start: new Date(),
                end: new Date(),
                note:'',
            }
        }
     
      this.nameChange = this.nameChange.bind();
      this.colorChange = this.colorChange.bind();
      this.toggleTaxable = this.toggleTaxable.bind();
      this.imgurlChange = this.imgurlChange.bind();
      this.descriptionChange = this.descriptionChange.bind();
      this.optionChange = this.optionChange.bind();
      this.durationChange = this.durationChange.bind();
      this.priceChange = this.priceChange.bind();
      this.toggleOnSale = this.toggleOnSale.bind();
      this.saleStartChange = this.saleStartChange.bind();
      this.saleEndChange = this.saleEndChange.bind();
      this.saleNoteChange = this.saleNoteChange.bind();
    } 

    nameChange= (val) =>{this.setState({name:val})};
    colorChange= (val) =>{this.setState({color:val})};
    imgurlChange= (val) =>{this.setState({imgurl:val})};
    descriptionChange= (val) =>{this.setState({description:val})};

    optionChange= (val)=> { this.setState( { option : val} ) };
    durationChange= (val)=> { this.setState( { duration : val} ) };
    priceChange= (val)=> {
         this.setState( { price: val} );
        };
    saleStartChange = (val)=>{
         this.setState({
              sale: {
                  ...this.state.sale,
                  start:val
            }
        })
    };
    saleEndChange = (val)=> {
        this.setState({
            sale: {
                ...this.state.sale,
                end:val
            }
        })
    };
    saleNoteChange = (val)=> {
        this.setState({
            sale: {
                ...this.state.sale,
                note:val
            }
        })
    };


    toggleTaxable= () => {
        this.setState({taxable: !this.state.taxable})
    }
    
    toggleOnSale= () => {
        this.setState({ sale:{
            ...this.state.sale,
            onsale: !this.state.sale.onsale}})
    }
   

    saveService =() =>{
        this.props.postService({
                id:'',
                name: this.state.name,
                taxable: this.state.taxable,
                color: this.state.color,
                description: this.state.description,
                imgurl: this.state.imgurl,
                options:[{
                    option: this.state.option,
                    duration: this.state.duration,
                    price: this.state.price,
                },],
                sale:{
                    onsale: this.state.sale.onsale,
                    start: this.state.sale.start,
                    end: this.state.sale.end,
                    note: this.state.sale.note,
                }
        });
    }

    updateService =() =>{
        from(this.props.service.services)
        .pipe(
            filter( (item) => item.id === this.state.mid )
        ).subscribe( (item) => {
            this.props.putService( Object.assign({}, item,
            {options:[
                ...item.options,
                { option: this.state.opption,
                duration: this.state.duration,
                price: this.state.price
                }
            ]}
            ));
        });
    }

    render(){
        const {type, id } = this.props.route.params;
        let data = COLOR_DATA;
        let content;
        if ( type === ADDSERVICE){
        content = 
            <ThemeConsumer>
            {({theme}) => (
            <>
             <Boxer title={i18n.t('title.service')} >
            <View style={theme.formContainer}>
                <Input label={i18n.t('label.name')}
                 onChangeText = {this.titleChange} />
                <SwitchWrapper label = {i18n.t('label.taxable')}
                 checked = {this.state.taxable} 
                 onChange = {this.toggleTaxable} />
                <SelectWrapper label ={i18n.t('label.color')}
                items = { data }
                placeholder = {i18n.t('label.color')}
                onValueChange = {this.colorChange}
                />
                <Input label={i18n.t('label.description')}
                 onChangeText = {this.descriptionChange} />
            </View>
            </Boxer>
            <Boxer title={i18n.t('title.option')} >
            <View style={theme.formContainer}>
                <Input label={i18n.t('label.option')}
                 onChangeText = {this.optionChange} />
                <IntegerSlider label = {i18n.t('label.duration')}
                 value = {this.state.duration} 
                 onChange = {this.durationChange}
                />
                <PriceInput label={i18n.t('label.price')}
                    value ={this.state.price}
                    onChange = {this.priceChange}
                />           
               
            </View>
            </Boxer>
            <Boxer title={i18n.t('title.sale')} >
                <CheckBox title={i18n.t('label.onsale')} onPress={this.toggleOnSale}
                 checked={this.state.sale.onsale} />
                { this.state.sale.onsale && <>
                <DatesSetter start = {this.state.sale.start}
                    saveStart ={this.saleStartChange}
                    end = {this.state.sale.end}
                    saveEnd = {this.saleEndChange}
                />
                <Input label={i18n.t('label.note')}
                onChangeText = {this.saleNoteChange} />
                </>
                }   
            </Boxer>
            <View style={theme.btnBox} >
                <RegularBtn title={i18n.t('button.save')} onPress={this.saveService}/>
            </View>
            </>
            )}

            </ThemeConsumer>
        
        } else if ( type === ADDOPTION){
            content = 
            <ThemeConsumer>
            {({theme}) => (
            <>
            <Boxer title={i18n.t('title.option')} >
            <View style={theme.formContainer}>
                <Input label={i18n.t('label.option')}
                 onChangeText = {this.optionChange} />
                <IntegerSlider label = {i18n.t('label.duration')}
                 value = {this.state.duration} 
                 onChange = {this.durationChange}
                />
                <PriceInput label={i18n.t('label.price')}
                    value ={this.state.price}
                    onChange = {this.priceChange}
                />
            </View>
            <View style={theme.btnBox} >
                <RegularBtn title={i18n.t('button.save')} onPress={this.updateService}/>
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
    return { service: state.service };
};

export default connect(mapStateToProps,{
        postService
})(ServiceEditor); 

