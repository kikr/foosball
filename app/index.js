import { createBottomTabNavigator } from 'react-navigation';
import PlayersScreen from './screens/Players';
import MatchScreen from './screens/Matches';
import PlayerStatsScreen from './screens/PlayerStats';

export default createBottomTabNavigator({
  Players: PlayersScreen,
  Matches: MatchScreen,
  PlayerStats: PlayerStatsScreen,
});
