import React from 'react';
import {
  View,
  Button,
} from 'react-native';
import styles from './styles';

const HEADERS = {
  PLAYER_NAME: 'Player name',
  WINS: 'Wins',
  LOSSES: 'Losses',
  GOALS_SCORED: 'Goals scored',
  GOALS_CONCEDED: 'Goals conceded',
};

const onHeaderPress = (header, props) => {
  const {
    onSortByWins,
    onSortByLosses,
    onSortByGoalsScored,
    onSortByGoalsConceded,
    onSortByPlayerName,
  } = props;

  switch (header[1]) {
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
      Object.entries(HEADERS).map(entry => (
        <Button
          style={styles.listHeaderItem}
          title={entry[1]}
          onPress={() => onHeaderPress(entry, props)}
        />
      ))
    }

  </View>
);

export default PlayerStatsListHeader;
