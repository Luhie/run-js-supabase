import { Supabase } from '../service/supabase.js';
import { User } from '../service/user-model.js';

console.group('hello Im joinProc');

async function joinProc(object) {
    try {
        const user = new User(object);
        const userData = await user.getUser();

        if (!userData) {
            console.error('User data is invalid or undefined.');
            return;
        }

        const db = new Supabase('members');
        const result = await db.insert(userData);

        if (!result) {
            console.error('Failed to insert value into the database.');
            return;
        }

        console.log('Inserted Record ID Type:', typeof result.id);
        console.log('Inserted Record ID:', result.id);
    } catch (error) {
        console.error('An error occurred during the join process:', error);
    }
}

export { joinProc };

console.groupEnd('hello Im joinProc');
