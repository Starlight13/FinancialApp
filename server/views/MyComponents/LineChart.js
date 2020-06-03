import React from 'react'
import { LineChart, Grid, XAxis, YAxis  } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { Circle, G, Line, Rect, Text } from 'react-native-svg'
import {Dimensions, View} from 'react-native'

const SCREEN_WIDTH = Math.round(Dimensions.get('screen').width);


class myChart extends React.PureComponent {

    render() {

        const axesSvg = { fontSize: 10, fill: 'grey' };
        const verticalContentInset = { top: 10, bottom: 10 }
        const xAxisHeight = 30

        // Layout of an x-axis together with a y-axis is a problem that stems from flexbox.
        // All react-native-svg-charts components support full flexbox and therefore all
        // layout problems should be approached with the mindset "how would I layout regular Views with flex in this way".
        // In order for us to align the axes correctly we must know the height of the x-axis or the width of the x-axis
        // and then displace the other axis with just as many pixels. Simple but manual.

        return (
            <View style={{ height: 250, padding: 20, flexDirection: 'row' }}>
                <YAxis
                    data={this.props.data}
                    style={{ marginBottom: xAxisHeight }}
                    contentInset={verticalContentInset}
                    svg={axesSvg}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <LineChart
                        style={{ flex: 1 }}
                        data={this.props.data}
                        contentInset={verticalContentInset}
                        svg={{ stroke: 'pink', strokeWidth: 3 }}
                    >
                        <Grid/>
                    </LineChart>
                    <XAxis
                        style={{ marginHorizontal: -10, height: xAxisHeight }}
                        data={this.props.data}
                        formatLabel={(value, index) => this.props.data[index]}
                        contentInset={{ left: 20, right: 20 }}
                        svg={axesSvg}
                    />
                </View>
            </View>
        )

        

        // return (
        //     <LineChart
        //         style={{ height: 200, width: SCREEN_WIDTH - 40, alignSelf: 'center' }}
        //         data={ this.props.data }
        //         svg={{
        //             stroke: 'pink',
        //             strokeWidth: 3,
        //         }}
        //         contentInset={{ top: 20, bottom: 20 }}
        //         curve={ shape.curveLinear }
        //     >
        //         <Grid svg={{opacity:0.3}}/>
        //     </LineChart>
        // )
    }

}

export default myChart