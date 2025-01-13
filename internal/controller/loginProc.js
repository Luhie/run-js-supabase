import { Supabase } from '../service/supabase.js';
import { User } from '../service/user-model.js';

console.group('Executing LoginProc');
export async function loginProc(object) {

    const user = new User(object);
    const userData = await user.get();


    try{
      const db = new Supabase('members');

      const result = await db.get({"member_id":userData.member_id});

      if(result.state == 'error' && result.error.code == "PGRST116") return 0;
      else {
        if(result.member_id == userData.member_id) {
          const checkPassword = await user.comparePassword(result.member_pw);
          if(checkPassword) return 1;
          else return 2;
        }
      }

    }catch(e) {
      console.log(e)
      throw new Error(e);

    }


}

console.groupEnd();
