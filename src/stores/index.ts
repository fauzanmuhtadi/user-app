import UserStore from "./user/UserStore";
import GlobalStore from "./global/GlobalStore";

class RootStore {
  userStore = UserStore;
  globalStore = GlobalStore;
}

const rootStore = new RootStore();

export const userStore = rootStore.userStore;
export const globalStore = rootStore.globalStore;
export default rootStore;
