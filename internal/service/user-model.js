import Bcrypt from '../bcrypt.js';

console.group("%c INSIDE User Model", "background:yellow");

export class User {
  constructor({ memberId, memberPw, memberName }) {
    this.memberId = memberId;
    this.password = memberPw;
    this.memberName = memberName;
  }

  async getInfo() {
    try {
      const hashedPassword = await this.hashPassword();
      return {
        member_id: this.memberId,
        member_pw: hashedPassword,
        member_name: this.memberName,
      };
    } catch (error) {
      console.error('Error generating user info:', error);
      throw error;
    }
  }

  async hashPassword() {
    try {
      const bcrypt = new Bcrypt(this.password);
      return await bcrypt.getHash();
    } catch (error) {
      console.error('Error hashing password:', error);
      throw error;
    }
  }
}

console.groupEnd();
