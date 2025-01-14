const baseUrl = `${window.location.origin}/.__./internal/controller`;
const modulePath = `${baseUrl}/jbrary.js`;

import { Supabase } from '../model/supabase.js';
import User  from '../model/user-model.js';
import Bcrypt from '../model/bcrypt.js';

console.group('Executing joinProc');
/*
데이터를 가져왔다. 유효성 검사는 아니지만 깩쓰하게 처리했다.
그다음에는 이 데이터를 가공해서 넣어야 한다. 어디에? 
user에 넣고 userInfo에 넣어야지.
그러면서 password도 해야하고 
이대로 데이터에 넣는다. 


*/
export async function joinProc(object) {
  try {
    const user = new User(object);
    const userData = await user.get();
    const cleanUser = await loadCleanString(userData);
    const hashedPassword = await getHash(cleanUser.password)
    cleanUser.password = hashedPassword;
    console.log(cleanUser);

    if (!userData) {
      throw new Error('User data is invalid or undefined.');
    }

    const db = new Supabase('members');
    const result = await db.insert(userData);

    return;
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

async function loadCleanString(data){
    const module = await import(modulePath);
    const CleanString = module.default;
    // const { CleanString, function }  = module;
    const cs = new CleanString(data);
    return cs.removeSpace();
}

async function getHash(password) {
  try {
    const bcrypt = new Bcrypt(password);
    return await bcrypt.getHash();
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error;
  }
}
async function comparePassword(hashedPassword) {
  try {
    const bcrypt = new Bcrypt(this.password);
    return await bcrypt.comparePassword(hashedPassword);
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error;
  }
}