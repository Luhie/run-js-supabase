import { Supabase } from '../service/supabase.js';
import { User } from '../service/user-model.js';

console.group('Executing joinProc');

export async function joinProc(object) {
  try {
    const user = new User(object);
    const userData = await user.getInfo();

    if (!userData) {
      throw new Error('User data is invalid or undefined.');
    }

    const db = new Supabase('members');
    const result = await db.insert(userData);

    if (!result) {
      throw new Error('Failed to insert value into the database.');
    } else if (result.code === 23505) {
      throw new Error('ID already exists.');
    }

    console.log('Inserted Record ID Type:', typeof result.id);
    console.log('Inserted Record ID:', result.id);

	// 성공적으로 삽입된 경우 result를 반환
    return { success: true, data: result };
  } catch (error) {
    console.error('An error occurred during the join process:', error);
    throw error;
  }
}

console.groupEnd();
