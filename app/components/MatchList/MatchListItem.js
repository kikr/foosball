import React from 'react';
import { ListItem } from 'react-native-elements';
import {
  View,
  Text,
} from 'react-native';
import styles from './styles';

const composePlayerNames = (players) => {
  const composedName = player => (
    player.nickName
      ? ` ${player.firstName} "${player.nickName}" ${player.lastName}`
      : ` ${player.firstName} ${player.lastName}`
  );

  return players.map(composedName);
};

const MatchListItem = ({ item: match }) => {
  const [homePlayerNames, awayPlayerNames] = [match.home, match.away].map(composePlayerNames);
  const matchTime = `${parseInt(match.duration / 60, 10)}:${match.duration % 60}`;


  return (
    <ListItem
      style={styles.playerList}
      title={(
        <View style={{ alignItems: 'center' }}>
          <View>
            <Text>
              {`${homePlayerNames}`}
            </Text>
          </View>
          <View>
            <Text>
              {`${match.homeScore}`}
            </Text>
            <Text>
              {`${matchTime}`}
            </Text>
            <Text>
              {`${match.awayScore}`}
            </Text>
          </View>
          <View>
            <Text>
              {`${awayPlayerNames}`}
            </Text>
          </View>
        </View>
      )}
      hideChevron
    />
  );
};

export default MatchListItem;
