import React from 'react';
import {
  View,
  ActivityIndicator,
} from 'react-native';
import {
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage,
} from 'react-native-elements';
import PlayerCollection from '../../api/PlayerCollection';
import Player from '../../dto/Player';
import styles from './styles';
import { theme } from '../../global/styles';

const FirstNameRequiredError = key => (
  <FormValidationMessage key={key}> Required </FormValidationMessage>
);
const LastNameRequiredError = FirstNameRequiredError;

class PlayerCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreating: false,
      errors: { firstName: [], lastName: [] },
    };
    this.player = { firstName: '', lastName: '' };

    this.onCreatePlayer = this.onCreatePlayer.bind(this);
    this.setFirstName = this.setFirstName.bind(this);
    this.setLastName = this.setLastName.bind(this);
    this.setNickName = this.setNickName.bind(this);
  }

  onCreatePlayer() {
    console.log('Creating a player...');
    const { player } = this;

    if (this.isValid()) {
      this.enableLoading();

      new PlayerCollection()
        .createPlayer(new Player(player))
        .then(() => {
          console.log('Player created...');
          this.goBack();
        });
    }
  }

  setFirstName(firstName) {
    this.player.firstName = firstName;
  }

  setLastName(lastName) {
    this.player.lastName = lastName;
  }

  setNickName(nickName) {
    this.player.nickName = nickName;
  }

  goBack() {
    const { navigation } = this.props;
    navigation.goBack();
  }

  enableLoading() {
    this.setState({ isCreating: true });
  }

  isValid() {
    const { firstName, lastName } = this.player;
    const { errors } = this.state;

    if (!(firstName)) {
      if (!(errors.firstName.length)) errors.firstName.push(FirstNameRequiredError('firstNameRequired'));
    } else {
      errors.firstName = [];
    }

    if (!(lastName)) {
      if (!(errors.lastName.length)) errors.lastName.push(LastNameRequiredError('lastNameRequired'));
    } else {
      errors.lastName = [];
    }

    if (errors.firstName.length || errors.lastName.length) {
      this.setState({ errors });
      return false;
    }

    return true;
  }

  render() {
    const { isCreating, errors } = this.state;

    if (isCreating) {
      return (
        <View style={{ flex: 1 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.playerCreateFormRoot}>
        <FormLabel> First name </FormLabel>
        <FormInput
          style={styles.playerCreateFormTextInput}
          maxLength={35}
          autoFocus
          autoCapitalize="words"
          placeholder="e.g. John"
          onChangeText={this.setFirstName}
        />
        {
          errors.firstName
        }

        <FormLabel> Last name </FormLabel>
        <FormInput
          style={styles.playerCreateFormTextInput}
          maxLength={35}
          autoCapitalize="words"
          placeholder="e.g. Doe"
          onChangeText={this.setLastName}
        />
        {
          errors.lastName
        }
        <FormLabel> Nick name </FormLabel>
        <FormInput
          style={styles.playerCreateFormTextInput}
          maxLength={35}
          autoCapitalize="words"
          placeholder="e.g. The Machine"
          onChangeText={this.setNickName}
        />

        <Button
          title="Create"
          backgroundColor={theme.color}
          onPress={this.onCreatePlayer}
        />
      </View>
    );
  }
}

export default PlayerCreateForm;
