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
    this.state = {
      isCreating: false,
      endDate: new Date(),
      playerSelection: [],
      start,
      duration: 0,
      awayScore: 0,
      homeScore: 0,
      home: [],
      away: [],
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
    const {
      start,
      duration,
      awayScore,
      homeScore,
      home,
      away,
    } = this.state;

    const match = new Match({
      start,
      duration,
      awayScore,
      homeScore,
      home,
      away,
    });

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

  onChangeMatchStartDate(start) {
    this.setState({ start });
  }

  onChangeMatchEndDate(endDate) {
    const { start } = this.state;
    const seconds = parseInt(Math.abs(new Date(start) - new Date(endDate)) / 1000, 10);
    this.setState({ endDate, duration: seconds });
  }

  onChangeAwayScore(awayScore) {
    this.setState({ awayScore });
  }

  onChangeHomeScore(homeScore) {
    this.setState({ homeScore });
  }

  onDeselectAwayPlayer(playerId) {
    let { playerSelection } = this.state;
    let { away } = this.state;

    ({
      team: away,
      playerSelection,
    } = this.assignPlayerToSelection(playerId, away, playerSelection));

    this.setState({ away, playerSelection });
  }

  onDeselectHomePlayer(playerId) {
    let { playerSelection } = this.state;
    let { home } = this.state;

    ({
      team: home,
      playerSelection,
    } = this.assignPlayerToSelection(playerId, home, playerSelection));

    this.setState({ home, playerSelection });
  }

  onSelectHomePlayer(selectedPlayerId) {
    let { playerSelection } = this.state;
    let { home } = this.state;

    ({
      team: home,
      playerSelection,
    } = this.assignPlayerFromSelection(selectedPlayerId, home, playerSelection));

    this.setState({ home, playerSelection });
  }

  onSelectAwayPlayer(selectedPlayerId) {
    let { playerSelection } = this.state;
    let { away } = this.state;

    ({
      team: away,
      playerSelection,
    } = this.assignPlayerFromSelection(selectedPlayerId, away, playerSelection));

    this.setState({ away, playerSelection });
  }

  /* eslint-disable class-methods-use-this */
  assignPlayerToSelection(playerId, team, playerSelection) {
    return {
      team: team.filter((selectedPlayer) => {
        if (selectedPlayer.getId() !== playerId) {
          return true;
        }
        playerSelection.push(selectedPlayer);
        return false;
      }),
      playerSelection,
    };
  }

  assignPlayerFromSelection(playerId, team, playerSelection) {
    return {
      playerSelection: playerSelection.filter((selectedPlayer) => {
        if (selectedPlayer.getId() !== playerId) {
          return true;
        }
        team.push(selectedPlayer);
        return false;
      }),
      team,
    };
  }
  /* eslint-enable class-methods-use-this */

  enableLoading() {
    this.setState({ isCreating: true });
  }

  render() {
    const {
      isCreating,
      playerSelection,
      endDate,
      start,
      awayScore,
      homeScore,
      home,
      away,
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
