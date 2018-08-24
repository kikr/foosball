import React from 'react';
import {
  View,
  FlatList,
} from 'react-native';
import PlayerCollection from '../../api/PlayerCollection';
import PlayerStatsListItem from './PlayerStatsListItem';
import PlayerStatsListHeader, { HEADERS } from './PlayerStatsListHeader';

// See PlayerStats
// Notice that player name is not a property of PlayerStats
const PLAYER_STATS_PROPERTIES = {
  WINS: 'wins',
  LOSSES: 'losses',
  GOALS_SCORED: 'goalsScored',
  GOALS_CONCEDED: 'goalsConceded',
};

class PlayerStatsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { players: [], sortBy: '', isAscendingSort: true };

    this.onSortByWins = this.onSortByWins.bind(this);
    this.onSortByLosses = this.onSortByLosses.bind(this);
    this.onSortByGoalsScored = this.onSortByGoalsScored.bind(this);
    this.onSortByGoalsConceded = this.onSortByGoalsConceded.bind(this);
    this.onSortByPlayerName = this.onSortByPlayerName.bind(this);
  }

  componentDidMount() {
    this.getAllPlayersOnEveryFocus();
  }

  onSortByWins() {
    this.sortByNumericPlayerStat(PLAYER_STATS_PROPERTIES.WINS);
  }

  onSortByLosses() {
    this.sortByNumericPlayerStat(PLAYER_STATS_PROPERTIES.LOSSES);
  }

  onSortByGoalsScored() {
    this.sortByNumericPlayerStat(PLAYER_STATS_PROPERTIES.GOALS_SCORED);
  }

  onSortByGoalsConceded() {
    this.sortByNumericPlayerStat(PLAYER_STATS_PROPERTIES.GOALS_CONCEDED);
  }

  onSortByPlayerName() {
    const { players } = this.state;
    const { isAscendingSort } = this.state;

    if (isAscendingSort) {
      players.sort(
        (player1, player2) => player1.firstName.toLowerCase().charCodeAt(0)
        - player2.firstName.toLowerCase().charCodeAt(0),
      );
    } else {
      players.sort(
        (player1, player2) => player2.firstName.toLowerCase().charCodeAt(0)
        - player1.firstName.toLowerCase().charCodeAt(0),
      );
    }
    this.setState({ players, sortBy: HEADERS.PLAYER_NAME, isAscendingSort: !isAscendingSort });
  }

  getAllPlayers() {
    this.setState({ players: [] });

    new PlayerCollection().getPlayers().then((players) => {
      this.setState({ players });
      this.onSortByWins();
      this.onSortByWins();
    });
  }

  getAllPlayersOnEveryFocus() {
    const { navigation } = this.props;

    navigation.addListener(
      'willFocus',
      () => {
        this.getAllPlayers();
      },
    );
  }

  /* eslint-disable class-methods-use-this */
  convertStatPropertyToHeader(property) {
    let header;
    switch (property) {
      case PLAYER_STATS_PROPERTIES.WINS:
        header = HEADERS.WINS;
        break;
      case PLAYER_STATS_PROPERTIES.LOSSES:
        header = HEADERS.LOSSES;
        break;
      case PLAYER_STATS_PROPERTIES.GOALS_SCORED:
        header = HEADERS.GOALS_SCORED;
        break;
      case PLAYER_STATS_PROPERTIES.GOALS_CONCEDED:
        header = HEADERS.GOALS_CONCEDED;
        break;
      default:
        throw Error('Could not map a Player Stat property to a list header');
    }

    return header;
  }
  /* eslint-enable class-methods-use-this */

  sortByNumericPlayerStat(statProperty) {
    const { players } = this.state;
    const { isAscendingSort } = this.state;

    if (isAscendingSort) {
      players.sort(
        (player1, player2) => player1.stats[statProperty] - player2.stats[statProperty],
      );
    } else {
      players.sort(
        (player1, player2) => player2.stats[statProperty] - player1.stats[statProperty],
      );
    }
    // Notice toggling of the sort direction.
    this.setState({
      players,
      sortBy: this.convertStatPropertyToHeader(statProperty),
      isAscendingSort: !isAscendingSort,
    });
  }

  render() {
    const { players, sortBy, isAscendingSort } = this.state;

    const header = (
      <PlayerStatsListHeader
        sortBy={sortBy}
        isAscendingSort={isAscendingSort}
        onSortByWins={this.onSortByWins}
        onSortByLosses={this.onSortByLosses}
        onSortByGoalsScored={this.onSortByGoalsScored}
        onSortByGoalsConceded={this.onSortByGoalsConceded}
        onSortByPlayerName={this.onSortByPlayerName}
      />
    );

    return (
      <View style={{ flex: 1 }}>

        <FlatList
          ListHeaderComponent={header}
          keyExtractor={item => item.getId()}
          data={players}
          renderItem={PlayerStatsListItem}
          // Make the header stick: https://stackoverflow.com/a/48806118
          stickyHeaderIndices={[0]}
        />

      </View>
    );
  }
}

export default PlayerStatsList;
