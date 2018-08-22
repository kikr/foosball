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

    this.state = { isLoading: true, players: [], ascend: true };

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
    const { players } = this.state;
    const { ascend } = this.state;

    if (ascend) {
      players.sort(
        (player1, player2) => player1.stats.wins - player2.stats.wins,
      );
    } else {
      players.sort(
        (player1, player2) => player2.stats.wins - player1.stats.wins,
      );
    }
    // Notice toggling of the sort direction.
    this.setState({ players, ascend: !ascend });
  }

  onSortByLosses() {
    const { players } = this.state;
    const { ascend } = this.state;

    if (ascend) {
      players.sort(
        (player1, player2) => player1.stats.losses - player2.stats.losses,
      );
    } else {
      players.sort(
        (player1, player2) => player2.stats.losses - player1.stats.losses,
      );
    }
    // Notice toggling of the sort direction.
    this.setState({ players, ascend: !ascend });
  }

  onSortByGoalsScored() {
    const { players } = this.state;
    const { ascend } = this.state;

    if (ascend) {
      players.sort(
        (player1, player2) => player1.stats.goalsScored - player2.stats.goalsScored,
      );
    } else {
      players.sort(
        (player1, player2) => player2.stats.goalsScored - player1.stats.goalsScored,
      );
    }
    // Notice toggling of the sort direction.
    this.setState({ players, ascend: !ascend });
  }

  onSortByGoalsConceded() {
    const { players } = this.state;
    const { ascend } = this.state;

    if (ascend) {
      players.sort(
        (player1, player2) => player1.stats.goalsConceded - player2.stats.goalsConceded,
      );
    } else {
      players.sort(
        (player1, player2) => player2.stats.goalsConceded - player1.stats.goalsConceded,
      );
    }
    // Notice toggling of the sort direction.
    this.setState({ players, ascend: !ascend });
  }

  onSortByPlayerName() {
    const { players } = this.state;

    players.sort();

    // Notice toggling of the sort direction.
    this.setState({ players });
  }

  getAllPlayers() {
    this.setState({ isLoading: true });

    new PlayerCollection().getPlayers().then((players) => {
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

  render() {
    const { players, isLoading } = this.state;
    const content = isLoading
      ? <ActivityIndicator style={{ flex: 1 }} />
      : (
        <FlatList
          ListHeaderComponent={() => new PlayerStatsListHeader({
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
      <View>

        { content }

      </View>
    );
  }
}

export default PlayerStatsList;
