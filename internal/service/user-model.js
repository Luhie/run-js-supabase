import Bcrypt from '../bcrypt.js';

console.group("%c INSIDE user-model","background:yellow");
class User {
	constructor(object){
		this.userId = object.userId;
		this.userPw = object.userPw;
		this.userName = object.userName;
	}

	async getUser() {
		try {
			const hashedPassword = await this.hashPassword();
			const user = {
				"user_id" : this.userId,
				"user_pw" : hashedPassword,
				"user_name" : this.userName
			}
			console.table(user);
			return user;

		} catch (error) {
			console.error("Error hashing password: ", error);
			throw error;
		}
	}

	async hashPassword() {
		try {
			const bcrypt = new Bcrypt(this.userPw);
			const result = await bcrypt.getHash();
			return result;
		} catch (error) {
			console.error("Error generating hash: ", error);
			throw error;
		}
	}

}

export {User}
console.groupEnd();