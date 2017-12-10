/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ToolbarAndroid,
  ListView
} from 'react-native';
import styles from './styles.js'
import ListItem from './components/ListItem.js'

export default class App extends Component<{}> {
  constructor(props) {
    super(props)

    const dataSource = new ListView.DataSource({
       rowHasChanged: (row1, row2) => row1 !== row2
    })
     this.state = {
       dataSource: dataSource.cloneWithRows([
         {name: 'chlebek'},
         {name: 'pieczywko'},
         {name: 'bułeczki'},
         {name: 'chlebek'},
         {name: 'pieczywko'},
         {name: 'bułeczki'},
         {name: 'chlebek'},
         {name: 'pieczywko'},
         {name: 'bułeczki'},
         {name: 'chlebek'},
         {name: 'pieczywko'},
         {name: 'bułeczki'},
         {name: 'chlebek'},
         {name: 'pieczywko'},
         {name: 'bułeczki'},
       ])
     }
  }
  render() {
    return (

      <View style={styles.container}>
      <ToolbarAndroid
        style={styles.navbar}
        title="🍞 chlep"/>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          style={styles.listView}/>
      </View>
    );
  }

  _renderItem(task) {
    //a method for building each list ListItem
    return (
      <ListItem task={task} />
    )
  }
}
