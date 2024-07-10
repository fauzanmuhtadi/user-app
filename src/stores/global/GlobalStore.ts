import { action, makeAutoObservable, observable } from "mobx";

class GlobalStore {
  modalConfirmation: boolean = false;

  constructor() {
    makeAutoObservable(this, {
      modalConfirmation: observable,
      setModalConfirmation: action,
    });
  }

  setModalConfirmation(value: boolean) {
    this.modalConfirmation = value;
  }
}

const globalStore = new GlobalStore();
export default globalStore;
