import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements'
import PlayerList from '../components/PlayerList';
import PlayerCreateScreen from './PlayerCreate';

const playersStack = createStackNavigator({
  PlayerList,
  PlayerCreateScreen,
}, {
  headerMode: 'none',
});

// https://reactnavigation.org/docs/en/navigation-options-resolution.html
playersStack.navigationOptions = {
  tabBarIcon: <Icon name="person" color="white" />,
};

export default playersStack;
