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
  }

  onAddPlayer() {
    const { navigation } = this.props; /* eslint-disable-line react/prop-types */
    navigation.navigate('PlayerCreateScreen', {
      goBackAndRefreshPlayerList: this.onAfterAddPlayer.bind(this),
    });
  }

  onAfterAddPlayer() {
    const { navigation } = this.props; /* eslint-disable-line react/prop-types */

    this.setState({ isLoading: true });
    // Navigate to self. We could call goBack, but let's be explicit just to be sure.
    navigation.navigate('PlayerList');

    this.getAllPlayers();
  }

  getAllPlayers() {
    new PlayerCollection().getPlayers().then((players) => {
      this.setState({ players, isLoading: false });
    });
  }

  render() {
    const { players, isLoading } = this.state;

    if (isLoading) {
      return <ActivityIndicator />;
    }

    return (
      <View style={styles.playerListRoot}>
        <FlatList
          keyExtractor={item => item.getId()}
          data={players}
          renderItem={PlayerListItem}
        />
        <Button
          title="Add a player"
          onPress={this.onAddPlayer}
        />
      </View>
    );
  }
}

export default PlayerList;
