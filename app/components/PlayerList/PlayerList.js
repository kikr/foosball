import React from 'react';
import {
  View,
  Button,
  ActivityIndicator,
} from 'react-native';
import { ListItem } from 'react-native-elements';
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
    navigation.navigate('PlayerCreateScreen');
  }

  render() {
    const { players, isLoading } = this.state;

    if (isLoading) {
      return <ActivityIndicator />;
    }

    return (
      <View style={styles.playerListRoot}>
        {
          players.map((player, i) => (
            <ListItem
              style={styles.playerList}
              key={i}
              title={`${player.firstName} ${player.lastName}`}
              subtitle={player.nickName}
              hideChevron
            />
          ))
        }
        <Button
          title="Add a player"
          onPress={this.onAddPlayer}
        />
      </View>
    );
  }
}

export default PlayerList;
