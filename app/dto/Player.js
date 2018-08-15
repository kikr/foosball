export default class Player {
  constructor(data) {
    Object.assign(this, data || {});
    this.validate();
  }

  validate() {
    if (!(this.firstName)) {
      throw Error('Player first name is required!');
    }
    if (!(this.lastName)) {
      throw Error('Player last name is required!');
    }
  }

  /**
   * Returns ID and throws if there's none. Don't use this for checking
   * IDs, instead write a new function for that.
   *
   * I throw because I want to get properly informed if remote source did not
   * return ID, or has changed its return format or something (with this new Firestore
   * it could happend).
   */
  getId() {
    // Just to make sure that there's an ID. Callers expect this to be non-empty.
    if (!(this.id)) {
      throw Error('Player has no ID. Probably this was never returned from remote source, or the return format has changed.');
    }
    return this.id;
  }
}
