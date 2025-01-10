import cryptoJs from "https://cdn.jsdelivr.net/npm/crypto-js@4.2.0/+esm";

//bcrypt로 변경
class Cryption {

	getHash(text) {
		const hash = cryptoJs.SHA3(text);
		const hash64 = hash.toString(cryptoJs.enc.Base64);
		return hash64;
	}

		// // 암호화
		// const encrypt = cryptoJs.AES.encrypt('test', 'key').toString();
		// console.log(encrypt)

		// // 복호화
		// const bytes  = cryptoJs.AES.decrypt(encrypt, 'key');
		// const decrypt = bytes.toString(cryptoJs.enc.Utf8);
		// console.log(`복고: ${decrypt}`);
		
}

export {Cryption};