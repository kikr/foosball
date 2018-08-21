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
import { MatchBuilder } from '../../dto/Match';
import PlayerCollection from '../../api/PlayerCollection';
import styles from './styles';

class MatchCreateForm extends React.Component {
  constructor(props) {
    super(props);
    const startDate = new Date();
    this.state = {
      isCreating: false,
      startDate,
      endDate: new Date(),
      awayScore: 0,
      homeScore: 0,
      home: [],
      away: [],
      playerSelection: [],
    };

    this.matchBuilder = new MatchBuilder();
    this.matchBuilder.setStart(startDate); // Allows user to use default value of the date picker

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

    this.enableLoading();

    new MatchCollection()
      .createMatch(this.matchBuilder.build())
      .then(() => {
        console.log('Match created...');
        const { navigation } = this.props;

        navigation.goBack();
      });
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

  onDeselectAwayPlayer(playerId) {
    let { away } = this.state;
    const { playerSelection } = this.state;

    away = away.filter((selectedPlayer) => {
      if (selectedPlayer.getId() !== playerId) {
        return true;
      }
      playerSelection.push(selectedPlayer);
      return false;
    });

    this.matchBuilder.setAway(away);
    this.setState({ away, playerSelection });
  }

  onDeselectHomePlayer(playerId) {
    let { home } = this.state;
    const { playerSelection } = this.state;

    home = home.filter((selectedPlayer) => {
      if (selectedPlayer.getId() !== playerId) {
        return true;
      }
      playerSelection.push(selectedPlayer);
      return false;
    });

    this.matchBuilder.setHome(home);
    this.setState({ home, playerSelection });
  }

  onSelectHomePlayer(selectedPlayerId) {
    let { home, playerSelection } = this.state;

    home = home.concat(
      playerSelection.filter(player => player.getId() === selectedPlayerId),
    );
    playerSelection = playerSelection.filter(player => player.getId() !== selectedPlayerId);

    this.matchBuilder.setHome(home);
    this.setState({ home, playerSelection });
  }

  onSelectAwayPlayer(selectedPlayerId) {
    let { away, playerSelection } = this.state;

    away = away.concat(
      playerSelection.filter(player => player.getId() === selectedPlayerId),
    );
    playerSelection = playerSelection.filter(player => player.getId() !== selectedPlayerId);

    this.matchBuilder.setAway(away);
    this.setState({ away, playerSelection });
  }

  enableLoading() {
    this.setState({ isCreating: true });
  }

  render() {
    const {
      isCreating, startDate, endDate, awayScore, homeScore, home, away, playerSelection,
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
