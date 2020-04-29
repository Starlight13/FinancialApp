import React from 'react'
import { LineChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { Circle, G, Line, Rect, Text } from 'react-native-svg'
import {Dimensions} from 'react-native'

const SCREEN_WIDTH = Math.round(Dimensions.get('screen').width);


class ExtrasExample extends React.PureComponent {

    render() {

        

        /**
         * Both below functions should preferably be their own React Components
         */

        const HorizontalLine = (({ y }) => (
            <Line
                key={ 'zero-axis' }
                x1={ '0%' }
                x2={ '100%' }
                y1={ y(79) }
                y2={ y(79) }
                stroke={ 'grey' }
                strokeOpacity= {0.5}
                strokeDasharray={ [ 4, 8 ] }
                strokeWidth={ 2 }
            />
        ))

        

        return (
            <LineChart
                style={{ height: 200, width: SCREEN_WIDTH - 40, alignSelf: 'center' }}
                data={ this.props.data }
                svg={{
                    stroke: 'pink',
                    strokeWidth: 3,
                }}
                contentInset={{ top: 20, bottom: 20 }}
                curve={ shape.curveLinear }
            >
                <Grid svg={{opacity:0.3}}/>
                <HorizontalLine/>
            </LineChart>
        )
    }

}

export default ExtrasExample