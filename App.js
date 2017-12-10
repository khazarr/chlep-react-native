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
  TextInput,
  ListView
} from 'react-native';
import styles from './styles.js'
import ListItem from './components/ListItem.js'
import * as firebase from 'firebase'
import FloatingActionButton from 'react-native-action-button';

const config = {
  apiKey: "AIzaSyCvjJI5OWyca_gxMzBH8ZwzSnXKk-1IaC4",
  authDomain: "chlep-9bfa0.firebaseapp.com",
  databaseURL: "https://chlep-9bfa0.firebaseio.com",
  projectId: "chlep-9bfa0",
  storageBucket: "chlep-9bfa0.appspot.com",
  messagingSenderId: "240594075541"
}

const firebaseApp = firebase.initializeApp(config)

export default class App extends Component<{}> {
  constructor(props) {
    super(props)
    this.tasksRef = firebaseApp.database().ref()
    const dataSource = new ListView.DataSource({
       rowHasChanged: (row1, row2) => row1 !== row2
    })
     this.state = {
       // dataSource: dataSource.cloneWithRows([
       //   {name: 'chlebek'},
       //   {name: 'pieczywko'},
       //   {name: 'bułeczki'},
       //   {name: 'chlebek'},
       //   {name: 'pieczywko'},
       //   {name: 'bułeczki'},
       //   {name: 'chlebek'},
       //   {name: 'pieczywko'},
       //   {name: 'bułeczki'},
       //   {name: 'chlebek'},
       //   {name: 'pieczywko'},
       //   {name: 'bułeczki'},
       //   {name: 'chlebek'},
       //   {name: 'pieczywko'},
       //   {name: 'bułeczki'},
       // ])
       dataSource: dataSource,
       newTask: ""
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
          <TextInput
             value={this.state.newTask}
             style={styles.textEdit}
             onChangeText={(text) => this.setState({newTask: text})}
             placeholder="Coś jeszcze?"
           />
          <FloatingActionButton
            hideShadow={true} // this is to avoid a bug in the FAB library.
            buttonColor="rgba(231,76,60,1)"
            onPress={this._addTask.bind(this)}
            />
      </View>
    );
  }

  componentDidMount() {
    // start listening for firebase updates
    this.listenForTasks(this.tasksRef);
  }

  _renderItem(task) {
    //a method for building each list ListItem
    const onCompletion = () => {
      this.tasksRef.child(task._key).remove()
    }
    return (
      <ListItem task={task} onCompletion={onCompletion} />
    )
  }

  _addTask() {
    if (this.state.newTask === "")
    return

    this.tasksRef.push({ name: this.state.newTask});
    this.setState({newTask: ""});
  }

  listenForTasks(tasksRef) {
    tasksRef.on('value', (dataSnapshot) => {
      var tasks = [];
      dataSnapshot.forEach((child) => {
        tasks.push({
          name: child.val().name,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(tasks)
      });
    });
  }
}
