import React from 'react';
import MatchCreateForm from '../components/MatchCreateForm';
import StackHardwareBackHandler from '../global/StackHardwareBackHandler';

export default class MatchCreateScreen extends StackHardwareBackHandler {
  render() {
    const { navigation } = this.props;
    return <MatchCreateForm navigation={navigation} />;
  }
}
