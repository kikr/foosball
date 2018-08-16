import { createMaterialTopTabNavigator } from 'react-navigation';
import PlayersScreen from './screens/Players';
import MatchScreen from './screens/Matches';
import PlayerStatsScreen from './screens/PlayerStats';

export default createMaterialTopTabNavigator({
  Players: PlayersScreen,
  Matches: MatchScreen,
  PlayerStats: PlayerStatsScreen,
}, {
  tabBarOptions: {
    labelStyle: {
      fontSize: 12,
    },
    style: {
      paddingTop: 15, // Don't go under status bar
    },
  },
});
