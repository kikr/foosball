import React from 'react';
import {
  Picker,
  View,
  Text,
} from 'react-native';

class MatchScorePicker extends React.Component {
  constructor(props) {
    super(props);

    this.scorePickerItems = this.initScorePickerItems();
  }

  /* eslint-disable class-methods-use-this */
  initScorePickerItems() {
    const validScores = Array.from(Array(11).keys());
    return validScores.map(i => (
      <Picker.Item
        key={i.toString()}
        label={i.toString()}
        value={i}
      />
    ));
  }
  /* eslint-enable class-methods-use-this */

  render() {
    const { score, onChangeScore, title } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <Text>
          {title}
        </Text>

        <Picker
          style={{ height: 50, width: 60 }}
          selectedValue={score}
          onValueChange={newScore => onChangeScore(newScore)}
        >
          {
            this.scorePickerItems
          }
        </Picker>
      </View>

    );
  }
}

export default MatchScorePicker;
