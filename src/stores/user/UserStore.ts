import { action, makeAutoObservable, observable } from "mobx";

class UserStore {
  userList: any;

  constructor() {
    makeAutoObservable(this, {
      userList: observable,
      setUserList: action,
    });
  }

  setUserList(value: any) {
    this.userList = value;
  }
}

const userStore = new UserStore();
export default userStore;
