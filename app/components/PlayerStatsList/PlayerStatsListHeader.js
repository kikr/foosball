import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './styles';

// Poor mans enum. Don't use duplicate values
export const HEADERS = {
  PLAYER_NAME: 'Player name',
  WINS: 'Wins',
  LOSSES: 'Losses',
  GOALS_SCORED: 'Goals scored',
  GOALS_CONCEDED: 'Goals conceded',
};

/**
 * Sorting
 *    Responsible only visually displaying the sorting state.
 *    The actual sorting and its state is handled in parent.
 */
export default class PlayerStatsListHeader extends React.Component {
  onHeaderPress(headers) {
    const {
      onSortByWins,
      onSortByLosses,
      onSortByGoalsScored,
      onSortByGoalsConceded,
      onSortByPlayerName,
    } = this.props;
    const headerName = headers[1];

    switch (headerName) {
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
  }

  render() {
    const { sortBy, isAscendingSort } = this.props;

    return (
      <View style={styles.listHeader}>
        {
          Object.entries(HEADERS).map(headers => (
            // Make a View clickable
            <TouchableOpacity
              style={styles.listHeaderItemRoot}
              onPress={() => this.onHeaderPress(headers)}
            >
              <View>
                <View style={styles.listHeaderSortIconRoot}>
                  {
                    sortBy === headers[1]
                    && isAscendingSort
                    && <Icon name="arrow-drop-up" color="white" />
                  }
                </View>

                <Text
                  style={styles.listHeaderItemText}
                  key={headers[0]}
                  numberOfLines={2}
                >
                  {headers[1]}
                </Text>
                <View style={styles.listHeaderSortIconRoot}>
                  {
                    sortBy === headers[1]
                    && !(isAscendingSort)
                    && <Icon name="arrow-drop-down" color="white" />
                  }
                </View>
              </View>
            </TouchableOpacity>
          ))
        }
      </View>
    );
  }
}
