import { createStackNavigator } from 'react-navigation';
import MatchList from '../components/MatchList';
import MatchCreateScreen from './MatchCreate';

export default createStackNavigator({
  MatchList,
  MatchCreateScreen,
}, {
  headerMode: 'none',
});
