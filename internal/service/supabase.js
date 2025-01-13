import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

console.group('Supabase에 오신걸 환영합니다')

class Supabase {
  static _supabase = null;

  constructor(tableName) {
    this.tableName = tableName;
    if (!Supabase._supabase) this.init();
  }

  // 비동기 초기화 함수
  async init() {
    try {
      const { supabaseUrl, supabaseKey } = await this.#getConf();

      // Supabase 클라이언트 및 인증 클라이언트 초기화
      if (!Supabase._supabase) {
        Supabase._supabase = createClient(supabaseUrl, supabaseKey);
      }

      console.log("Supabase Instance: ", Supabase._supabase);
    } catch (error) {
      console.error("Supabase init error: ", error);
	  // 대체 로직을 추가해라? 로컬 데이터베이스를 사용하는 등????
    }
  }

  // 비공개 메서드로 설정파일 가져오기
  #getConf = async () => {
    const url = this.#makePath(".config/dbconf.json");
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to load config file");
      }
      const obj = await response.json();
      return { supabaseUrl: obj.SUPABASE_URL, supabaseKey: obj.SUPABASE_KEY };
    } catch (error) {
      console.error("Error loading config: ", error);
      throw error;
    }
  };

  // 데이터를 가져오는 메서드
  get = async (where='', which='') => {
    const key = Object.keys(where);
    const value = where[key];

    await this.check();
    console.log(this.tableName);
    try {
      const { data, error } = await Supabase._supabase
        .from(this.tableName)
        .select(which)
        .eq(key,value)
        .limit(1)
        .single();

        if(error) {
          console.error("Fail Select: ", error)
          return {"state": 'error' ,"error": error };
        }else{
          return data;
        }

    } catch(e) {
      console.log("Select Error", e);
      throw new Error(e);
    }
  };


  // 데이터를 삽입하는 메서드
  insert = async (array) => {
    console.log('%c this is supabase', 'color:red; font-size:14px;font-weight:bold;');
    console.log(array)
    await this.check();

    try {
      const { data, error } = await Supabase._supabase
        .from(this.tableName)
        .insert(array)
        .select('id')
        .single();
      if (error) {
        // PGRST204 지정된 열 못찾음 // 23505 unique key 겹침 이미 있음 // 42703 가져오려는 열의 이름이 없음 // 23502 null column
        console.error("Fail Insert: ", error);
        throw new Error(error);
      } else {
        console.log("Insert data: ", data);
        return data;
      }
    } catch (error) {
      console.error("Insert error: ", error);
      return null;
    }
  };

  // 클라이언트 초기화 여부 확인
  check = async () => {
    if (!Supabase._supabase) {
      console.error("Supabase client is not initialized");
      await this.init();
    }
  };


  #makePath = (dir) => {
    const currentUrl = window.location.href;

    const url = new URL(currentUrl);
    url.pathname = '/.__./'+dir;
    return url.href
  } 
}

export { Supabase };

console.groupEnd('Supabase에 오신걸 환영합니다');

