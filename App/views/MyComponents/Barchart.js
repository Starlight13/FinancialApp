import React from 'react'
import { View } from 'react-native'
import { BarChart } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'

class BarChartVerticalWithLabels extends React.PureComponent {

    
    render() {


        const Labels = ({ x, y, bandwidth, data }) => (
            data.map((value, index) => (
                <Text
                    key={ index }
                    x={ x(index) + (bandwidth / 2) }
                    y={  y(value) + 15 }
                    fontSize={ 14 }
                    fill={ 'white'}
                    alignmentBaseline={ 'middle' }
                    textAnchor={ 'middle' }
                >
                    {value}
                </Text>
            ))
        )

        return (
            <View style={{ flexDirection: 'row', height: 225, marginTop: 10 }}>
                <BarChart
                    style={{ flex: 1 }}
                    data={this.props.data}
                    svg={{ fill: '#6edcf0' }}
                    contentInset={{ top: 10, bottom: 10 }}
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