import React from 'react';
import {
  TextInput,
  Button,
  View,
  ActivityIndicator,
} from 'react-native';
import PlayerCollection from '../../api/PlayerCollection';
import Player from '../../dto/Player';

class PlayerCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isCreating: false, player: { firstName: '', lastName: '' } };

    this.onCreatePlayer = this.onCreatePlayer.bind(this);
  }

  onCreatePlayer() {
    console.log('Creating a player...');
    const { player } = this.state;

    this.enableLoading();

    new PlayerCollection()
      .createPlayer(new Player(player))
      .then(() => {
        console.log('Player created...');
        /* eslint-disable react/prop-types */
        const { navigation: { state: { params: goBackAndRefreshPlayerList } } } = this.props;
        /* eslint-enable react/prop-types */

        goBackAndRefreshPlayerList();
      });
  }

  /**
   * setState doesn't support setting nested objects in state object, so here we go.
   * This is a convenience function for setting player state that is nested in state object
   * https://stackoverflow.com/a/43041334
   */
  setPlayerState(playerFormData) {
    const { player } = this.state;

    Object.keys(playerFormData).forEach((key) => {
      player[key] = playerFormData[key];
    });

    this.setState({ player });
  }

  enableLoading() {
    this.setState({ isCreating: true });
  }

  render() {
    const { isCreating } = this.state;

    if (isCreating) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View>
        <TextInput
          placeholder="First name"
          onChangeText={firstName => this.setPlayerState({ firstName })}
        />
        <TextInput
          placeholder="Last name"
          onChangeText={lastName => this.setPlayerState({ lastName })}
        />

        <TextInput
          placeholder="Nick name"
          onChangeText={nickName => this.setPlayerState({ nickName })}
        />

        <Button
          title="Create"
          onPress={this.onCreatePlayer}
        />
      </View>
    );
  }
}

export default PlayerCreateForm;
