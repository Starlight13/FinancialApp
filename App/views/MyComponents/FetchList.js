import 'react-native-gesture-handler';
import React, {Component, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList
} from 'react-native';
import styles from '../Screen/styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MainLink from '../Screen/MainLink';


const SCREEN_WIDTH = Math.round(Dimensions.get('screen').width);

export default class FetchList extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: [],
      isFetching: false,
    }
  }
  
    componentDidMount(){
      this.fetchData();
    };

    onRefresh() {
      if(this.props.route == 'Home'){
        this.props.handler();
      }
      this.setState({isFetching: true,},() => {this.fetchData();});
 }


    fetchRoute = () => {
      if(this.props.route == 'Home')
        return MainLink()+'Home'
      else if(this.props.route == 'Roomie')
        return MainLink()+'Roomie'
    }
  
    fetchData = async () => {
      const response = await fetch(this.fetchRoute(), {
        method: 'GET',
        headers: {
          user: this.props.user,
          roomie: this.props.roomie,
        }
      });
      this.setState({data: await response.json()});
      this.setState({ isFetching: false })
    };
  
    renderItem = ({item}) => {
      return(
      <View style={{flexDirection: 'row', width: SCREEN_WIDTH, height: 70}}>
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.TextMoney}>${item.price}</Text>
        </View>
        <View style={{width: 30, justifyContent: 'center', alignItems: 'center'}}>
          {item.roomie === true? <FontAwesome5 name="user-friends" size={18} color="grey"/>:<Text></Text>}
        </View>
        <View style={{flex:1, justifyContent: 'center'}}>
          <Text style={{fontSize: 16}}>{item.name}</Text>
          <Text style={{color:"grey", fontSize: 12, fontStyle: 'italic'}}>{item.info}</Text>
          <Text style={{color:"grey", fontSize: 12, fontStyle: 'italic'}}>{item.date}</Text>
        </View>
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.Text}>{item.category}</Text>
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
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
          />
        </View>
      )
    }
  }
