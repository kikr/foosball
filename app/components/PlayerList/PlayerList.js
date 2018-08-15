import React from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
import PlayerCollection from '../../api/PlayerCollection';

class PlayerList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isLoading: true, players: [] };
  }

  componentDidMount() {
    // TODO: Handle error
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
      <View>
        <FlatList
          data={players}
          renderItem={({ item }) => (
            <Text>
              {item.firstName}
              {item.lastName}
            </Text>
          )}
        />
      </View>
    );
  }
}

export default PlayerList;
