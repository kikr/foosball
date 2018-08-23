import React from 'react';
import {
  BackHandler,
} from 'react-native';

/**
 * Used to fix issue with back navigation with Stack navigation nested in Tab
 * navigation
 *
 * Issue is that  pressing hardware back would close the app, instead
 * of navigating back to root component.
 *
 * @see https://github.com/react-navigation/react-navigation/issues/2324
 */
export default class StackHardwareBackHandler extends React.Component {
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress.bind(this));
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  handleBackPress() {
    this.goBack();
    return true;
  }

  goBack() {
    const { navigation } = this.props;
    navigation.goBack();
  }
}
