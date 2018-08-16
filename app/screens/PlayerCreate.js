import React from 'react';
import PlayerCreateForm from '../components/PlayerCreateForm';

// Navigation property is not automatically passed down to screens' children
const PlayerCreateScreen = ({ navigation }) => (/* eslint-disable-line react/prop-types */
  <PlayerCreateForm navigation={navigation} />
);

export default PlayerCreateScreen;
