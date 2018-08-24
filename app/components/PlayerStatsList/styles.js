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
  listHeaderItemText: {
    fontSize: 15,
    color: 'white',
  },
  listHeaderItemRoot: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    flex: 1,
  },

  listHeaderSortIconRoot: {
    height: 15,
    flex: 1,
  },

  listItemRoot: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
    marginTop: 20,
  },
});
