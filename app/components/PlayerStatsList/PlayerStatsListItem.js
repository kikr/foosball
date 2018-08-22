
import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import styles from './styles';

const PlayerStatsListItem = ({ item: player }) => (
  <View style={styles.listItemRoot}>
    <Text>
      {player.getFullCoolName()}
    </Text>
    <Text>
      {player.stats.wins}
    </Text>
    <Text>
      {player.stats.losses}
    </Text>
    <Text>
      {player.stats.goalsScored}
    </Text>
    <Text>
      {player.stats.goalsConceded}
    </Text>
  </View>
);

export default PlayerStatsListItem;
