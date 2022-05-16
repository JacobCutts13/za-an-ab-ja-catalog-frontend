import { useState, useEffect } from "react";
import { baseURL } from "../utils/urls";
import { iUserData } from "../Interface";
import axios from "axios";

export default function Header(): JSX.Element {

  const[users, setUsers] = useState<iUserData[]>([])
  
  useEffect(() => {
    const getUserNames = async() => {
      const response = await fetch(baseURL + "users" );
      const jsonBody: iUserData[] = await response.json();
      setUsers(jsonBody);
    }
    getUserNames()
  }, [])

  return (
    <div className="header">
      <h1>Recommendations Navbar</h1>
      <div className="select-sign-in">
      <select >
        <option>Select user</option>
        {users.map((userName) => <option key={userName.user_id}>{userName.name}</option>)}
      </select>
      </div>
    </div>
  );
}
