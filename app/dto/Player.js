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
}
