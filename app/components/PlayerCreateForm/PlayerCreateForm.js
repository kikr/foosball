import React from 'react';
import {
  TextInput,
  Button,
  View,
  ActivityIndicator,
} from 'react-native';
import PlayerCollection from '../../api/PlayerCollection';
import Player from '../../dto/Player';
import styles from './styles';

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
        const { navigation } = this.props;

        navigation.goBack();
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
        <View style={{ flex: 1 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.playerCreateFormRoot}>
        <TextInput
          style={styles.playerCreateFormTextInput}
          placeholder="First name"
          onChangeText={firstName => this.setPlayerState({ firstName })}
        />
        <TextInput
          style={styles.playerCreateFormTextInput}
          placeholder="Last name"
          onChangeText={lastName => this.setPlayerState({ lastName })}
        />

        <TextInput
          style={styles.playerCreateFormTextInput}
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
