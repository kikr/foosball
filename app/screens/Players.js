import { createStackNavigator } from 'react-navigation';
import PlayerList from '../components/PlayerList';
import PlayerCreateScreen from './PlayerCreate';

export default createStackNavigator({
  PlayerList,
  PlayerCreateScreen,
}, {
  headerMode: 'none',
});
