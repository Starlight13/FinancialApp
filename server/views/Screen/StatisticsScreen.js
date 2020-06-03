import React, {Component} from 'react';
import { Text, View, ScrollView, RefreshControl } from 'react-native';
import BarChartVerticalWithLabels from '../MyComponents/Barchart'
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ExtrasExsmple from '../MyComponents/LineChart'
import MainLink from './MainLink'

export default class StatisticsScreen extends Component {
    constructor(props){
        super(props);
        this.onRefresh = this.onRefresh.bind(this)
        this.state = {
            barData: [],
            lineData: [],
            isFetching: false,
            user: this.props.route.params.userId
        }
    }

    componentDidMount(){
        this.fetchData();
    }

    onRefresh() {
        this.setState({isFetching: true});
        this.fetchData();
   }

    fetchData(){
        this.setState({barData: []})
        this.setState({lineData: []})
        this.fetchBarData();
        this.fetchLineData();
        this.setState({ isFetching: false })
    }


    fetchBarData = async () => {
        const response = await fetch(MainLink()+'barData', {
            method: 'GET',
            headers: {
              user: this.state.user,
            }
          });
        json = await response.json()
        for(var i in json){
            console.log(json[i].sum)
            this.setState({barData: this.state.barData.concat(json[i].sum)});
            console.log(this.state.barData)
        }
     };

     fetchLineData = async () => {
        this.setState({lineData: []})
        const response = await fetch(MainLink()+'lineData', {
            method: 'GET',
            headers: {
              user: this.state.user,
            }
          });
        json = await response.json()
        for(var i in json){
            // console.log(json[i].sum)
            this.setState({lineData: this.state.lineData.concat(json[i].sum)});
            // console.log(this.state.lineData)
        }
     };


    render() {
        return (
            <SafeAreaView>
                <View style={{ height: 50, flexDirection: "row", justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                    <Text style={[styles.Text, { fontSize: 26, fontWeight: "200", margin: 10 }]}>My Statistics</Text>
                    <FontAwesome5 name="chart-bar" size={24} color="pink" style={{ top: 3 }} />
                </View>
        <ScrollView refreshControl={<RefreshControl refreshing={this.state.isFetching} onRefresh={this.onRefresh}/> }>
                <View style={{ justifyContent: "center" }}>
                    <Text style={[styles.Text, {alignSelf: 'center', fontSize: 26}]}>Category distribution</Text>
                    <BarChartVerticalWithLabels data={this.state.barData} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Text style={[styles.Text, styles.BarText]}>Clothes</Text>
                        <Text style={[styles.Text, styles.BarText]}>Food</Text>
                        <Text style={[styles.Text, styles.BarText]}>Fun</Text>
                        <Text style={[styles.Text, styles.BarText]}>Home</Text>
                        <Text style={[styles.Text, styles.BarText]}>Other</Text>
                        <Text style={[styles.Text, styles.BarText]}>Transport</Text>
                    </View>
                    <View>
                    <Text style={[styles.Text, {alignSelf: 'center', marginTop: 10, fontSize: 26}]}>Month comparison</Text>
                        <ExtrasExsmple data={this.state.lineData} />
                    </View>
                </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}
