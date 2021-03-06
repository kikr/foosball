import React from 'react';
import {
  View,
  FlatList,
  Button,
  ActivityIndicator,
} from 'react-native';
import MatchCollection from '../../api/MatchCollection';
import MatchListItem from './MatchListItem';
import styles from './styles';
import { theme } from '../../global/styles';

class MatchList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isLoading: true, matches: [] };

    this.onAddMatch = this.onAddMatch.bind(this);
  }

  componentDidMount() {
    this.getAllMatchesOnEveryFocus();
  }

  onAddMatch() {
    const { navigation } = this.props;

    // TODO
    navigation.navigate('MatchCreateScreen');
  }

  getAllMatches() {
    this.setState({ isLoading: true });

    new MatchCollection().getMatches().then((matches) => {
      this.setState({ matches, isLoading: false });
    });
  }

  /**
   * @see PlayerList.js
   *
   */
  getAllMatchesOnEveryFocus() {
    const { navigation } = this.props;

    navigation.addListener(
      'willFocus',
      () => {
        this.getAllMatches();
      },
    );
  }

  render() {
    const { matches, isLoading } = this.state;
    const content = isLoading
      ? (<ActivityIndicator
        style={{ flex: 1 }}
        size="large"
      />
      )
      : (
        <FlatList
          keyExtractor={item => item.getId()}
          data={matches}
          renderItem={MatchListItem}
        />
      );

    return (
      <View style={styles.matchListRoot}>

        { content }

        <Button
          title="Add a match"
          color={theme.color}
          onPress={this.onAddMatch}
        />
      </View>
    );
  }
}

export default MatchList;
