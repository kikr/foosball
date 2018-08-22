import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import styles from './styles';

const HEADERS = {
  PLAYER_NAME: 'Player name',
  WINS: 'Wins',
  LOSSES: 'Losses',
  GOALS_SCORED: 'Goals scored',
  GOALS_CONCEDED: 'Goals conceded',
};

const onHeaderPress = (headers, props) => {
  const {
    onSortByWins,
    onSortByLosses,
    onSortByGoalsScored,
    onSortByGoalsConceded,
    onSortByPlayerName,
  } = props;

  switch (headers[1]) {
    case HEADERS.PLAYER_NAME:
      onSortByPlayerName();
      break;
    case HEADERS.WINS:
      onSortByWins();
      break;
    case HEADERS.LOSSES:
      onSortByLosses();
      break;
    case HEADERS.GOALS_SCORED:
      onSortByGoalsScored();
      break;
    case HEADERS.GOALS_CONCEDED:
      onSortByGoalsConceded();
      break;
    default:
      console.error('Unknown sorting attempt on player stats list');
  }
};

const PlayerStatsListHeader = props => (
  <View style={styles.listHeader}>
    {
      Object.entries(HEADERS).map(headers => (
        <Text
          style={styles.listHeaderItem}
          onPress={() => onHeaderPress(headers, props)}
        >
          {headers[1]}
        </Text>
      ))
    }

  </View>
);

export default PlayerStatsListHeader;
