import Document from './Document';

export default class Player extends Document {
  constructor({
    firstName, lastName, nickName, ...rest
  }) {
    super(rest);

    this.firstName = firstName;
    this.lastName = lastName;
    this.nickName = nickName;

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
