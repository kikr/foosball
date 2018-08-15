import React from 'react';
import {
  View,
  FlatList,
  Text,
  Button,
  ActivityIndicator,
} from 'react-native';
import PlayerCollection from '../../api/PlayerCollection';
import styles from './styles';

class PlayerList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isLoading: true, players: [] };

    this.onAddPlayer = this.onAddPlayer.bind(this);
  }

  componentDidMount() {
    new PlayerCollection().getPlayers().then((players) => {
      this.setState({ players, isLoading: false });
    });
  }

  onAddPlayer() {
    const { navigation } = this.props; /* eslint-disable-line react/prop-types */
    navigation.navigate('PlayerCreate');
  }

  render() {
    const { players, isLoading } = this.state;

    if (isLoading) {
      return <ActivityIndicator />;
    }

    return (
      <View>
        <FlatList
          style={styles.playerList}
          data={players}
          renderItem={({ item }) => (
            <Text>
              {item.firstName}
              {item.lastName}
            </Text>
          )}
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
