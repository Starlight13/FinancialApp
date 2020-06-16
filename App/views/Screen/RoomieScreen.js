import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    RefreshControl,
    TextInput,
    ActivityIndicator
} from 'react-native';
import styles from './styles';
import BarChartVerticalWithLabels from '../MyComponents/Barchart.js';
import PieChartWithDynamicSlices from '../MyComponents/Piechart.js';
import FetchList from '../MyComponents/FetchList'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MainLink from './MainLink.js'

const SCREEN_WIDTH = Math.round(Dimensions.get('screen').width);


export default class RoomieScreen extends Component {
    constructor(props) {
        super(props);
        this.onRefresh = this.onRefresh.bind(this)
        this.state = {
            roomie: false,
            roomiePie: [],
            roomiePieLabels: [],
            myPie: [],
            myPieLabels: [],
            roomiePay: 0,
            myPay: 0,
            isFetching: true,
            user: this.props.route.params.userId,
            roomieId: null,
            roomieInfo: [{}]
        }
    }

    onRefresh() {
        this.setState({ isFetching: true });
        this.fetchIfRoomie()
    }

    componentDidMount() {
        this.fetchIfRoomie();
    }

    fetchIfRoomie = async () => {
        const response = await fetch(MainLink() + 'ifRoomie', {
            method: 'GET',
            headers: {
                user: this.state.user,
            }
        });
        const json = await response.json()
        if (json[0].roomieid != null) {
            this.setState({ roomie: true });
            this.setState({ roomieId: json[0].roomieid })
            console.log("Roomie is " + this.state.roomieId)
            this.fetchInfo();
            this.fetchData();
        }
        this.setState({ isFetching: false });
    };

    fetchInfo = async () => {
        const response = await fetch(MainLink() + 'getUserInfo', {
            method: 'GET',
            headers: {
                user: this.state.roomieId,
            }
        });
        this.setState({ roomieInfo: await response.json() });
    };

    fetchData() {
        this.setState({ roomiePie: [] })
        this.setState({ myPie: [] })
        this.fetchMyPay();
        this.fetchRoomiePay();
        this.fetchRoomiePie();
        this.fetchMyPie();
        this.setState({ isFetching: false })
    }





    fetchMyPay = async () => {
        const response = await fetch(MainLink() + 'getCommonPay', {
            method: 'GET',
            headers: {
                user: this.state.user,
            }
        });
        const json = await response.json()
        this.setState({ myPay: json[0].sum });
    };

    fetchRoomiePay = async () => {
        const response = await fetch(MainLink() + 'getCommonPay', {
            method: 'GET',
            headers: {
                user: this.state.roomieId,
            }
        });
        const json = await response.json()
        this.setState({ roomiePay: json[0].sum });
    };

    fetchRoomiePie = async () => {
        const response = await fetch(MainLink() + 'getPie', {
            method: 'GET',
            headers: {
                user: this.state.roomieId,
            }
        });
        const json = await response.json()
        for (var i in json) {
            this.setState({
                roomiePie: this.state.roomiePie.concat(json[i].sum),
                roomiePieLabels: this.state.roomiePieLabels.concat(json[i].category)
            });
        }
    };

    fetchMyPie = async () => {
        console.log(this.state.user);
        const response = await fetch(MainLink() + 'getPie', {
            method: 'GET',
            headers: {
                user: this.state.user,
            }
        });
        const json = await response.json()
        for (var i in json) {
            this.setState({
                myPie: this.state.myPie.concat(json[i].sum),
                myPieLabels: this.state.myPieLabels.concat(json[i].category)
            });
        }
    };

