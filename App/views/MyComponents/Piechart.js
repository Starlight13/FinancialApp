import React from 'react';
import {
  Text,
  View,
  Dimensions
} from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import styles from '../Screen/styles'

 class PieChartWithDynamicSlices extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      selectedSlice: {
        label: '',
        value: 0
      },
      labelWidth: 0
    }
  }
  render() {
    const { labelWidth, selectedSlice } = this.state;
    const { label, value } = selectedSlice;
    const keys = this.props.keys;
    const colors1 = ['#F1BACF', '#F196B8', '#D75E8B','#905A6E', '#741136' ]
    const colors2 = ['#BDEFA2' , '#95EF65', '#6BD035', '#4F7E36', '#236103' ]
    const data = keys.map((key, index) => {
        return {
          key,
          value: this.props.values[index],
          svg: this.props.user === "me"? {fill: colors1[index] } : {fill: colors2[index]},
          arc: { outerRadius: (250 + this.props.values[index]*0.5) + '%', padAngle: label === key ? 0.1 : 0 },
          onPress: () => this.setState({ selectedSlice: { label: key, value: this.props.values[index] } })
        }
      })
    const deviceWidth = Dimensions.get('window').width

    return (
      <View style={{ justifyContent: 'center', flex: 1 }}>
        <PieChart
          style={{ height: 150 }}
          outerRadius={'29%'}
          innerRadius={'40%'}
          data={data}
        />
        <Text
          onLayout={({ nativeEvent: { layout: { width } } }) => {
            this.setState({ labelWidth: width });
          }}
          style={[styles.Text,{
            textAlign: 'center',
            fontStyle: 'italic',
            fontSize:16
          }]}>
          {`${label} \n ${value}`}
        </Text>
      </View>
    )
  }
}

export default PieChartWithDynamicSlices;