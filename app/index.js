import { createMaterialTopTabNavigator } from 'react-navigation';
import PlayersScreen from './screens/Players';
import MatchScreen from './screens/Matches';
import PlayerStatsScreen from './screens/PlayerStats';
import styles from './global/styles';

PlayerStatsScreen.navigationOptions = {
  title: 'Stats',
};

export default createMaterialTopTabNavigator({
  Players: PlayersScreen,
  Matches: MatchScreen,
  PlayerStats: PlayerStatsScreen,
}, {
  tabBarOptions: {
    labelStyle: {
      fontSize: 12,
    },
    style: styles.tabBarTheme,
  },
});
