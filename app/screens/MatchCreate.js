import React from 'react';
import MatchCreateForm from '../components/MatchCreateForm';

// Navigation property is not automatically passed down to screens' children
const MatchCreateScreen = ({ navigation }) => (
  <MatchCreateForm navigation={navigation} />
);

export default MatchCreateScreen;