    addRoomie = async () => {
        this.setState({ isFetching: true })
        let data = {
            user: this.state.user,
            roomie: this.state.roomieId
        }

        fetch(MainLink() + "checkRoomie", {
            method: 'GET',
            headers: {
              user: this.state.roomieId,
            }
          })
            .then((resp) => resp.json())
            .then(async (json) => {
              if (json[0].userid === -1) {
                alert('Such user does not exist or already has a roomie')
                this.fetchIfRoomie();
              }
              else {
                const response = await fetch(MainLink() + 'addRoomie', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                const json = await response.json();
                alert(`Roomie @${json[0].username} successfuly added!`);
                this.fetchIfRoomie();
              }
            })
            .catch((err) => {
              console.log(err);
            });

        
    }

    reloadAfterDeletion = async () => {
        this.setState({ roomie: false })
    }
    render() {
        if (this.state.isFetching === true)
            return (
                <View style={styles.CenteredView}>
                    <ActivityIndicator />
                </View>)
        if (this.state.roomie === false && this.state.isFetching === false)
            return (
                <SafeAreaView style={styles.SafeAreaView}>
                    <View style={[styles.CenteredView, { marginHorizontal: 5 }]}>
                        <Text style={{ fontSize: 16, fontWeight: "100", textAlign: 'center' }}>This is a Roomie Tab!{"\n"}
                            Here will be displayed your shared expanses. {"\n"}
                            If you have a roommate that is already {"\n"}
                            registered – add him to your roomies!</Text>
                        <View style={{ flexDirection: 'row', margin: 10, backgroundColor: 'pink', borderRadius: 20, height: 40, alignItems: 'center', width: 200, justifyContent: 'center' }}>
                            <TextInput style={styles.TextInput}
                                textAlign="center"
                                placeholder="Roomies ID"
                                keyboardType="numeric"
                                onChangeText={text => this.setState({ roomieId: text })}
                                value={this.state.roomieId}></TextInput>
                        </View>
                        <TouchableOpacity onPress={() => this.addRoomie()}>
                            <View style={{ flexDirection: 'row', margin: 10, backgroundColor: 'pink', borderRadius: 20, height: 40, alignItems: 'center', width: 200, justifyContent: 'center' }}>
                                <FontAwesome5 name="user-plus" size={24} color="white" />
                                <Text style={[styles.Text, { fontStyle: 'italic', marginLeft: 5 }]}>Add roomie</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </SafeAreaView>
            )
        if (this.state.roomie === true && this.state.isFetching === false)
            return (
                <SafeAreaView style={styles.SafeAreaView}>
                    <View style={{ height: 70, flexDirection: "row", justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'white' }}>
                        <Text style={[styles.Text, { fontSize: 26, fontWeight: "200" }]}>My roomie: {"\n"}     @{this.state.roomieInfo[0].username}</Text>
                        <TouchableOpacity style={{ backgroundColor: 'white', width: 30, height: 30 }} onPress={() => {
                            console.log(this.state.roomieInfo)
                            this.props.navigation.navigate('Edit Roomie', { roomie: this.state.roomieInfo, handler: this.fetchIfRoomie })
                        }}>
                            <FontAwesome5 name="user-edit" size={24} color="pink" />
                        </TouchableOpacity>
                    </View>
                    <ScrollView refreshControl={<RefreshControl refreshing={this.state.isFetching} onRefresh={this.onRefresh} />}>
                        <View style={[styles.CenteredView, { height: 250 }]}>
                            <BarChartVerticalWithLabels place="roomie" data={[this.state.myPay, this.state.roomiePay]} />
                        </View>
                        <View style={[styles.CenteredView, { flexDirection: 'row', marginBottom: 10 }]}>
                            <View
                                style={{
                                    shadowOffset: { width: 2, height: 2, },
                                    shadowColor: '#000',
                                    shadowOpacity: 0.1,
                                    shadowRadius: 2,
                                    height: 60,
                                    width: 60,
                                    borderRadius: 40,
                                    backgroundColor: 'white',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                <FontAwesome5 name="qq" size={40} color='#ffb0b3' />
                            </View>
                            <View
                                style={{
                                    shadowOffset: { width: 2, height: 2, },
                                    shadowColor: '#000',
                                    shadowOpacity: 0.1,
                                    shadowRadius: 2,
                                    marginLeft: 20,
                                    height: 60,
                                    width: 60,
                                    borderRadius: 40,
                                    backgroundColor: 'white',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                <FontAwesome5 name="user-astronaut" size={40} color='#ffb0b3' />
                            </View>
                        </View>
                        <Text style={[styles.Text, { textAlign: 'center', color: 'grey' }]}>Tap on pie slices to see more</Text>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                            <PieChartWithDynamicSlices user="me" values={this.state.myPie} keys={this.state.myPieLabels} />
                            <PieChartWithDynamicSlices user="roomie" values={this.state.roomiePie} keys={this.state.roomiePieLabels} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Text style={[styles.Text, { color: 'grey' }]}>Me</Text>
                            <Text style={[styles.Text, { color: 'grey' }]}>@{this.state.roomieInfo[0].username}</Text>
                        </View>
                        <View style={{ width: SCREEN_WIDTH, backgroundColor: 'white', alignItems: 'center', height: 60, justifyContent: "center", marginTop: 10 }}>
                            <Text style={styles.Text}>Spendings history</Text>
                            <View style={{ flexDirection: 'row', flex: 1, backgroundColor: '#ffe3e8', width: SCREEN_WIDTH }}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={styles.Text}>Cost</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={styles.Text}>Info</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={styles.Text}>Category</Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            {this.state.isFetching == true
                                ?
                                <View></View>
                                :
                                <FetchList route='Roomie' roomie={this.state.roomieId} user={this.state.user} />}
                        </View>
                    </ScrollView>
                </SafeAreaView>
            )
    }
}