
import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import styles from './styles';

const PlayerStatsListItem = ({ item: player }) => (
  <View style={styles.listItemRoot}>
    <Text style={{ flex: 2 }}>
      {player.getFullCoolName()}
    </Text>
    <Text style={{ flex: 1 }}>
      {player.stats.wins}
    </Text>
    <Text style={{ flex: 1 }}>
      {player.stats.losses}
    </Text>
    <Text style={{ flex: 1 }}>
      {player.stats.goalsScored}
    </Text>
    <Text style={{ flex: 1 }}>
      {player.stats.goalsConceded}
    </Text>
  </View>
);

export default PlayerStatsListItem;
