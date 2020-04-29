import React from 'react';
import {Text, View} from 'react-native';
import BarChartVerticalWithLabels from '../MyComponents/Barchart'
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ExtrasExsmple from '../MyComponents/LineChart'

export default function StatisticsScreen() {
    return (
      <SafeAreaView>
            <View style={{ height: 50, flexDirection: "row", justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                <Text style={[styles.Text, { fontSize: 26, fontWeight: "200", margin: 10 }]}>My Statistics</Text>
                <FontAwesome5 name="chart-bar" size={24} color="pink" style={{top:3}} />
            </View>
            <View style={{justifyContent: "center"}}>
                <BarChartVerticalWithLabels data={[15, 26,5, 32, 14]}/>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <Text style={[styles.Text,styles.BarText]}>Food</Text>
                    <Text style={[styles.Text,styles.BarText]}>Clothes</Text>
                    <Text style={[styles.Text,styles.BarText]}>Transport</Text>
                    <Text style={[styles.Text,styles.BarText]}>Home</Text>
                    <Text style={[styles.Text,styles.BarText]}>Other</Text>
                </View>
                <View>
                    <ExtrasExsmple data={[ 50, 65, 40, 95, 75, 88, 60, 60, 65, 50]}/>
                </View>
            </View>
      </SafeAreaView>
    )
  }
