import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';


class Supabase {
	static _instance = null;
	_supabase = null;
	constructor(){
		if(Supabase._instance) Supabase._instance;
		this.init();
	}

	async init (){
		if(!this._supabase){
			try{
				const { supabaseUrl,supabaseKey } = await this.#getConf();
				this._supabase = createClient(supabaseUrl, supabaseKey)
				console.log('Supabase Instance: ', this._supabase)
			} catch (error) {
				console.error('Supabase init error: ',error);

			}

		}
	}
	#getConf = async () => {
		const response = await fetch("./.config/dbconf.json");
		const obj = await response.json();

		if (!response.ok) {
			throw new Error('Failed to load config file');
		}	
		// fetch("./.config/dbconf.json")
		// .then(res => res.json())
		// .then(obj => {
		// 	const supabaseUrl = obj.SUPABASE_URL;
		// 	const supabaseKey = obj.SUPABASE_KEY;
		// 	return {supabaseUrl, supabaseKey};
		// })

		 return { supabaseUrl: obj.SUPABASE_URL, supabaseKey: obj.SUPABASE_KEY };
	}

	get = async () => {
		const { data, error } = await this._supabase
		.from('members')
		.select('*')

		if(error) console.error('Error fetching :', error);

		return data;

	}
	insert = async (array) => {
		this.check();
		try {
			const { data, error } = await this._supabase
			.from('members')
			.insert(array);

			if (error) console.error('Fail Insert',error);
			else console.log('Insert data: ',data);
			return error;
		} catch (error) {
			console.log(error);
			return null;
		}

	}
	check = async () => {
		if(!this._supabase) {
			console.error('Supabase client is not initialized');
			await this.init();
		}
	}
}

export { Supabase };
