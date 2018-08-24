import React from 'react';
import { ListItem } from 'react-native-elements';
import {
  View,
  Text,
} from 'react-native';
import styles from './styles';
import PlayersGrid from './PlayersGrid';

const composePlayerNames = (players) => {
  const composedName = player => (
    player.nickName
      ? ` ${player.firstName} "${player.nickName}" ${player.lastName}`
      : ` ${player.firstName} ${player.lastName}`
  );

  return players.map(composedName);
};

function getMatchTime(match) {
  const matchTimeMinutes = parseInt(match.duration / 60, 10);
  const matchTimeSeconds = match.duration % 60;
  let matchTime = matchTimeMinutes < 10 ? `0${matchTimeMinutes}` : `${matchTimeMinutes}`;
  matchTime = matchTimeSeconds < 10 ? `${matchTime}:0${matchTimeSeconds}` : `${matchTime}:${matchTimeSeconds}`;
  return matchTime;
}

const MatchListItem = ({ item: match }) => {
  const [homePlayerNames, awayPlayerNames] = [match.home, match.away].map(composePlayerNames);

  return (
    <ListItem
      style={styles.playerList}
      title={(
        <View style={{ paddingTop: 10, paddingBottom: 10 }}>
          <PlayersGrid
            cols={2}
            rows={2}
            playerNames={homePlayerNames}
          />
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 20 }}>
              {`${match.homeScore}`}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {`${getMatchTime(match)}`}
            </Text>
            <Text style={{ fontSize: 20 }}>
              {`${match.awayScore}`}
            </Text>
          </View>
          <PlayersGrid
            cols={2}
            rows={2}
            playerNames={awayPlayerNames}
          />
        </View>
      )}
      hideChevron
    />
  );
};

export default MatchListItem;
