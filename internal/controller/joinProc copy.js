import { Supabase } from '../service/supabase.js';
import { User } from '../service/user-model.js';

console.group('hello Im joinProc');

function joinProc(object){
	const user = new User(object)
	user.getUser().then((result) => {
		const db = new Supabase('members');
		db.insert(result)
		.then((result) => {
			if(result == null) console.log('Fail Insert Value')
			console.log(typeof(result.id));
			console.log((result.id));
		})

	});

}
export {joinProc }

console.groupEnd('hello Im joinProc');