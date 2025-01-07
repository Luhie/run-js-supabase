import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 
const supabaseKey = 

const _supabase = createClient(supabaseUrl, supabaseKey)
	console.log('Supabase Instance: ', _supabase)

	// const { data, error } = await _supabase
	// .from('users')
	// .select('*')

	// if(error) console.error('Error fetching :', error);

	// console.dir(data)

const isnert = async (data) => {
	const { error } = await supabase
	.from('users')
	.insert({ id: 1, name: 'Denmark' })

}