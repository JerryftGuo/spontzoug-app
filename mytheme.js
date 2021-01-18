import { Dimensions } from "react-native";
import { isTupleTypeNode } from "typescript";
import { reduce } from "rxjs/operators";

/*
 #192e5b #1d65a6 #72a2c0 #00743f #f2a104

 #80add7 #0abda0 Bebf2ea #d4dca9 #bf9d7a 

 1  2fdda8  59d9b9
*/



export const mytheme = (type) => {

    const theme = {
        light:{
            PRIMARY:'#2FDDA8',
            PRIMARY_BACKGROUND:'#FCFCFC',
            SECONDARY:'#59D9B9',
            SECONDARY_BACKGROUND:'#FAF8F9',
            LIGHTGREY:'#EAEEED',
            MEDIUMGREY:'#8C7289',
            GREY:'#BBACBA',
            DARKGREY:'#4B3D4A',
           
           
            SUCCESS:'',
            ERROR:'',
            WARNING:'',
            MESSAGE:'',
        },
        dark:{
    
        }
    };


    return ({
    colors:{
        error: 'red',
        headericon: 'white'
    },

    Header:{
        backgroundColor: theme[type].PRIMARY_BACKGROUND,
        textStyle :{
            color: theme[type].PRIMARY,
            fontSize: 20,
        },
        btnStyle:{
            type:'clear',
        },
        backIcon: {
            color:theme[type].PRIMARY,
            name:'arrow-back',
            type:'material',
        },
        settingIcon:{
            color:theme[type].PRIMARY,
            name:'settings',
            type:'material',
        },
        cancelIcon:{
            color:theme[type].PRIMARY,
            name:'clear',
            type:'material',
        },
    },

    Title:{
        container:{
            padding:5,
            backgroundColor:theme[type].SECONDARY,
        },
        text:{
            fontSize: 18,
            textAlign:'center',
            color:theme[type].SECONDARY_BACKGROUND,
        }
    },
    TitleWithBtn:{
        container:{
            flexDirection:'row',
            padding:3,
            margin:2,
            backgroundColor:theme[type].SECONDARY_BACKGROUND,
        },
        titleContainer:{
            marginTop:8,
           flex:1,
        },
        titleText:{
            fontSize: 18,
            textAlign:'center',
            textAlignVertical:'bottom',
            color:theme[type].SECONDARY,
        },
        btnContainer:{
            flex:0,
        },
    },

    Overlay:{
        style:{
            flex:1,
            margin:10,
            padding:20,
            borderWidth:0,
            borderRadius:5,
            borderColor:theme[type].MEDIUMGREY,
        }
    },

    Input:{
        containerStyle:{
            margin:0,
            padding:0,
        },
        inputStyle:{
            margin:0,
            padding:0,
        },
        renderErrorMessage: false,
        labelStyle:{
            fontSize:14,
            color:theme[type].MEDIUMGREY,
        }
    },

    Icon:{
        size:18,
        color:'white'
    },
    RNPickerSelect:{
        TextInputProps:{
            color: 'black'
        }
    },
    CheckBox:{
        size:18,
        containerStyle:{
            margin:1,
            padding:3
        },
        titleProps:{
            style:{
                fontSize:14,
                fontWeight:'100',
            }
        }
    },
    DateTimeWrapper:{
        container:{
            flex:1,
            flexDirection:'row',
            margin:10,
        },
        labelContainer:{
            flex:1

        },
        datetimeContainer:{
            flex:0,
        },
        labelStyle:{
            fontSize:14,
            fontWeight:'bold',
            color:theme[type].MEDIUMGREY,
        },
    },
    BasicDateTimePicker:{
        datetimeContainer:{
            flex:1,
            flexDirection:'row'
        },datetimeText:{
            fontSize:16,
            fontWeight:'bold',
            color:theme[type].PRIMARY,
        },dateBtnIcon:{
            name:'today',
            type:'material',
            color:theme[type].GREY,
            size:18
        },timeBtnIcon:{
            name:'schedule',
            type:'material',
            color:theme[type].GREY,
            size:18
        },datetimeBtn:{
            flex:0,
            borderWidth:0,
            margin:0,
            padding:0
        },
    },
      
    SwitchWrapper:{
        container:{
            flex:1,
            flexDirection:'row',
            margin:10,
        },
        labelContainer:{
            flex:4

        },
        switchContainer:{
            flex:1
        },
        labelStyle:{
            fontSize:14,
            fontWeight:'bold',
            color:theme[type].MEDIUMGREY,
        },
    },
    Switch:{
        thumbColor: theme[type].PRIMARY,        
    },
    
    InlineText:{
        labelContent:{
            margin: 5,
        },labelStyle:{
            fontSize:12,
            color:theme[type].GREY,
            textAlignVertical:'top',
        },textContent:{
            flex:5,
        }  

    },
    Paper:{
        container:{
        flex:1,
        flexDirection:'column',
        margin:10,
        padding:10,
        borderWidth:1,
        borderRadius:5,
        borderColor:theme[type].GREY,
        }
    },
    TextArea:{
        container:{
            flex:1,
            flexDirection:'column',
            margin:10,
        },
        labelContainer:{
            flex:0,
        },
        textContainer:{
            flex:1,
        },
        labelStyle:{
            fontSize:14,
            fontWeight:'bold',
            color:theme[type].MEDIUMGREY,
        },
        defaultLength: 512,
        style:{
            textAlignVertical:'top',
        }
    },
    SelectWrapper:{
        container:{
            flex:1,
            flexDirection:'row',
            margin:10,
        },
        labelContainer:{
            flex:1,
        },
        selectContainer:{
            flex:3,
        },
        labelStyle:{
            fontSize:14,
            fontWeight:'bold',
            color:theme[type].MEDIUMGREY,
        }
    },
    NumericInput:{
        step:1,
        minValue:0,
        maxValue:120,
        totalWidth:100,
        totalHeight:30,
        editable:true,
        textColor: theme[type].DARKGREY,
        leftButtonBackgroundColor:theme[type].LIGHTGREY,
        rightButtonBackgroundColor:theme[type].LIGHTGREY,
        inputStyle:{
            fontSize:18,
        }
    },
    IntegerInput:{
        container:{
            flex:1,
            flexDirection:'row',
            margin:10,
        },
        labelContainer:{
            flex:1
        },
        inputContainer:{
            flex:0,
        },
        labelStyle:{
            fontSize:14,
            fontWeight:'bold',
            color:theme[type].MEDIUMGREY
        },
    },
    PriceInput:{
        container:{
            flex:1,
            flexDirection:'row',
            margin:10,
        },
        labelContainer:{
            flex:1
        },
        labelStyle:{
            fontSize:14,
            fontWeight:'bold',
            color:theme[type].MEDIUMGREY,
        },
    },
    Price:{
        container:{
            flex:0,
            flexDirection:'row'
        }
    },
    IntegerSlider:{
        container:{
            flex:1,
            flexDirection:'row',
            margin:10,
        },
        labelContainer:{
            flex:1
        },
        sliderContainer:{
            flex:4
        },
        labelStyle:{
            fontSize:14,
            fontWeight:'bold',
            color:theme[type].MEDIUMGREY,
        },
    },
    SliderWithData:{
        container:{
            flex:1,          
        },textContainer:{
            flex:1,
            flexDirection:'row'
        },minContainer:{
            flex:1,
        },valueContainer:{
            flex:2,
        },maxContainer:{       
            flex:1
        },minStyle:{
            fontSize:10,
            textAlign:'left',
        },valueStyle:{
            fontSize:14,
            textAlign:'center',
        },maxStyle:{
            fontSize:10,
            textAlign:'right',
        },
        thumbTintColor: theme[type].PRIMARY,
    },
    Boxer:{
        container:{
            margin:5,
        },titleContainer:{
            flex:1,
            flexDirection:'row',
        },titleLeft:{
            flex:1,
            flexDirection:'column',
        },titleLeftUp:{
            flex:1,
        },titleLeftDown:{
            flex:1,
            borderTopWidth:1,
            borderLeftWidth:1,
            borderColor:theme[type].PRIMARY,
            borderTopLeftRadius:5,
            borderTopRightRadius:5,
        },titleCenter:{
            flex:0,
            marginLeft:5,
            marginRight:5,
        },titleRight: {
            flex:1,
            flexDirection:'column',
        },titleRightUp: {
            flex:1,
        },titleRightDown: {
            flex:1,
            borderTopWidth:1,
            borderRightWidth:1,
            borderColor:theme[type].PRIMARY,
            borderTopLeftRadius:5,
            borderTopRightRadius:5,
        },titleText:{
            fontSize: 18,
            fontWeight:'100',
            color:theme[type].PRIMARY,
        },contentContainer:{
            borderLeftWidth: 1,
            borderRightWidth:1,
            borderBottomWidth:1,
            borderColor:theme[type].PRIMARY,
            borderBottomLeftRadius:5,
            borderBottomRightRadius:5,
        }

    },

    InlineImage:{
        container:{
            flex:1,
            flexDirection:'row',
            margin:5,
        },imageContainer:{
            flex:1,
            flexDirection:'column',
            borderWidth:1,
            borderRadius:5,
            padding:2,
            borderColor: theme[type].GREY,
        },cmdContainer:{
            flex:0,
            justifyContent:'space-evenly',
        },selectContainer:{

        }
    },  

    btnBox:{
        flex:1,
        padding:10,
    },
   
    IconBtn:{
        type:'clear',
        btnStyle:{
            margin:0,
            padding:0,
        },
        addMember:{
            type:'material',
            name:'person-add',
            color:theme[type].PRIMARY,
            size: 30,
        },
        addFamily:{
            type:'material',
            name:'group-add',
            color:theme[type].PRIMARY,
            size: 30,
        },
        addPhoto:{
            type:'material',
            name:'add-a-photo',
            color:theme[type].PRIMARY,
            size: 30,
        },
        addBtn:{
            type:'material',
            name:'add-circle',
            color:theme[type].PRIMARY,
            size: 30,
        },
        deleteBtn:{
            type:'material',
            name:'delete',
            color:theme[type].PRIMARY,
            size: 30,
        },
        searchBtn:{
            type:'material',
            name:'search',
            color:theme[type].PRIMARY,
            size: 30,
        },
        editBtn:{
            type:'material',
            name:'edit',
            color:theme[type].PRIMARY,
            size: 30,
        },
        listBtn :{
            type:'material',
            name:'list',
            color:theme[type].PRIMARY,
            size: 30,
        },
        navigaterightBtn:{
            type:'material',
            name:'navigate-next',
            color:theme[type].PRIMARY,
            size: 30,
        },
        listaddBtn:{
            type:'material',
            name:'playlist-add',
            color:theme[type].PRIMARY,
            size: 30,
        },
        itemaddBtn:{
            type:'material',
            name:'library-add',
            color:theme[type].PRIMARY,
            size: 30,
        },
        forwardBtn:{
            type:'material',
            name:'navigate-next',
            color:theme[type].PRIMARY,
            size: 30,
        },
        backwardBtn:{
            type:'material',
            name:'navigate-before',
            color:theme[type].PRIMARY,
            size: 30,
        }
        
    },

    LinkBtn:{
        type: 'outline',
        titleStyle:{
            fontSize:14,
            fontWeight:'100',
            color:theme[type].PRIMARY,
        }    
    },
    RegularBtn:{
        type:'solid',
        buttonStyle:{
            backgroundColor:theme[type].PRIMARY,
            margin:5,
        },
        titleStyle:{
            fontWeight:'100',
            color:theme[type].PRIMARY_BACKGROUND,
        }
    },
    RoundBtn:{
        type:'solid',
        buttonStyle:{
            borderRadius:15,
            borderWidth:0,
            paddingLeft:10,
            paddingRight:10,
            paddingTop:2,
            paddingBottom:2,
            opacity:.9,
            backgroundColor:theme[type].PRIMARY,
        },
        titleStyle:{
            color:theme[type].PRIMARY_BACKGROUND,
        }
    },

    showStyle:{
        type:'clear'
    },

    infoBox:{
        padding:10
    },
    infoText:{

    },
    warningBox:{
        padding:10,
        borderColor:'orange',
        borderWidth:2,
        borderRadius:10
    },
    warningText:{
        color:'orange'
    },

    InlineEdit:{
        container:{
            flex:1,
            flexDirection:'row',
            marginTop:3,
            marginBottom:0,
            padding:5,
            backgroundColor:theme[type].PRIMARY_BACKGROUND,
        },labelContent:{
            flex:1,
            margin: 4,
        },labelStyle:{
            fontSize:12,
            color:theme[type].GREY,
            textAlignVertical:'top',
        },textContent:{
            flex:4,
            justifyContent:'flex-start',
        },textStyle:{
            fontSize:16,
            color:theme[type].DARKGREY,
            textAlignVertical:'center'
        },textBtn:{
            flex:1,
            borderWidth:0,
            margin:0,
            padding:0
        },textBtnIcon:{
            name:'spellcheck',
            type:'material',
            color:theme[type].GREY,
            size:16
        },editInput:{
            flex:5,
            borderBottomColor:theme[type].GREY,
            borderBottomWidth:1,
            fontSize:16,
            height:30,
            padding:2,
            margin:0,
        },
        defaultLength: 64,
        maxLength256:256,
        maxLength1k:1024,
        maxLength2K:2048,
        btnContainer:{
            flex:1,
            flexDirection:'row',
            margin:0,
            padding:0
        },editBtn:{
            flex:1,
            borderWidth:0,
            margin:0,
            padding:0
        },cancelBtnIcon:{
            flex:0,
            name:'clear',
            type:'material',
            color:theme[type].GREY,
            raised: true,
            size:12,
        },confirmBtnIcon:{
            flex:0,
            name:'done',
            type:'material',
            color:theme[type].PRIMARY,
            raised: true,
            size:12,
        },selectContainer:{
            flex:5,
        },switchContainer:{
            flex:0,
        },sliderContainer:{
            flex:5,
        },integerContainer:{
            flex:3,
        },selectContent:{
            fontSize:16,
        },
    },

    modalHeaderCancelIcon:{
        name:'clear',
        type:'material',
        color:'white',
    },

    DatesSetter:{
        container:{
            flex:1,
            flexDirection:'row',
            margin:5,
            padding:5,
            backgroundColor:theme[type].PRIMARY_BACKGROUND,
        },startContainer:{
            flex:1,
            flexDirection:'row',
            justifyContent:'space-between',
            marginLeft:5,
            marginRight:10
        },endContainer:{
            flex:1,
            flexDirection:'row',
            justifyContent:'space-between',
            marginLeft:10,
            marginRight:5
        },labelStyle:{
        }
    },
    HoursSetter:{
        container:{
            flex:1,
            flexDirection:'row',
            margin:5,
            padding:5,
            backgroundColor:theme[type].PRIMARY_BACKGROUND,
        },startContainer:{
            flex:1,
            flexDirection:'row',
            justifyContent:'space-between',
            marginLeft:5,
            marginRight:10
        },endContainer:{
            flex:1,
            flexDirection:'row',
            justifyContent:'space-between',
            marginLeft:10,
            marginRight:5
        },labelStyle:{
        }
    },
    HoursDisplay:{
        container:{
            flex:1,
            flexDirection:'row',
            margin:1,
            padding:2
        },labelContainer:{
            flex:1,
        },hoursContainer:{
            flex:4,
            flexDirection:'row',
        },labelStyle:{
            fontSize:14,
            fontWeight:'bold'
        },textStyle:{
            fontSize:14,
        },hoursContent:{
            flex:1
        }
    },
    DatesDisplay:{
        container:{
            flex:1,
            flexDirection:'row',
            margin:1,
            padding:2
        },labelContainer:{
            flex:1,
        },datesContainer:{
            flex:4,
            flexDirection:'row',
        },labelStyle:{
            fontSize:14,
            fontWeight:'bold'
        },textStyle:{
            fontSize:14,
        },datesContent:{
            flex:1
        }
    },

    formContainer:{
        flex:1,
        flexDirection:'column',
        margin:5,
        padding:5
    },
    pdfContainer:{
        flex:1,
        justifyContent:'flex-start',
        alignItems:'center',
        marginTop:25
    },
    pdf:{
        flex:1,
        width: Dimensions.get('window').width,
        height:Dimensions.get('window').height
    },

    chartStyle:{
        container: {
            flex: 9,
            backgroundColor: '#F5FCFF',
        },
        chart: {
            flex: 1
         }
    },
    chartLegend:{
        enabled: true,
        textSize: 16,
        form: 'SQUARE',
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        formToTextSpace: 5,
        wordWrapEnabled: true,
        maxSizePercent: 0.5
    },
    chartYAxis:{
        left:{
            textSize: 14,
        },
        right:{
            textSize:14,
        }
    },

    List:{
        titleContainer:{
            padding:10,
            marginLeft:10,
            marginRight:10,
            backgroundColor:theme[type].SECONDARY,
        },
        titleText:{
            fontSize:18,
            color:theme[type].SECONDARY_BACKGROUND,
            fontWeight: '100',
            textAlign:'center'
        },
        container:{
            flex:1,
            flexDirection:'column',
            margin:10,
            borderBottomColor:theme[type].GREY,
            borderBottomWidth:1
        },
        listsContainer:{
            flex:1,
            flexDirection:'row',
            marginLeft:10,
            marginRight:10,
            borderBottomColor:'grey',
            borderBottomWidth:1
        },
        listsTitleContainer:{
            padding:2,
            backgroundColor:theme[type].SECONDARY,
        },
        listsTitleText:{
            fontSize:16,
            fontWeight:'100',
            color:theme[type].SECONDARY_BACKGROUND,
            fontWeight: 'bold',
        },
        listsLeft:{
            flex:5,
        },
        listsRight:{
            flex:0,
            justifyContent:'center'
        },
        listsListContainer:{
            flex:1,
            flexDirection:'column',
        },
    },

    
    clientFamilyContainerStyle:{
        flex: 1,
        flexDirection: 'row',
        borderWidth: 10,
        borderColor: 'white',
        backgroundColor:"white"
    },
     
    clientFamilyContentStyle:{
        flex: 4,
        justifyContent:'flex-start'
    },
    clientFamilyControlStyle:{
        flex: 1,
        justifyContent:'flex-end'
    },
    clientFamilyTextStyle:{
        color: 'grey',
        fontWeight: '100',
        fontSize: 14,
        textTransform:'uppercase'
    },

    clientFamilyMemberTextStyle:{
        color: 'grey',
        fontWeight: '100',
        fontSize: 14,
        textTransform:'uppercase'
    },

    DatePickerBar:{
        container:{
            flex: 0,
            flexDirection: 'row',
            padding:10,
            height: 50,
        },
        dateContainer:{
            flex:1,
            marginTop:5,
            paddingRight:10,
            flexDirection: 'row',
        },
        btnContainer:{
            flex:2,
            flexDirection: 'row',
        },
    },
    BtnGroup:{
        container:{
            flex:1,
            flexDirection:'row',
            justifyContent:'space-between'
        },
      
    },
    SearchBar:{
        inputStyle:{
            fontSize:16,
            margin:0,
            padding:0,
        },
       
    },
    SearchBarBtn:{
        container:{
            margin:5,
            flex:1,
            flexDirection:'row',
            height:40
        },searchContainer:{
            flex:3,
        },btnContainer:{
           flex:0,
           flexDirection:'row',
           marginTop:20,
        }
    },
 
    
   
    Appointment:{
        timeBox:{
            flex:1,
            flexDirection: 'column',
            justifyContent:'space-between',
            borderColor:'green',
            borderRightWidth:1,
            width: 30
        },
        timeText:{
            fontSize: 14
        },
        timeSpacer:{
            marginLeft:20,
            width: 2,
            height:10,
            backgroundColor:'darkgrey'
        },
        highLightStyle:{
            fontSize:16,
            fontWeight:'bold'
         },
         serviceStyle:{
             fontSize:14,
             fontWeight:'100'
         },
         clientStyle:{   
             fontSize: 16,
             fontWeight:'100' 
         },
         noteStyle:{   
             fontSize: 12,
             fontWeight:'100' 
         },

    }
});  
   
};