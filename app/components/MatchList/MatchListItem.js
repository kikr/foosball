import React from 'react';
import { ListItem } from 'react-native-elements';
import {
  View,
  Text,
} from 'react-native';
import styles from './styles';

const MatchListItem = ({ item: match }) => {
  const toFullName = player => player.nickName ?
    ` ${player.firstName} "${player.nickName}" ${player.lastName}` :
    ` ${player.firstName} ${player.lastName}`;
  const homePlayers = match.home.map(toFullName);
  const awayPlayers = match.away.map(toFullName);

  const duration = parseInt(match.duration, 10);
  const minutes = Math.floor(duration / 60);
  const seconds = duration - (minutes * 60);
  const durationString = seconds ? `${minutes}:${seconds}` : `${minutes}:00`;


  return (
    <ListItem
      style={styles.playerList}
      title={(
        <View style={{ alignItems: 'center' }}>
          <View>
            <Text> {`${homePlayers}`}</Text>
          </View>
          <View>
            <Text> {`${match.homeScore}`}</Text>
            <Text> {`${durationString}`}</Text>
            <Text> {`${match.awayScore}`}</Text>
          </View>
          <View>
            <Text> {`${awayPlayers}`}</Text>
          </View>
        </View>
      )}
      hideChevron
    />
  );
};

export default MatchListItem;
