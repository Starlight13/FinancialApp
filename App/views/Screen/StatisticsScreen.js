import React, { Component } from 'react';
import { Text, View, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import BarChartVerticalWithLabels from '../MyComponents/Barchart'
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ExtrasExsmple from '../MyComponents/LineChart'
import MainLink from './MainLink'

export default class StatisticsScreen extends Component {
    constructor(props) {
        super(props);
        this.onRefresh = this.onRefresh.bind(this)
        this.state = {
            barData: [],
            barDataLabels: [],
            lineData: [],
            isFetching: true,
            user: this.props.route.params.userId
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    onRefresh() {
        this.setState({ isFetching: true });
        this.fetchData();
    }

    fetchData() {
        this.setState({ barData: [] })
        this.setState({ lineData: [] })
        this.setState({barDataLabels: []})
        this.fetchBarData();
        this.fetchLineData();
        this.setState({ isFetching: false })
    }


    fetchBarData = async () => {
        const response = await fetch(MainLink() + 'barData', {
            method: 'GET',
            headers: {
                user: this.state.user,
            }
        });
        json = await response.json()
        for (var i in json) {
            this.setState({ barData: this.state.barData.concat(json[i].sum) });
            this.setState({ barDataLabels: this.state.barDataLabels.concat(<Text>{json[i].category}</Text>)});
        }
    };

    fetchLineData = async () => {
        const response = await fetch(MainLink() + 'lineData', {
            method: 'GET',
            headers: {
                user: this.state.user,
            }
        });
        json = await response.json()
        for (var i in json) {
            this.setState({ lineData: this.state.lineData.concat(json[i].sum) });
        }
    };

  


    render() {
        return (
            this.state.isFetching === true ?
                <View style={styles.CenteredView}>
                    <ActivityIndicator />
                </View>
                :
                <SafeAreaView>
                    <View style={{ height: 50, flexDirection: "row", justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                        <Text style={[styles.Text, { fontSize: 26, fontWeight: "200", margin: 10 }]}>My Statistics</Text>
                        <FontAwesome5 name="chart-bar" size={24} color="pink" style={{ top: 3 }} />
                    </View>
                    <ScrollView refreshControl={<RefreshControl refreshing={this.state.isFetching} onRefresh={this.onRefresh} />}>
                        <View style={{ justifyContent: "center" }}>
                            <Text style={[styles.Text, { alignSelf: 'center', fontSize: 26 }]}>Category distribution</Text>
                            <BarChartVerticalWithLabels barType = 'myBar' data={this.state.barData} />
                            <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-around', height: 40}}>   
                               {this.state.barDataLabels.map( label => <Text>{label}</Text>)}
                            </View>
                            <View>
                                <Text style={[styles.Text, { alignSelf: 'center', marginTop: 10, fontSize: 26 }]}>Month comparison</Text>
                                <ExtrasExsmple data={this.state.lineData} />
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
        )
    }
}
