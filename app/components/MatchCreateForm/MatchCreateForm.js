import React from 'react';
import {
  Button,
  View,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import MatchCollection from '../../api/MatchCollection';
import MatchPlayerPicker from '../MatchPlayerPicker';
import { MatchBuilder } from '../../dto/Match';
import styles from './styles';

class MatchCreateForm extends React.Component {
  constructor(props) {
    super(props);
    const startDate = new Date();
    this.state = { isCreating: false, startDate, endDate: new Date() };

    this.matchBuilder = new MatchBuilder();
    this.matchBuilder.setStart(startDate); // Allows user to use default value of the date picker
    this.formState = {};
    this.formInputRefs = { };

    this.onCreateMatch = this.onCreateMatch.bind(this);
    this.onChangeSelectedHomePlayers = this.onChangeSelectedHomePlayers.bind(this);
    this.onChangeSelectedAwayPlayers = this.onChangeSelectedAwayPlayers.bind(this);
    this.onChangeMatchStartDate = this.onChangeMatchStartDate.bind(this);
    this.onChangeMatchEndDate = this.onChangeMatchEndDate.bind(this);
  }

  onCreateMatch() {
    console.log('Creating a match...');

    this.enableLoading();

    new MatchCollection()
      .createMatch(this.matchBuilder.build())
      .then(() => {
        console.log('Match created...');
        const { navigation } = this.props;

        navigation.goBack();
      });
  }

  onChangeSelectedHomePlayers(selectedHomePlayers) {
    this.matchBuilder.setHome(selectedHomePlayers);
  }

  onChangeSelectedAwayPlayers(selectedAwayPlayers) {
    this.matchBuilder.setAway(selectedAwayPlayers);
  }

  onChangeMatchStartDate(startDate) {
    this.matchBuilder.setStart(startDate);
    this.setState({ startDate });
  }

  onChangeMatchEndDate(endDate) {
    const { startDate } = this.state;
    const seconds = parseInt(Math.abs(new Date(startDate) - new Date(endDate)) / 1000, 10);

    this.matchBuilder.setDuration(seconds);
    this.setState({ endDate });
  }

  enableLoading() {
    this.setState({ isCreating: true });
  }

  render() {
    const { isCreating, startDate, endDate } = this.state;

    if (isCreating) {
      return (
        <View style={{ flex: 1 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <ScrollView style={styles.matchCreateFormRoot}>
        <TextInput
          placeholder="Enter away score"
          onChangeText={awayScore => this.matchBuilder.setAwayScore(awayScore)}
        />

        <TextInput
          placeholder="Enter home score"
          onChangeText={homeScore => this.matchBuilder.setHomeScore(homeScore)}
        />

        <MatchPlayerPicker placeHolder="Pick home player" onChangeSelectedPlayers={this.onChangeSelectedHomePlayers} />
        <MatchPlayerPicker placeHolder="Pick away player" onChangeSelectedPlayers={this.onChangeSelectedAwayPlayers} />

        <DatePicker
          date={startDate}
          mode="datetime"
          placeholder="Start of the match"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(date) => { this.onChangeMatchStartDate(date); }}
        />

        <DatePicker
          date={endDate}
          minDate={startDate}
          mode="datetime"
          placeholder="Match duration"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(date) => { this.onChangeMatchEndDate(date); }}
        />

        <Button
          title="Create"
          onPress={this.onCreateMatch}
        />
      </ScrollView>
    );
  }
}

export default MatchCreateForm;
