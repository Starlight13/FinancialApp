import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList
} from 'react-native';
import styles from '../Screen/styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const SCREEN_WIDTH = Math.round(Dimensions.get('screen').width);

export default class FetchList extends Component{
    state = {
      data: []
    };
  
    componentDidMount(){
      this.fetchData();
    };
  
    fetchData = async () => {
      const response = await fetch('http://192.168.0.15:8080');
      const json = await response.json();
      this.setState({data: json.results});
    };
  
    renderItem = ({item}) => {
      return(
      <View style={{flexDirection: 'row', width: SCREEN_WIDTH, height: 70}}>
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.TextMoney}>${item.name.cost}</Text>
        </View>
        <View style={{width: 30, justifyContent: 'center', alignItems: 'center'}}>
          {item.name.roomie === true? <FontAwesome5 name="user-friends" size={18} color="grey"/>:<Text></Text>}
        </View>
        <View style={{flex:1, justifyContent: 'center'}}>
          <Text style={{fontSize: 16}}>{item.name.name}</Text>
          <Text style={{color:"grey", fontSize: 12, fontStyle: 'italic'}}>{item.name.info}</Text>
          <Text style={{color:"grey", fontSize: 12, fontStyle: 'italic'}}>{item.name.date}</Text>
        </View>
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.Text}>{item.name.category}</Text>
        </View>
      </View>
      )
    }

  
    renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "86%",
              backgroundColor: "#f7cee5",
              marginHorizontal: "7%"
            }}
          />
        );
      };
  
    render(){
      return(
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <FlatList
            data={this.state.data}
            keyExtractor={(x, i) => i}
            renderItem= {this.renderItem}
            ItemSeparatorComponent = {this.renderSeparator}
            style={{backgroundColor: '#f5f3f1'}}
          />
        </View>
      )
    }
  }
