import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

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
    }
  }

  // 비공개 메서드로 설정파일 가져오기
  #getConf = async () => {
    try {
      const response = await fetch("./.config/dbconf.json");
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
  get = async (array = '', where='') => {
	const key = Object.keys(where);
	const value = where[key];
    await this.check(); // 클라이언트 초기화 확인
    try {
      const { data, error } = await Supabase._supabase
        .from(this.tableName)
        .select(array)
		.eq(key,value)
		.limit(1);

      if (error) {
        console.error("Error fetching: ", error);
        return null;
      }
      return data;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return null;
    }
  };


  // 데이터를 삽입하는 메서드
  insert = async (array) => {
    await this.check();

    try {
      const { data, error } = await Supabase._supabase
        .from(this.tableName)
        .insert(array);
      if (error) {
        console.error("Fail Insert: ", error);
      } else {
        console.log("Insert data: ", data);
      }
      return error;
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
}

export { Supabase };
