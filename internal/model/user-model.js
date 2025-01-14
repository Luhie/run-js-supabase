
console.group("%c INSIDE User Model", "background:yellow");

export default class User {
  constructor() {
    this.userInfo = [];
  }

  addUser()

  get() {
    const keyMapping = {
      user_id: "userId",
      user_name: "userName"
    };
    const filteredUserInfo = Object.entries(this.userInfo).reduce((acc, [key, value]) => {
        if (value !== null && value !== undefined && value !== "" && value !== 0) {
          const newKey = keyMapping[key] || key;
          acc[newKey] = value;
        }
        return acc;
      }, {});
    return filteredUserInfo;
  }
}

console.groupEnd();