import React, {Component}  from 'react';
import { ThemeConsumer, Button, ButtonGroup } from 'react-native-elements';

import { getMonthReport, setReportMonth } from '../../action/commAction/ReportAction';
import { connect } from 'react-redux';
import { View, Text, processColor  } from 'react-native';
import i18n from '../../i18n/i18n';
import { BarChart  } from 'react-native-charts-wrapper';


class ReportMonth extends Component {
    constructor(props){
        super(props);
        this.state = {
            ym: this.props.route.params.ym, 
            xAxis: {},
        };

        this.buildCountData = this.buildCountData.bind();
        this.buildAmountData = this.buildAmountData.bind();
        this.buildXAxis = this.buildXAxis.bind();
        this.updateIndex = this.updateIndex.bind();
       
    }

    updateIndex =(selectedIndex) => {
        this.setState({selectedIndex})
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
        let names = ["1","2","3","4","5"];
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
                values: [[40, 30, 20], [10, 20, 10],[30, 20, 50], [30, 50, 10]],
                label: 'Stacked Bar dataset',
                config: {
                  colors: [processColor('#C0FF8C'), processColor('#FFF78C'), processColor('#FFD08C')],
                  stackLabels: ['Engineering', 'Sales', 'Marketing']
                }
         
            },
           
            ],
        };

        this.setState({adata: ctdata});
    }

    updateIndex =(selectedIndex) => {
        this.setState({selectedIndex})
    }
    
    numberPress = () =>{
        this.buildCountData();
        this.buildXAxis();
    }
    amountPress = () => {
        this.buildCountData();
        this.buildXAxis();
    }

    componentDidMount = async () =>{ 
        this.props.setReportMonth(this.state.ym);
        await this.props.getMonthReport(this.state.ym);
        this.buildCountData();
        this.buildAmountData();
        this.buildXAxis();
    }

  
    render (){
       
        const buttons = [ i18n.t('button.number'), i18n.t('button.amount') ];
        const {selectedIndex} = this.state;

     return (
         <>
          <ThemeConsumer>
            {({theme}) => (   
            <View style={theme.datePickerBarStyle}>
                <View  style={theme.datePickerBarDateStyle} >
                <Button type={theme.showStyle.type} disabled
                 title= {this.state.date}
                 disabledTitleStyle = {theme.datePickerBarDateTextStyle } />
                </View>
                <ButtonGroup 
                 onPress={this.updateIndex}
                 selectedIndex={selectedIndex}
                 buttons={buttons}
                 containerStyle={theme.datePickerBarBtnStyle}
                />
            </View>
            )}
            </ThemeConsumer>

     
            { selectedIndex == 0 &&
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
            { selectedIndex == 1 &&
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
        </>
     );
    }
}


const mapStateToProps = state =>{
    return { report: state.report };
};

export default connect(mapStateToProps,
    {
        getMonthReport,
        setReportMonth
    }
    )(ReportMonth); 

//    values: [{y:[40, 30, 20], marker: ["row1", "row2", "row3"]}, {y:[10, 20, 10], marker:"second"}, {y:[30, 20, 50], marker:["hello", "world","third"]}, {y:[30, 50, 10], marker:"fourth"}],
