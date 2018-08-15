import firebase from 'firebase/app';
import 'firebase/firestore';
import settings from '../configs/settings';


/**
 * Base class for representing a NoSQL collection in remote source.
 * Should be only used by children that respresent a specific collection
 */
export default class Collection {
  connection() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: settings.FIREBASE_API_KEY,
        projectId: settings.FIREBASE_PROJECT_ID,
      });
    }

    if (!(this.conn)) {
      this.conn = firebase.firestore();
      // Required by Firebase due to change in their Date objects or something like that.
      this.conn.settings({ timestampsInSnapshots: true });
    }

    return this.conn;
  }
}
