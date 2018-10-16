import React from 'react';
import { Navigator } from './src/components/Navigator/CreateNavigator';
import { AsyncStorage } from 'react-native';

export default class App extends React.Component {

  constructor(props){
    super(props);

    // States for global pedometer
    this.state = { startDate: null, pedActivated: false, globalStepCount: 0, prevGlobalStepCount: 0 };

    // Functions for updating states from global pedometer
    this.updateActivated = this.updateActivated.bind(this);
    this.updateGlobalSteps = this.updateGlobalSteps.bind(this);
    this.updatePrevGlobalSteps = this.updatePrevGlobalSteps.bind(this);
  }

  // Sets a startDate state for this session.
  componentDidMount(){
    this.retrieveStartDate();
  }

  // Save start date locally, so pedometer can check the global number of steps from that date.
  saveStartDate = async (startDate) => {
    try {
      await AsyncStorage.setItem('startDate', startDate);
    } catch (error) {
      console.log(error.message);
    }
  }

  // Load start date.
  retrieveStartDate = async () => {
    let startDate = new Date();
    try {
      startDate = await AsyncStorage.getItem('startDate');

      if(!startDate){
        let newStartDate = new Date();
        this.saveStartDate(newStartDate);
        this.setState({ startDate: newStartDate }, () => console.log('Updated start date state to: ',this.state.startDate));
      }
      else{
        this.setState({ startDate: new Date(startDate) }, () => console.log('Updated start date state to: ',this.state.startDate));

      }
    } catch (error) {
      console.log(error.message);
    }
  }

  // Updates availability
  updateActivated(val){
    this.setState({ pedActivated: val });
  }

  // Updates global steps
  updateGlobalSteps(val){
    this.setState({ globalStepCount: this.state.prevGlobalStepCount + val });
  }

  // Updates previous global steps
  updatePrevGlobalSteps(val){
    this.setState({ globalStepCount: val });
    this.setState({ prevGlobalStepCount: val });
  }

  render() {

    // For sending pedometer props to navigator
    var homeProps = {};
    homeProps.startDate = this.state.startDate;
    homeProps.pedActivated = this.state.pedActivated;
    homeProps.globalStepCount = this.state.globalStepCount;
    
    var settingsProps = {};
    settingsProps.startDate = this.state.startDate;
    settingsProps.pedActivated = this.state.pedActivated;
    settingsProps.updateActivated = this.updateActivated;
    settingsProps.updateGlobalSteps = this.updateGlobalSteps;
    settingsProps.updatePrevGlobalSteps = this.updatePrevGlobalSteps;

    const Nav = Navigator({...homeProps}, {...settingsProps})

    return (

      <Nav />

    );
  }
}
