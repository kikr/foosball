import React from 'react';
import PlayerCreateForm from '../components/PlayerCreateForm';

// Navigation property is not automatically passed down to screens' children
const PlayerCreateScreen = ({ navigation }) => (
  <PlayerCreateForm navigation={navigation} />
);

export default PlayerCreateScreen;
