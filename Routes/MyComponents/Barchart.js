import React from 'react'
import { View } from 'react-native'
import { BarChart } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'

class BarChartVerticalWithLabels extends React.PureComponent {
    
    render() {

        const CUT_OFF = 20
        const Labels = ({ x, y, bandwidth, data }) => (
            data.map((value, index) => (
                <>
                <Text
                    key={ index }
                    x={ x(index) + (bandwidth / 2) }
                    y={ value < CUT_OFF ? y(value) - 10 : y(value) + 15 }
                    fontSize={ 14 }
                    fill={ value >= CUT_OFF ? 'white' : 'black' }
                    alignmentBaseline={ 'middle' }
                    textAnchor={ 'middle' }
                >
                    {value}
                </Text>
                </>
            ))
        )

        return (
            <View style={{ flexDirection: 'row', height: 250, paddingVertical: 16 }}>
                <BarChart
                    style={this.props.place === "roomie" ? {flex: 0.5} : {flex: 1}}
                    data={this.props.data}
                    svg={{ fill: '#7dbeff' }}
                    contentInset={{ top: 10, bottom: 0 }}
                    spacing={0.2}
                    gridMin={0}
                >
                    <Labels/>
                </BarChart>
            </View>
        )
    }

}

export default BarChartVerticalWithLabels