import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 
const supabaseKey = 
class Supabase {
	constructor(){
		this._supabase = createClient(supabaseUrl, supabaseKey)
		console.log('Supabase Instance: ', this._supabase)

	}

	get = async () => {
		const { data, error } = await this._supabase
		.from('members')
		.select('*')

		if(error) console.error('Error fetching :', error);

		return data;

	}
	insert = async (array) => {
		try {
			const { error } = await this._supabase
			.from('members')
			.insert(array);

			return error;
		} catch (error) {
			console.log(error);
			return null;
		}

	}
}


const loginProc = async () => {
	const userId = document.getElementById('userId').value;
	const userPw = document.getElementById('userPw').value;
	console.log('hello %s %s',userId, userPw);

	// const { error } = await _supabase
	// .from('members')
	// .insert({ user_id: userId, user_pw : userPw })

const { data, error } = await _supabase
.from('members')
.select('*')

if(error) console.error('Error fetching :', error);

console.log(data)

}

export { Supabase };
