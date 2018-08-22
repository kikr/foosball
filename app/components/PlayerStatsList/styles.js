import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles';

export default StyleSheet.create({
  listHeader: {
    paddingTop: 15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: theme.color,
  },
  listHeaderItem: {
    padding: 10,
    flex: 1,
    fontSize: 15,
    color: 'white',
  },
  listItemRoot: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
    marginTop: 20,
  },
});
