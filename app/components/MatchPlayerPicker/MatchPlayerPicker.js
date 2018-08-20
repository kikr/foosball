import React from 'react';
import {
  ActivityIndicator,
  Picker,
  Button,
  View,
  Text,
  FlatList,
} from 'react-native';
import PlayerCollection from '../../api/PlayerCollection';

class MatchPlayerPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isLoadingPlayers: true, playerSelection: [], selectedPlayers: [] };
  }

  componentDidMount() {
    this.setState({ isLoadingPlayers: false });

    new PlayerCollection().getPlayers().then((players) => {
      this.setState({ playerSelection: players, isLoadingPlayers: false });
    });
  }

  onDeselectPlayer(playerId) {
    let { selectedPlayers, playerSelection } = this.state;

    playerSelection = playerSelection.concat(
      selectedPlayers.filter(player => player.getId() === playerId),
    );
    selectedPlayers = selectedPlayers.filter(player => player.getId() !== playerId);

    this.setState({ selectedPlayers, playerSelection });
  }

  onSelectPlayer(selectedPlayerId) {
    let { selectedPlayers, playerSelection } = this.state;
    const { onChangeSelectedPlayers } = this.props;

    selectedPlayers = selectedPlayers.concat(
      playerSelection.filter(player => player.getId() === selectedPlayerId),
    );
    playerSelection = playerSelection.filter(player => player.getId() !== selectedPlayerId);

    onChangeSelectedPlayers(selectedPlayers);
    this.setState({ selectedPlayers, playerSelection });
  }

  render() {
    const { isLoadingPlayers, playerSelection, selectedPlayers } = this.state;
    const { placeHolder } = this.props;

    if (isLoadingPlayers) {
      return <ActivityIndicator />;
    }

    return (
      <View>
        <FlatList
          keyExtractor={player => player.getId()}
          data={selectedPlayers}
          renderItem={({ item }) => (
            <View>
              <Text>
                {`${item.firstName}`}
              </Text>
              <Button
                title="Deselect"
                onPress={this.onDeselectPlayer.bind(this, item.getId())}
              />
            </View>)}
        />

        <Picker
          style={{ height: 50, width: 100 }}
          onValueChange={playerId => this.onSelectPlayer(playerId)}
        >
          <Picker.Item value="" label={placeHolder} />
          {
            playerSelection.map(player => <Picker.Item label={`${player.firstName} ${player.lastName}`} value={player.getId()} />)
          }
        </Picker>
      </View>

    );
  }
}

export default MatchPlayerPicker;
