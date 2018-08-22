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
              label={player.getFullCoolName()}
              value={player.getId()}
            />
          ))
        }
      </Picker>

      <FlatList
        style={{ margin: 5 }}
        keyExtractor={player => player.getId()}
        data={selectedPlayers}
        renderItem={({ item: player }) => (
          <View>
            <Text>
              {player.getFullCoolName()}
            </Text>
            <Button
              title="Deselect"
              onPress={() => { onDeselectPlayer(item.getId()); }}
            />
          </View>)}
      />
    </View>

  );
};

export default MatchPlayerPicker;
