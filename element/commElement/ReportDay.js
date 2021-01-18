import React, {Component}  from 'react';
import { ButtonGroup,  ThemeConsumer,Button } from 'react-native-elements';

import { getDayReport,
    getMonthReport,
    setReportDate
} from '../../action/commAction/ReportAction';
import { connect } from 'react-redux';
import { View, Text, processColor  } from 'react-native';
import i18n from '../../i18n/i18n';
import { BarChart  } from 'react-native-charts-wrapper';
import { InlineDateTimePicker } from '../basic/inlineElement';
import {
    BtnGroup,
    RoundBtn
} from '../basic';
import { FloatingAction } from 'react-native-floating-action';


class ReportDay extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: new Date(),
            shownumber:true,
            showamount:false,
            xAxis: {},
        };

        this.buildCountData = this.buildCountData.bind();
        this.buildAmountData = this.buildAmountData.bind();
        this.buildXAxis = this.buildXAxis.bind();
        this.onDateChange = this.onDateChange.bind();
 //       this.props.setReportDate(this.state.date)
    }


    handleSelect(event) {
        let entry = event.nativeEvent
        if (entry == null) {
          this.setState({...this.state, selectedEntry: null})
        } else {
          this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
        }
    }

    buildCountData = () =>{
        let names = this.props.report.dayreport.names;
        let vals = [];
        let total = 0;
        names.forEach( name =>{
            vals.push( this.props.report.dayreport[name].count);
            total += this.props.report.dayreport[name].count;
         });

        let title = this.props.report.dayreport.date.toISOString() + '  ' +i18n.t('label.number') + ': ' + total;

        let ctdata = {
            dataSets:[{
                values: vals,
                label: title,
                config:{
                    color: processColor('teal'),
                    barShadowColor: processColor('lightgrey'),
                    highlightAlpha: 90,
                    highlightColor: processColor('red'),
                    valueTextSize: 16,
                }
            }],
            config: {
                barWidth: 0.7,
            }
        };

        this.setState({cdata: ctdata});
    }

    buildXAxis = ()=> {
        let names = this.props.report.dayreport.names;
        let axis = {
            valueFormatter: names,
            granularityEnabled: true,
            granularity: 1,
            textSize: 14,
            labelRotationAngle:30,
        };
        this.setState({xAxis: axis});
    }

    buildAmountData = () =>{
        let names = this.props.report.dayreport.names;
        let vals = [];
        let total = 0;
        names.forEach( name =>{
            vals.push( this.props.report.dayreport[name].amount);
            total += this.props.report.dayreport[name].amount;
         });

        let title = this.props.report.dayreport.date.toISOString() + '  ' +i18n.t('label.amount') + ': ' + total;

        let ctdata = {
            dataSets:[
            {
                values: vals,
                label: title,
                config:{
                    color: processColor('teal'),
                    barShadowColor: processColor('lightgrey'),
                    highlightAlpha: 90,
                    highlightColor: processColor('red'),
                    valueTextSize: 16,
                }
            },
            {
                values: vals,
                label: title,
                config:{
                    color: processColor('green'),
                    barShadowColor: processColor('lightgrey'),
                    highlightAlpha: 90,
                    highlightColor: processColor('red'),
                    valueTextSize: 16,
                }
            }
            ],
            config: {
                barWidth: 0.7,
               
            }
        };

        this.setState({adata: ctdata});
    }

    onDateChange = (date) => {
        this.setState( date );
        this.props.setReportDate(date);
        this.props.getDayReport(date);
    }

   
    floatingAction = (name) =>{
        this.props.navigation.navigate("ReportMonth",{ym: name});
    }

    numberPress = () =>{
        this.setState({shownumber:true, showamount:false})
        this.buildCountData();
        this.buildXAxis();
    }
    amountPress = () => {
        this.setState({shownumber:false, showamount:true})
        this.buildCountData();
        this.buildXAxis();
    }

    componentDidMount = async () =>{ 
        this.props.setReportDate(this.state.date);
        await this.props.getDayReport(this.state.date);
        this.buildCountData();
        this.buildAmountData();
        this.buildXAxis();
    }

  
    render (){
        let rpt1;
        let rpt2;
        let rpt3;
        let mydate = new Date();
        let yr = mydate.getFullYear();
        let mth = mydate.getMonth();
        rpt1 = yr +'-'+ (mth+1);
        if( mth == 0) {
            rpt2 = (yr-1) +'-'+ '12';
            rpt3 = (yr-1) +'-'+ '11';
        } else if( mth == 1){
            rpt2 = yr +'-'+ '01';
            rpt3 = (yr-1) +'-'+ '12';
        } else {
            rpt2 = yr +'-'+ (mth);
            rpt3 = yr +'-'+ (mth-1);
        }

        const actions = [
            {
                text:rpt1,
                name:rpt1,
                icon:require('../../assets/icon.png'),
                position:1
            },
            {
                text: rpt2,
                name: rpt2,
                icon:require('../../assets/icon.png'),
                position:2
            },
            {
                text: rpt3,
                name: rpt3,
                icon:require('../../assets/icon.png'),
                position:3
            },
        ];

        const btn1 = () => <Button title={i18n.t('button.number')} />;
        const btn2 = () => <Button title={i18n.t('button.amount')} />
    
        const buttons = [ i18n.t('button.number'), i18n.t('button.amount') ];
        const {selectedIndex} = this.state;

     return (
         <>
          <ThemeConsumer>
            {({theme}) => (   
             <View style={theme.DatePickerBar.container}>
             <View  style={theme.DatePickerBar.dateContainer} >
             <InlineDateTimePicker datetime={this.state.date}
             type ='date'
             save = {this.onDateChange}
             />
             </View>
             <View style ={theme.DatePickerBar.btnContainer}> 
             <BtnGroup>
             <RoundBtn title={i18n.t('button.number')}
             onPress = {this.numberPress}
             />
             <RoundBtn title={i18n.t('button.amount')}
              onPress = {this.amountPress}
              />                
             </BtnGroup>
             </View>          
            </View>     
            )}
            </ThemeConsumer>

     
            { this.state.shownumber &&
              <ThemeConsumer>
              {({theme}) => (
                    <View style={theme.chartStyle.container} >
                    <BarChart
                        style={theme.chartStyle.chart}
                        data={this.state.cdata}
                        xAxis={this.state.xAxis}
                        yAxis={theme.chartYAxis}
                        animation={{durationX: 1000}}
                        legend={theme.chartLegend }
                        gridBackgroundColor={processColor('#ffffff')}
                        visibleRange={{x: { min: 5, max: 5 }}}
                        drawBarShadow={false}
                        drawValueAboveBar={true}
                        drawHighlightArrow={true}
                        onSelect = {this.handleSelect.bind(this)}
                    />        
                    </View>
                )}
                </ThemeConsumer>     
            }
            { this.state.showamount &&
                <ThemeConsumer>
                {({theme}) => (
                      <View style={theme.chartStyle.container} >
                        <BarChart
                        style={theme.chartStyle.chart}
                        data={this.state.adata}
                        xAxis={this.state.xAxis}
                        yAxis={theme.chartYAxis}
                        animation={{durationX: 1000}}
                        legend={theme.chartLegend}
                        gridBackgroundColor={processColor('#ffffff')}
                        visibleRange={{x: { min: 5, max: 5 }}}
                        drawBarShadow={false}
                        drawValueAboveBar={true}
                        drawHighlightArrow={true}
                        />        
                        </View>
                )}
                </ThemeConsumer>     
            }
         <ThemeConsumer>
            {({theme}) => (
            <FloatingAction
            ref = {(ref)=>{this.FloatingAction = ref;}}
            actions = { actions }
            onPressItem = { this.floatingAction }
            position ='left'
            animated
            />
        )}
        </ThemeConsumer>  
        </>
     );
    }
}


const mapStateToProps = state =>{
    return { report: state.report };
};

export default connect(mapStateToProps,
    {
        getDayReport,
        getMonthReport,
        setReportDate
    }
    )(ReportDay); 
/*
    group:{
        fromX: 0,
        groupSpace:0.1,
        barSpace:0.1,
    }
    */