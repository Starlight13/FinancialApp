import 'react-native-gesture-handler';
import React, {Component } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import styles from './styles';
import BarChartVerticalWithLabels from '../MyComponents/Barchart.js.js';
import PieChartWithDynamicSlices from '../MyComponents/Piechart.js.js';
import FetchList from '../MyComponents/FetchList'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const SCREEN_WIDTH = Math.round(Dimensions.get('screen').width);


export default class RoomieScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomie: true
        }
    }

    render() {
        if (this.state.roomie === false)
            return (
                <SafeAreaView style={styles.SafeAreaView}>
                    <View style={styles.CenteredView}>
                        <Text style={{ fontSize: 18, fontWeight: "100", textAlign: 'center' }}>This is a Roomie Tab!{"\n"}
                            Here will be displayed your shared expanses. {"\n"}
                            If you have a roommate that is already {"\n"}
                            registered – add him to your roomies!</Text>
                        <TouchableOpacity onPress={() => this.setState({ roomie: true })}>
                            <View style={{ flexDirection: 'row', margin: 10, backgroundColor: 'pink', borderRadius: 20, height: 40, alignItems: 'center', width: 200, justifyContent: 'center' }}>
                                <FontAwesome5 name="user-plus" size={24} color="white" />
                                <Text style={[styles.Text, { fontStyle: 'italic', marginLeft: 5 }]}>Add roomie</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            )
        return (
            <SafeAreaView style={styles.SafeAreaView}>
                <View style={{ height: 70, flexDirection: "row", justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'white' }}>
                    <Text style={[styles.Text, { fontSize: 26, fontWeight: "200" }]}>My roomie: {"\n"}     @testUser2</Text>
                    <FontAwesome5 name="user-edit" size={24} color="pink" />
                </View>
                <ScrollView>
                    <View style={[styles.CenteredView,{ height:250}]}>
                        <BarChartVerticalWithLabels place="roomie" data={[25, 15]} />
                    </View>
                    <View style={[styles.CenteredView, { flexDirection: 'row', marginBottom: 10 , left:-45}]}>
                        <FontAwesome5 name="crown" size={50} color="#ffd57b" style={{marginRight:30}}/>
                        <View
                            style={{
                                shadowOffset: { width: 2, height: 2, },
                                shadowColor: '#000',
                                shadowOpacity: 0.3,
                                shadowRadius: 2,
                                marginRight: 10,
                                flexDirection: 'row'
                            }}>
                            <Image style={{ height: 60, width: 60, borderRadius: 40 }} source={{ uri: "https://html5css.ru/howto/img_avatar2.png" }} />
                        </View>
                        <View
                            style={{
                                shadowOffset: { width: 2, height: 2, },
                                shadowColor: '#000',
                                shadowOpacity: 0.3,
                                shadowRadius: 2,
                                marginLeft: 20
                            }}>
                            <Image style={{ height: 60, width: 60, borderRadius: 40 }} source={{ uri: "https://html5css.ru/bootstrap4/img_avatar5.png" }} />
                        </View>
                    </View>
                    <Text style={[styles.Text, { textAlign: 'center', color: 'grey' }]}>Tap on pie slices to see more</Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                        <PieChartWithDynamicSlices user="me" values = {[15, 25, 35, 45, 55]} />
                        <PieChartWithDynamicSlices user="roomie" values = {[23, 18, 37, 60, 22]}/>
                    </View>
                    <View style={{flexDirection:'row', justifyContent: 'space-around'}}>
                        <Text style={[styles.Text,{color:'grey'}]}>@testUser1</Text>
                        <Text style={[styles.Text,{color:'grey'}]}>@testUser2</Text>
                    </View>
                    <View style={{width: SCREEN_WIDTH, backgroundColor: 'white', alignItems: 'center', height: 60, justifyContent: "center", marginTop:10}}>
               <Text style={styles.Text}>Spendings history</Text>
               <View style={{flexDirection: 'row', flex:1, backgroundColor: '#ffe3e8', width: SCREEN_WIDTH}}>
                   <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                       <Text style={styles.Text}>Cost</Text>
                   </View>
                   <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                       <Text style={styles.Text}>Purchase name</Text>
                   </View>
                   <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                       <Text style={styles.Text}>Category</Text>
                   </View>
               </View>
           </View>
                    <View>
                        <FetchList/>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}