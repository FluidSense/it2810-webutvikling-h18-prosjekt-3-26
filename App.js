import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Settings from './Containers/Settings.js';

export default class App extends React.Component {

  constructor(props){
    super(props);

    this.state = { startDate: new Date(), globalStepCount: 0 };
    this.updateGlobalSteps = this.updateGlobalSteps.bind(this);
  }

  updateGlobalSteps(val){
    this.setState({ globalStepCount: val });
  }

  render() {
    return (
      <View style={styles.container}>
        <Settings startDate={this.state.startDate} updateGlobalSteps={this.updateGlobalSteps}/>

        <Text>Global amount of steps are: {this.state.globalStepCount}</Text>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
