import React from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import PlayerCollection from '../../api/PlayerCollection';
import PlayerStatsListItem from './PlayerStatsListItem';
import PlayerStatsListHeader from './PlayerStatsListHeader';

class PlayerStatsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isLoading: true, players: [], ascendingSort: true };

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
    this.sortByNumericPlayerStat('wins');
  }

  onSortByLosses() {
    this.sortByNumericPlayerStat('losses');
  }

  onSortByGoalsScored() {
    this.sortByNumericPlayerStat('goalsScored');
  }

  onSortByGoalsConceded() {
    this.sortByNumericPlayerStat('goalsConceded');
  }

  onSortByPlayerName() {
    const { players } = this.state;
    const { ascendingSort } = this.state;

    if (ascendingSort) {
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
    // Notice toggling of the sort direction.
    this.setState({ players, ascendingSort: !ascendingSort });
  }

  getAllPlayers() {
    this.setState({ isLoading: true });

    new PlayerCollection().getPlayers().then((players) => {
      // Quick and dirty way to intially sort by wins.
      // Existing methods doesn't really work due to they toggling nature
      players.sort(
        (player1, player2) => player2.stats.wins - player1.stats.wins,
      );

      this.setState({ players, isLoading: false });
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

  sortByNumericPlayerStat(statProperty) {
    const { players } = this.state;
    const { ascendingSort } = this.state;

    if (ascendingSort) {
      players.sort(
        (player1, player2) => player1.stats[statProperty] - player2.stats[statProperty],
      );
    } else {
      players.sort(
        (player1, player2) => player2.stats[statProperty] - player1.stats[statProperty],
      );
    }
    // Notice toggling of the sort direction.
    this.setState({ players, ascendingSort: !ascendingSort });
  }

  render() {
    const { players, isLoading } = this.state;
    const content = isLoading
      ? <ActivityIndicator style={{ flex: 1 }} />
      : (
        <FlatList
          ListHeaderComponent={() => PlayerStatsListHeader({
            onSortByWins: this.onSortByWins,
            onSortByLosses: this.onSortByLosses,
            onSortByGoalsScored: this.onSortByGoalsScored,
            onSortByGoalsConceded: this.onSortByGoalsConceded,
            onSortByPlayerName: this.onSortByPlayerName,
          })}
          keyExtractor={item => item.getId()}
          data={players}
          renderItem={PlayerStatsListItem}
          // Make the header stick: https://stackoverflow.com/a/48806118
          stickyHeaderIndices={[0]}
        />
      );

    return (
      <View style={{ flex: 1 }}>

        { content }

      </View>
    );
  }
}

export default PlayerStatsList;
