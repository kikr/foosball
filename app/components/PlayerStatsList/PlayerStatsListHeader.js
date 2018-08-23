import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './styles';

// Poor mans enum. Don't use duplicate values
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
        // Make a View clickable
        <TouchableHighlight
          style={styles.listHeaderItemRoot}
          onPress={() => onHeaderPress(headers, props)}
        >
          <View>
            <Text
              style={styles.listHeaderItemText}
              key={headers[0]}
              numberOfLines={2}
            >
              {headers[1]}
            </Text>
            <Icon name="arrow-drop-down" color="white" />
          </View>
        </TouchableHighlight>
      ))
    }

  </View>
);

export default PlayerStatsListHeader;
