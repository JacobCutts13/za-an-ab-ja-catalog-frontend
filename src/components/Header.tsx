import { useState, useEffect } from "react";
import { baseURL } from "../utils/urls";
import { iUserData } from "../Interface";
import axios from "axios";

export default function Header(): JSX.Element {
  const emptyUserData = {
    name: "",
    user_id: -1,
    is_faculty: false,
    saved_recommendations: [],
  };

  const [users, setUsers] = useState<iUserData[]>([]);
  const [loggedIn, setLoggedIn] = useState<iUserData>(emptyUserData);

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(baseURL + "users");
      const jsonBody: iUserData[] = await response.json();
      setUsers(jsonBody);
    };
    getUsers();
  }, []);

  const filterUsersByName = (name: string): iUserData => {
    const userObject = users.find((user) => user.name === name);
    if (userObject === undefined) {
      return emptyUserData;
    }
    return userObject;
  };

  return (
    <div className="header">
      <h1>Recommendations Navbar</h1>
      <div className="select-sign-in">
        {loggedIn.name !== "" && (
          <>
            {" "}
            <h3>Logged in as {loggedIn.name}</h3>
            <button onClick={() => setLoggedIn(emptyUserData)}>
              Log Out
            </button>{" "}
          </>
        )}{" "}
        {loggedIn.name === "" && (
          <select
            onChange={(e) => setLoggedIn(filterUsersByName(e.target.value))}
          >
            <option>Select user</option>
            {users.map((userName) => (
              <option key={userName.user_id}>{userName.name}</option>
            ))}
          </select>
        )}
      </div>

      {console.log(loggedIn)}
    </div>
  );
}
