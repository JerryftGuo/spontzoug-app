import React, {Component}  from 'react';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import {ThemeConsumer, Overlay,Icon } from 'react-native-elements';
import { RegularBtn
} from '../basic';



import { 
    deleteAppointment,
    buildInvoice
} from '../../action/clinicAction/AppointmentAction';
import { connect } from 'react-redux';
import { Dimensions,View, Text  } from 'react-native';
import i18n from '../../i18n/i18n';
import { EDITAPPOINTMENT } from '../../constant';
import Pdf from 'react-native-pdf';
import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf-lib';
import RNHTMLtoPDF from 'react-native-html-to-pdf';


class AppointmentActuator extends Component {
    constructor(props){
        super(props);
        this.state ={
            isVisible: false,
            filepath:'',
            error:''
        }
        this.showCancelOverLay = this.showCancelOverLay.bind();
        this.hideCancelOverLay = this.hideCancelOverLay.bind();
        this.setFilePath = this.setFilePath.bind();
        this.setError = this.setError.bind();
    }

    showCancelOverLay = ()=>{
        this.setState({isVisible: true});
    }
    hideCancelOverLay = ()=>{
        this.setState({isVisible: false});
    }

    setFilePath = (path) =>{
        this.setState({filePath: path});
    }
    setError = (error) =>{
        this.setState({error:error});
    }
/*
    async buildInvoice() {
     const page1 = PDFPage
         .create()
        .setMediaBox(200,200)
        .drawText('You are here, Sr.',{
            x:5, y:235, color:'#007386',
            fontName:'times-new-roman'
         }).drawRectangle({
            x:25, y:25, width: 150, height:150, color:'#ff99cc'
        });

//     const path = FileSystem.DocumentDirectory;
//     const pdfPath = "{path}/sample.pdf";
    const docsDir = await PDFLib.getDocumentsDirectory()
    .then( path => {return path })
    .catch( this.setError);
    const pdfPath = `${docsDir}/sample.pdf`;
    PDFDocument.create(pdfPath)
    .addPages(page1)
    .write()
    .then( this.setFilePath )
    .catch( this.setError);

}
*/



    
    async buildInvoice(){
        let options ={
            html:'<h1> PDF text </h1>',
            fileName:'testfile',
            directory:'Documents'
        }

        let file = await RNHTMLtoPDF.convert(options)
        .then( file => {return file})
        .catch( this.setError);
        this.setFilePath(file.filePath);
    }

    showPdf(){
        const source = {require:('../../assets/doc/wok1.pdf')};
        this.render(
            <ThemeConsumer>
                {({theme})=>(
                <View style={theme.pdfContainer}>
                    <Pdf
                        source = {sourcr}
                        onLoadComplete = {()=>{}}
                        onPageChanged = {()=>{}}
                        onError = {()=>{}}
                        onPressLink = {()=>{}}
                        style = {theme.pdf}
                    />
                </View>
                )}
            </ThemeConsumer>
           
        );
    }

    render (){
        const { id, datetime, client,practitioner, service } = this.props.route.params;
        return (

        <ThemeConsumer>
         {({ theme })  => (
        <>
        
        <View style = {theme.infoBox}>
           <Text> {datetime} </Text>
           <Text> {client } </Text>
           <Text> {practitioner}</Text>
           <Text> {service}</Text>
           <Text> {this.state.filePath} </Text>
           <Text> {this.state.error} </Text>
        </View>
       
       <Overlay
        isVisible = {this.state.isVisible}
        children = {
            <View style={theme.btnStyle}>
            <View style = {theme.warningBox}>
            <Text style ={theme.warningText}> {i18n.t('mesg.deleteappointment')}</Text>
            <Text> {datetime} </Text>
            <Text> {client } </Text>
            <Text> {practitioner}</Text>
            <Text> {service}</Text>
            </View>
            < View style={theme.btnBox} >
            <RegularBtn onPress={()=> this.props.deleteAppointment({id}) }
             title={i18n.t('button.confirm')}
            />
            <RegularBtn onPress={this.hideCancelOverLay } title={i18n.t('button.discard')}
             />
             </ View>
            </View>
        } 
       />
   
              
        <View style={theme.btnBox}>
        <RegularBtn onPress={()=> this.props.navigation.navigate("AppointmentModal",{
            type: EDITAPPOINTMENT,
            id: id,
            datetime: datetime,
            client:client,
            practitioner: practitioner,
            service: service
             })} title={i18n.t('button.edit')}
             />
        <RegularBtn onPress={this.showCancelOverLay }
         title={i18n.t('button.cancel')}
         />
        <RegularBtn onPress={this.buildInvoice}
         title={i18n.t('button.buildinvoice')}
        />
         <RegularBtn onPress={()=> this.props.buildInvoice({id:id})}
         title={i18n.t('button.viewinvoice')}
         
         />
        </View>
        </>
       
        )}   
        </ThemeConsumer>
     
    )};
}


const mapStateToProps = state =>{
    return { appointment: state.appointment };
};

export default connect(mapStateToProps,
    {
      deleteAppointment,
      buildInvoice
    }
    )(AppointmentActuator); 

   