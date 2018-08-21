import React from 'react';
import {
  Picker,
  Button,
  View,
  Text,
  FlatList,
} from 'react-native';


const MatchPlayerPicker = (props) => {
  const {
    playerSelection, selectedPlayers, onDeselectPlayer, onSelectPlayer, placeHolder,
  } = props;

  return (
    <View style={{ flex: 1 }}>
      <Picker
        style={{ margin: 5 }}
        onValueChange={playerId => onSelectPlayer(playerId)}
      >
        <Picker.Item value="" label={placeHolder} />
        {
          playerSelection.map(player => (
            <Picker.Item
              key={player.getId()}
              label={`${player.firstName} ${player.lastName}`}
              value={player.getId()}
            />
          ))
        }
      </Picker>

      <FlatList
        style={{ margin: 5 }}
        keyExtractor={player => player.getId()}
        data={selectedPlayers}
        renderItem={({ item }) => (
          <View>
            <Text>
              {`${item.firstName}`}
            </Text>
            <Button
              title="Deselect"
              onPress={onDeselectPlayer.bind(undefined, item.getId())}
            />
          </View>)}
      />
    </View>

  );
};

export default MatchPlayerPicker;
