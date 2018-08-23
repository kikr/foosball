import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import MatchList from '../components/MatchList';
import MatchCreateScreen from './MatchCreate';

const matchesStack = createStackNavigator({
  MatchList,
  MatchCreateScreen,
}, {
  headerMode: 'none',
});

// https://reactnavigation.org/docs/en/navigation-options-resolution.html
matchesStack.navigationOptions = {
  tabBarIcon: <Icon name="soccer-field" type="material-community" color="white" />,
};

export default matchesStack;
