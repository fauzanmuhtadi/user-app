import { render, screen, fireEvent } from "@testing-library/react";
import { Provider as MobXProvider } from "mobx-react";
import App from "./App";
import rootStore from "./stores";

describe("App Component", () => {
  let testUsers = [
    { id: 1, name: "John Doe", username: "johndoe", email: "john.doe@example.com" },
    { id: 2, name: "Jane Doe", username: "janedoe", email: "jane.doe@example.com" },
  ];

  beforeEach(() => {
    rootStore.userStore.setUserList([...testUsers]);
  });

  test("renders table headers", () => {
    render(<App />);

    const headers = screen.getAllByRole("columnheader");
    expect(headers.length).toBe(4);
    expect(headers[0]).toHaveTextContent("Name");
    expect(headers[1]).toHaveTextContent("Username");
    expect(headers[2]).toHaveTextContent("Email");
    expect(headers[3]).toHaveTextContent("Actions");
  });

  test("opens modal when Add User button is clicked", () => {
    render(<App />);

    const addUserButton = screen.getByText("Add User");
    fireEvent.click(addUserButton);

    const modalTitle = screen.getByText("Add New User");
    expect(modalTitle).toBeInTheDocument();
  });

  test("adds new user to MobX store", () => {
    render(
      <MobXProvider store={rootStore}>
        <App />
      </MobXProvider>,
    );

    const addUserButton = screen.getByText("Add User");
    fireEvent.click(addUserButton);

    const nameInput = screen.getByAltText("inputName");
    const usernameInput = screen.getByAltText("inputUsername");
    const emailInput = screen.getByAltText("inputEmail");
    const saveButton = screen.getByText("Save");

    fireEvent.change(nameInput, { target: { value: "New User" } });
    fireEvent.change(usernameInput, { target: { value: "newuser" } });
    fireEvent.change(emailInput, { target: { value: "new.user@example.com" } });

    fireEvent.click(saveButton);

    const usersAfterAdd = rootStore.userStore.userList;
    const newUser = usersAfterAdd.find((user: any) => user.username === "newuser" && user.email === "new.user@example.com");
    expect(newUser).toBeDefined();
  });
});
