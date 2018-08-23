import React from 'react';
import { Icon } from 'react-native-elements';
import PlayerStatsList from '../components/PlayerStatsList';

const PlayerStatsScreen = ({ navigation }) => (
  <PlayerStatsList navigation={navigation} />
);

PlayerStatsScreen.navigationOptions = {
  tabBarIcon: <Icon name="bar_chart" color="white" />,
};

export default PlayerStatsScreen;
