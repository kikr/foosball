import { createMaterialTopTabNavigator } from 'react-navigation';
import React from 'react';
import { Icon } from 'react-native-elements';
import PlayersScreen from './screens/Players';
import MatchScreen from './screens/Matches';
import PlayerStatsScreen from './screens/PlayerStats';
import styles from './global/styles';

PlayerStatsScreen.navigationOptions = {
  title: 'Stats',
};

export default createMaterialTopTabNavigator({
  Matches: MatchScreen,
  PlayerStats: {
    screen: PlayerStatsScreen,
    navigationOptions: {
      tabBarIcon: <Icon name="equalizer" color="white" />,
    },
  },
  Players: PlayersScreen,
}, {
  tabBarOptions: {
    showLabel: false,
    showIcon: true,
    labelStyle: {
      fontSize: 12,
    },
    style: styles.tabBarTheme,
  },
});
