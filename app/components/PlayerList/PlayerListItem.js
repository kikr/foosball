import React from 'react';
import { ListItem } from 'react-native-elements';
import styles from './styles';

const PlayerListItem = ({ item: player }) => (
  <ListItem
    style={styles.playerList}
    title={`${player.firstName} ${player.lastName}`}
    subtitle={player.nickName}
    hideChevron
  />
);

export default PlayerListItem;
