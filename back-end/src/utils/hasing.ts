import * as bcrypt from 'bcrypt';
export class Hashing {
  static make(password: string) {
    const saltOfRound = 10;
    const salt = bcrypt.genSaltSync(saltOfRound);
    return bcrypt.hashSync(password, salt);
  }
  static verify(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  }
}
