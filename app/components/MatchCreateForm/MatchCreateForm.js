import React from 'react';
import {
  Button,
  View,
  ScrollView,
  ActivityIndicator,
  Text,
  Picker,
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
    this.state = {
      isCreating: false, startDate, endDate: new Date(), awayScore: 0, homeScore: 0 
    };

    this.matchBuilder = new MatchBuilder();
    this.matchBuilder.setStart(startDate); // Allows user to use default value of the date picker

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

  onChangeAwayScore(awayScore) {
    this.setState({ awayScore });
    this.matchBuilder.setAwayScore(awayScore);
  }

  onChangeHomeScore(homeScore) {
    this.setState({ homeScore });
    this.matchBuilder.setHomeScore(homeScore);
  }


  enableLoading() {
    this.setState({ isCreating: true });
  }

  render() {
    const {
      isCreating, startDate, endDate, awayScore, homeScore,
    } = this.state;
    const validScores = Array.from(Array(11).keys());

    if (isCreating) {
      return (
        <View style={{ flex: 1 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <ScrollView
        style={styles.matchCreateFormRoot}
        contentContainerStyle={{ flex: 1 }}
      >

        {/* Scores */}
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>

          <View style={{ flex: 1 }}>
            <Text> Home </Text>
            <Picker
              style={{ height: 50, width: 50 }}
              selectedValue={homeScore}
              onValueChange={score => this.onChangeHomeScore(score)}
            >
              {
                validScores.map(i => (
                  <Picker.Item
                    key={i.toString()}
                    label={i.toString()}
                    value={i}
                  />
                ))
              }
            </Picker>
          </View>

          <View style={{ flex: 1 }}>
            <Text> Away </Text>
            <Picker
              style={{ height: 50, width: 50 }}
              selectedValue={awayScore}
              onValueChange={score => this.onChangeAwayScore(score)}
            >
              {
                validScores.map(i => (
                  <Picker.Item
                    key={i.toString()}
                    label={i.toString()}
                    value={i}
                  />
                ))
              }
            </Picker>
          </View>
        </View>

        {/* Players  */}
        <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'space-between' }}>
          <MatchPlayerPicker title="Home" placeHolder="Pick a player" onChangeSelectedPlayers={this.onChangeSelectedHomePlayers} />
          <MatchPlayerPicker title="Away" placeHolder="Pick a player" onChangeSelectedPlayers={this.onChangeSelectedAwayPlayers} />
        </View>


        {/* Match time  */}
        <View style={{ flex: 1 }}>

          <Text> Match time </Text>

          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
            <DatePicker
              date={startDate}
              mode="datetime"
              placeholder="Start of the match"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={(date) => { this.onChangeMatchStartDate(date); }}
              showIcon={false}
            />

            <Text> to </Text>

            <DatePicker
              date={endDate}
              minDate={startDate}
              mode="datetime"
              placeholder="Match duration"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={(date) => { this.onChangeMatchEndDate(date); }}
              showIcon={false}
            />
          </View>

        </View>


        <Button
          title="Create"
          onPress={this.onCreateMatch}
        />
      </ScrollView>
    );
  }
}

export default MatchCreateForm;
