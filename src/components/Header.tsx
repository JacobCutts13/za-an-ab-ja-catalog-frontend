import { useState, useEffect } from "react";
import { baseURL } from "../utils/urls";
import { iUserData } from "../Interface";
import { Link } from "react-router-dom";
import PopUpPost from "./PopUpPost";
import { emptyUserData } from "../utils/emptyUserData";

interface Props {
  loggedIn: iUserData;
  setLoggedIn: React.Dispatch<React.SetStateAction<iUserData>>;
  togglePostRefresh: boolean;
  setTogglePostRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header(props: Props): JSX.Element {
  const [users, setUsers] = useState<iUserData[]>([]);

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
    <div className="all">
    <div className="header">
      <div className="select-sign-in">
      <h1>Academy Build Recommendations</h1>
        <Link to="/">Home</Link>
        {props.loggedIn.name !== "" && (
          <>
          
            {" "}
            <h3>Logged in as {props.loggedIn.name}</h3>
            <button onClick={() => props.setLoggedIn(emptyUserData)}>
              Log Out
            </button>{" "}
            <Link to="/saved">View Saved</Link>
          </>
        )}{" "}
        {props.loggedIn.name === "" && (
          <select
            value={props.loggedIn.name}
            onChange={(e) => {
              props.setLoggedIn(filterUsersByName(e.target.value));
            }}
          >
            <option>Select user</option>
            {users.map((userName) => (
              <option key={userName.user_id}>{userName.name}</option>
            ))}
          </select>
        )}
      </div>
      <br/>
      {props.loggedIn.user_id !== -1 && (
        <PopUpPost
          user_id={props.loggedIn.user_id}
          togglePostRefresh={props.togglePostRefresh}
          setTogglePostRefresh={props.setTogglePostRefresh}
        />
      )}
    </div>
    </div>
  );
}
