/*
* remove space
* restrict special characters
* change to lower case
* prevent tag
* key값 변경 해야하는데 여기서 하는게 맞나 안하는게 맞지. 
*/
import DOMPurify from "https://cdn.jsdelivr.net/npm/dompurify@3.2.3/+esm"

export default class CleanString {
	constructor(data) {
		this.data = data;
	}

	removeSpace() {
		if(typeof this.data === 'string'){
			// 모든 공백 제거
			const noSpaces = this.preventTags(this.data.replace(/\s+/g, ''));
			return noSpaces;
		}else if(typeof this.data === 'object' && Object.keys(this.data).length !== 0){
			return Object.fromEntries(
				Object.entries(this.data).map(([key, value]) => [
					key,
					typeof value === 'string'
					? key === 'userName'
						? this.preventTags(value.replace(/\s+/g, ''))
						: this.preventTags(value.replace(/\s+/g, '').toLowerCase())
					: value
				])
			)
		}
	}

	preventTags(dirtyHTML) {
		if(typeof dirtyHTML === 'string') return DOMPurify.sanitize(dirtyHTML);
	}
}

// class RemoveString {
// 	constructor(data) {
// 		this.data = data;
// 	}

// 	removeString() {
// 		console.log("hello world");
// 	}

// }




// export { CleanString, RemoveString }