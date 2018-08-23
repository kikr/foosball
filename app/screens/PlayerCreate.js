import React from 'react';
import {
} from 'react-native';
import PlayerCreateForm from '../components/PlayerCreateForm';
import StackHardwareBackHandler from '../global/StackHardwareBackHandler';

export default class PlayerCreateScreen extends StackHardwareBackHandler {
  render() {
    const { navigation } = this.props;
    return <PlayerCreateForm navigation={navigation} />;
  }
}
