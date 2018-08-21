import React from 'react';
import {
  Button,
  View,
  ScrollView,
  ActivityIndicator,
  Text,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import MatchCollection from '../../api/MatchCollection';
import MatchPlayerPicker from '../MatchPlayerPicker';
import MatchScorePicker from '../MatchScorePicker';
import Match from '../../dto/Match';
import PlayerCollection from '../../api/PlayerCollection';
import styles from './styles';

class MatchCreateForm extends React.Component {
  constructor(props) {
    super(props);
    const start = new Date();
    const match = new Match({
      start,
      duration: 0,
      awayScore: 0,
      homeScore: 0,
      home: [],
      away: [],
    });
    this.state = {
      isCreating: false,
      endDate: new Date(),
      playerSelection: [],
      match,
    };

    this.onCreateMatch = this.onCreateMatch.bind(this);
    this.onDeselectAwayPlayer = this.onDeselectAwayPlayer.bind(this);
    this.onDeselectHomePlayer = this.onDeselectHomePlayer.bind(this);
    this.onSelectHomePlayer = this.onSelectHomePlayer.bind(this);
    this.onSelectAwayPlayer = this.onSelectAwayPlayer.bind(this);
    this.onChangeMatchStartDate = this.onChangeMatchStartDate.bind(this);
    this.onChangeMatchEndDate = this.onChangeMatchEndDate.bind(this);
    this.onChangeAwayScore = this.onChangeAwayScore.bind(this);
    this.onChangeHomeScore = this.onChangeHomeScore.bind(this);
  }

  componentDidMount() {
    new PlayerCollection().getPlayers().then((players) => {
      this.setState({ playerSelection: players });
    });
  }

  onCreateMatch() {
    console.log('Creating a match...');
    const { match } = this.state;

    match.validate();

    this.enableLoading();

    new MatchCollection()
      .createMatch(match)
      .then(() => {
        console.log('Match created...');
        const { navigation } = this.props;

        navigation.goBack();
      });
  }

  onChangeMatchStartDate(startDate) {
    const { match } = this.state;

    match.setStart(startDate);
    this.setState({ match });
  }

  onChangeMatchEndDate(endDate) {
    const { match } = this.state;
    this.calculateDuration(endDate);
    this.setState({ endDate, match });
  }

  onChangeAwayScore(awayScore) {
    const { match } = this.state;

    match.setAwayScore(awayScore);
    this.setState({ match });
  }

  onChangeHomeScore(homeScore) {
    const { match } = this.state;

    match.setHomeScore(homeScore);
    this.setState({ match });
  }

  onDeselectAwayPlayer(playerId) {
    const { playerSelection, match } = this.state;
    let { away } = match;

    away = away.filter((selectedPlayer) => {
      if (selectedPlayer.getId() !== playerId) {
        return true;
      }
      playerSelection.push(selectedPlayer);
      return false;
    });

    match.setAway(away);
    this.setState({ match, playerSelection });
  }

  onDeselectHomePlayer(playerId) {
    const { playerSelection, match } = this.state;
    let { home } = match;

    home = home.filter((selectedPlayer) => {
      if (selectedPlayer.getId() !== playerId) {
        return true;
      }
      playerSelection.push(selectedPlayer);
      return false;
    });

    match.setHome(home);
    this.setState({ match, playerSelection });
  }

  onSelectHomePlayer(selectedPlayerId) {
    const { match } = this.state;
    let { playerSelection } = this.state;
    let { home } = match;

    home = home.concat(
      playerSelection.filter(player => player.getId() === selectedPlayerId),
    );
    playerSelection = playerSelection.filter(player => player.getId() !== selectedPlayerId);

    match.setHome(home);
    this.setState({ match, playerSelection });
  }

  onSelectAwayPlayer(selectedPlayerId) {
    const { match } = this.state;
    let { playerSelection } = this.state;
    let { away } = match;

    away = away.concat(
      playerSelection.filter(player => player.getId() === selectedPlayerId),
    );
    playerSelection = playerSelection.filter(player => player.getId() !== selectedPlayerId);

    match.setAway(away);
    this.setState({ match, playerSelection });
  }

  calculateDuration(endDate) {
    const { match } = this.state;
    const { start } = match;
    const seconds = parseInt(Math.abs(new Date(start) - new Date(endDate)) / 1000, 10);

    match.setDuration(seconds);
  }

  enableLoading() {
    this.setState({ isCreating: true });
  }

  render() {
    const {
      isCreating,
      playerSelection,
      endDate,
      match: {
        start, awayScore, homeScore, home, away,
      },
    } = this.state;

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
        <View style={{
          padding: 5,
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        >
          <MatchScorePicker onChangeScore={this.onChangeHomeScore} title="Home" score={homeScore} />
          <MatchScorePicker onChangeScore={this.onChangeAwayScore} title="Away" score={awayScore} />
        </View>

        {/* Players  */}
        <View style={{
          padding: 5,
          flex: 3,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        >
          <MatchPlayerPicker placeHolder="Pick a player" onDeselectPlayer={this.onDeselectHomePlayer} onSelectPlayer={this.onSelectHomePlayer} playerSelection={playerSelection} selectedPlayers={home} />
          <MatchPlayerPicker placeHolder="Pick a player" onDeselectPlayer={this.onDeselectAwayPlayer} onSelectPlayer={this.onSelectAwayPlayer} playerSelection={playerSelection} selectedPlayers={away} />
        </View>


        {/* Match time  */}
        <View style={{
          padding: 5,
          flex: 1,
        }}
        >
          <Text> Match time </Text>

          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
            <DatePicker
              date={start}
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
              minDate={start}
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
