import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

class Supabase {
  static _instance = null;
  _supabase = null;

  constructor() {
    if (Supabase._instance) return Supabase._instance; // 이미 인스턴스가 있으면 반환
    this.init(); // 비동기 초기화 함수 호출
    Supabase._instance = this; // 싱글톤 패턴 유지
  }

  // init 함수는 비동기적으로 클라이언트를 초기화
  async init() {
    if (!this._supabase) {
      try {
        const { supabaseUrl, supabaseKey } = await this.#getConf();
        this._supabase = createClient(supabaseUrl, supabaseKey);
        console.log('Supabase Instance: ', this._supabase);
      } catch (error) {
        console.error('Supabase init error: ', error);
      }
    }
  }

  // 비공개 메서드로 설정파일 가져오기
  #getConf = async () => {
    const response = await fetch("./.config/dbconf.json");
    const obj = await response.json();

    if (!response.ok) {
      throw new Error('Failed to load config file');
    }

    return { supabaseUrl: obj.SUPABASE_URL, supabaseKey: obj.SUPABASE_KEY };
  };

  // 데이터를 가져오는 메서드
  get = async () => {
    await this.check(); // 클라이언트가 초기화 되었는지 확인
    const { data, error } = await this._supabase
      .from('members')
      .select('*');

    if (error) console.error('Error fetching: ', error);
    return data;
  };

  // 데이터를 삽입하는 메서드
  insert = async (array) => {
	console.group('insert');
    await this.check(); // 클라이언트가 초기화 되었는지 확인
    try {
      const { data, error } = await this._supabase
        .from('members')
        .insert(array);

      if (error) console.error('Fail Insert', error);
      else console.log('Insert data: ', data);
      return error;
    } catch (error) {
      console.log('insert error: '+error);
      return null;
    }
	console.groupEnd('insert');
  };

  // 클라이언트 초기화 여부 확인
  check = async () => {
    if (!this._supabase) {
      console.error('Supabase client is not initialized');
    }
  };
}

export { Supabase };
