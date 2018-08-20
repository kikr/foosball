import React from 'react';
import {
  View,
  FlatList,
  Button,
  ActivityIndicator,
} from 'react-native';
import PlayerCollection from '../../api/PlayerCollection';
import PlayerListItem from './PlayerListItem';
import styles from './styles';

class PlayerList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isLoading: true, players: [] };

    this.onAddPlayer = this.onAddPlayer.bind(this);
  }

  componentDidMount() {
    this.getAllPlayers();

    this.getAllPlayersOnEveryFocus();
  }

  onAddPlayer() {
    const { navigation } = this.props;

    navigation.navigate('PlayerCreateScreen');
  }

  getAllPlayers() {
    this.setState({ isLoading: true });

    new PlayerCollection().getPlayers().then((players) => {
      this.setState({ players, isLoading: false });
    });
  }

  /**
   * Attach to navigation event to fetch all players on every focus.
   *
   * This is a compromise and dirty solution to the problem of refreshing
   * only after creating a player. I couldn't get it to work now so here we are.
   *
   */
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
          keyExtractor={item => item.getId()}
          data={players}
          renderItem={PlayerListItem}
        />
      );

    return (
      <View style={styles.playerListRoot}>

        { content }

        <Button
          title="Add a player"
          onPress={this.onAddPlayer}
        />
      </View>
    );
  }
}

export default PlayerList;
