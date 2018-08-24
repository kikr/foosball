import React from 'react';
import {
  View,
  Text,
} from 'react-native';

/* eslint-disable class-methods-use-this */
export default class PlayersGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = { grid: [] };
  }

  componentDidMount() {
    const { playerNames } = this.props;

    this.fillGrid(playerNames);
  }

  fillGrid(playerNames) {
    const { grid } = this.state;
    const { rows, cols } = this.props;

    for (let row = 0; row < rows; row += 1) {
      grid[row] = [];
      for (let col = 0; col < cols; col += 1) {
        grid[row].push(playerNames.pop());
        if (!(playerNames.length)) {
          break;
        }
      }
      if (!(playerNames.length)) {
        break;
      }
    }

    this.setState({ grid });
  }

  render() {
    const { grid } = this.state;

    return (
      <View style={{ flex: 1 }}>
        {
          grid.map(row => (
            <View style={{
              flex: 1, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-evenly',
            }}
            >
              {
                row.map(playerName => (
                  <View>
                    <Text>
                      {playerName}
                    </Text>
                  </View>
                ))
              }
            </View>
          ))
        }
      </View>
    );
  }
}
