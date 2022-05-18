import { useState, useEffect } from "react";
import { baseURL } from "../utils/urls";
import { iUserData } from "../Interface";
import { Link } from "react-router-dom";
import PopUpPost from "./PopUpPost";
import { emptyUserData } from "../utils/emptyUserData";

interface Props {
  loggedIn: iUserData;
  setLoggedIn: React.Dispatch<React.SetStateAction<iUserData>>;
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
    
    console.log({users})
    return userObject;
  };

  return (
    <div className="header">
      <h1>Recommendations Navbar</h1>
      <div className="select-sign-in">
        {props.loggedIn.name !== "" && (
          <>
            {" "}
            <h3>Logged in as {props.loggedIn.name}</h3>
            <button onClick={() => props.setLoggedIn(emptyUserData)}>
              Log Out
            </button>{" "}
            <Link to="/saved">Saved</Link>
          </>
        )}{" "}
        {props.loggedIn.name === "" && (
          <select
            onChange={(e) => {
              props.setLoggedIn(filterUsersByName(e.target.value))
              console.log("from Header", filterUsersByName(e.target.value))
              console.log(props.loggedIn.saved_recommendations)
            }
            }
          >
            <option>Select user</option>
            {users.map((userName) => (
              <option key={userName.user_id}>{userName.name}</option>
            ))}
          </select>
        )}
      </div>
      {props.loggedIn.user_id !== -1 && (
        <PopUpPost user_id={props.loggedIn.user_id} />
      )}
      {/* {console.log(loggedIn)} */}
    </div>
  );
}
