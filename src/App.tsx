import { useEffect, useState } from "react";
import rootStore from "./stores/index";
import { observer, Provider as MobXProvider } from "mobx-react";
import { Modal, Table } from "./components/index";
import { globalStore, userStore } from "./stores/index";

const App = observer(() => {
  const picUrl = "https://picsum.photos/200";
  const headers = ["name", "username", "email"];
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [users, setUsers] = useState<any>([]);
  const [selectedUser, setSelectedUser] = useState<any>({});
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [modalDetail, setModalDetail] = useState<boolean>(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        const userList: any = data.map((dataUser: any) => ({
          ...dataUser,
          photoProfile: `https://picsum.photos/id/${dataUser.id}/200/200`,
        }));
        setUsers(userList);
      });
  }, []);

  useEffect(() => {
    if (photoUrl === "") fetch(picUrl).then((res) => setPhotoUrl(res.url));
  }, [photoUrl]);

  useEffect(() => {
    userStore.setUserList(users);
  }, [users]);

  const handleChange = (key: string, event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedUser({
      ...selectedUser,
      [key]: event.target.value,
    });

    if (key === "username") {
      setUsernameError(false);
    } else if (key === "email") {
      setEmailError(false);
    }
  };

  const isUsernameExists = (username: string) => {
    return userStore.userList.some((user: any) => user.username.toLowerCase() === username.toLowerCase());
  };

  const isEmailExists = (email: string) => {
    return userStore.userList.some((user: any) => user.email.toLowerCase() === email.toLowerCase());
  };

  const actUser = (id: number) => {
    if (id === 0) {
      setSelectedUser({
        id,
        photoProfile: photoUrl === "" ? picUrl : photoUrl,
        name: "",
        username: "",
        email: "",
        phone: "",
        website: "",
      });
      setPhotoUrl("");
    } else {
      const userToEdit = users.find((user: any) => user.id === id);
      if (userToEdit) {
        setSelectedUser(userToEdit);
      }
    }
    setModalDetail(true);
  };

  const confirmDetailUser = () => {
    if (!selectedUser.username) {
      setUsernameError(true);
      return;
    } else if (isUsernameExists(selectedUser.username) && selectedUser.id === 0) {
      setUsernameError(true);
      return;
    } else {
      setUsernameError(false);
    }

    if (!selectedUser.email) {
      setEmailError(true);
      return;
    } else if (isEmailExists(selectedUser.email) && selectedUser.id === 0) {
      setEmailError(true);
      return;
    } else {
      setEmailError(false);
    }

    if (selectedUser.id === 0) {
      const newUserId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
      const newUser = { ...selectedUser, id: newUserId };
      setUsers([...users, newUser]);
    } else {
      const updatedUsers = users.map((user: any) => (user.id === selectedUser.id ? selectedUser : user));
      setUsers(updatedUsers);
    }
    setModalDetail(false);
    setSelectedUser({});
  };

  const hideDetailModal = () => {
    setSelectedUser({});
    setUsernameError(false);
    setEmailError(false);
    setModalDetail(false);
  };

  const deleteUser = (id: number) => {
    setSelectedId(id);
    globalStore.setModalConfirmation(true);
  };

  const confirmDeleteUser = () => {
    const updatedUsers = users.filter((user: any) => user.id !== selectedId);
    setUsers(updatedUsers);
    globalStore.setModalConfirmation(false);
  };

  const hideModalConfirmation = () => {
    globalStore.setModalConfirmation(false);
  };

  return (
    <MobXProvider store={rootStore}>
      <div style={{backgroundColor: 'GrayText'}} className="container mx-auto p-4">
        <Modal isOpen={globalStore.modalConfirmation}>
          <h1 className="font-bold text-center text-xl mb-4">Are you sure?</h1>
          <p className="text-center mb-4">Do you want to delete this user?</p>
          <div className="flex justify-center">
            <button className="text-red-600 hover:text-red-900 mr-4" onClick={hideModalConfirmation}>
              No
            </button>
            <button className="text-blue-600 hover:text-blue-900" onClick={confirmDeleteUser}>
              Yes
            </button>
          </div>
        </Modal>
        <Modal isOpen={modalDetail}>
          <h1 className="font-bold text-center text-xl mb-4">{selectedUser.id === 0 ? "Add New" : "Edit"} User</h1>
          <div className="flex justify-center mb-4">
            <img className="rounded-full w-32 h-32 object-cover" src={selectedUser.photoProfile} alt="User Profile" />
          </div>
          <div className="flex mb-4">
            <div className="w-1/2">
              <label className="block mb-2">Name :</label>
              <input
                alt="inputName"
                type="text"
                className="border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={selectedUser.name}
                onChange={(event) => handleChange("name", event)}
              />
            </div>
            <div className="w-1/2 pl-2">
              <label className="block mb-2">Username :</label>
              <input
                alt="inputUsername"
                type="text"
                className={`border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${selectedUser.id === 0 ? "" : "bg-slate-300"} ${
                  usernameError ? "border-red-500" : ""
                }`}
                value={selectedUser.username}
                onChange={(event) => handleChange("username", event)}
                disabled={selectedUser.id !== 0}
              />
              {usernameError && <div className="text-red-500 text-sm mt-1">{isUsernameExists(selectedUser.username) ? "Username already exists" : "Username is required"}</div>}
            </div>
          </div>
          <div className="flex mb-4">
            <div className="w-1/2">
              <label className="block mb-2">Email :</label>
              <input
                alt="inputEmail"
                type="text"
                className={`border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${selectedUser.id === 0 ? "" : "bg-slate-300"} ${
                  emailError ? "border-red-500" : ""
                }`}
                value={selectedUser.email}
                onChange={(event) => handleChange("email", event)}
                disabled={selectedUser.id !== 0}
              />
              {emailError && <div className="text-red-500 text-sm mt-1">{isEmailExists(selectedUser.email) ? "Email already exists" : "Email is required"}</div>}
            </div>
            <div className="w-1/2 pl-2">
              <label className="block mb-2">Phone :</label>
              <input
                alt="inputPhone"
                type="text"
                className="border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={selectedUser.phone}
                onChange={(event) => handleChange("phone", event)}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Website :</label>
            <input
              alt="inputWebsite"
              type="text"
              className="border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={selectedUser.website}
              onChange={(event) => handleChange("website", event)}
            />
          </div>
          <div className="flex justify-center">
            <button className="text-red-600 hover:text-red-900 mr-4" onClick={hideDetailModal}>
              Cancel
            </button>
            <button className="text-blue-600 hover:text-blue-900" onClick={confirmDetailUser}>
              Save
            </button>
          </div>
        </Modal>
        <div className="flex justify-end items-center mb-4">
          <button className="text-blue-600 hover:text-blue-900" onClick={() => actUser(0)}>
            Add User
          </button>
        </div>
        <Table headers={headers} data={users} action={true} handleEdit={actUser} handleDelete={deleteUser} />
      </div>
    </MobXProvider>
  );
});

export default App;
