import React from 'react';
import {
  Text,
  View,
  Dimensions
} from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import styles from '../styles'

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
    const keys = ['Fun', 'Other', 'Transport', 'Home', 'Food'];
    // const values = [15, 25, 35, 45, 55];
    const colors1 = ['#741136', '#905A6E', '#D75E8B', '#F196B8', '#F1BACF']
    const colors2 = ['#236103', '#4F7E36', '#6BD035', '#95EF65', '#BDEFA2']
    const data = keys.map((key, index) => {
        return {
          key,
          value: this.props.values[index],
          svg: this.props.user === "me"? {fill: colors1[index] } : {fill: colors2[index]},
          arc: { outerRadius: (70 + this.props.values[index]) + '%', padAngle: label === key ? 0.1 : 0 },
          onPress: () => this.setState({ selectedSlice: { label: key, value: this.props.values[index] } })
        }
      })
    const deviceWidth = Dimensions.get('window').width

    return (
      <View style={{ justifyContent: 'center', flex: 1 }}>
        <PieChart
          style={{ height: 150 }}
          outerRadius={'80%'}
          innerRadius={'45%'}
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