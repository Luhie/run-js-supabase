import bcryptjs from "https://cdn.jsdelivr.net/npm/bcryptjs@2.4.3/+esm";

console.group("INSIDE bcrypt");

export default class Bcrypt {
  constructor(password) {
    this.password = password;
  }

  // 비밀번호 해싱 함수
  async getHash() {

    try {
      const saltRounds = 10; // 추천 값: 10-12
      const salt = await bcryptjs.genSalt(saltRounds); // Salt 생성
      const hashedPassword = await bcryptjs.hash(this.password, salt); // 비밀번호 해싱

      console.log("Hashed Password:", hashedPassword);

      return hashedPassword;
    } catch (error) {
      console.error("Error in hashPassword:", error);
      throw error;
    }
  }

  async comparePassword() {
      // 비밀번호 비교
      const isMatch = await bcryptjs.compare(this.password, hashedPassword);
      console.log("Is Password Match?", isMatch); // true
  }
}

console.groupEnd();