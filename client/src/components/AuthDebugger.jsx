import React, {useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthToken } from "../AuthTokenContext";

export default function AuthDebugger() {
  const {user} = useAuth0();
  const {accessToken } = useAuthToken();
  const {isLoading} = useAuth0();
  const [userInfo, setUserInfo] = useState([])

  function stillLoading(){
    return <div className="loading">Loading...</div>;
  }

  async function getUserInfo(){
    const res = await fetch(`https://dev-x2lg4k5x.us.auth0.com/api/v2/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();
    setUserInfo(data)
  }

useEffect(()=>{
  if (isLoading) {
    stillLoading()
  }
  else {
    getUserInfo()
  }
}, [isLoading])

  return (
    <div>
      <div>
        <p>Access Token:</p>
        <pre>{JSON.stringify(accessToken, null, 2)}</pre>
      </div>
      <div>
        <p>User Info</p>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
      <div>
        <p>User Info 2</p>
        <pre>{JSON.stringify(userInfo, null, 2)}</pre>
      </div>
    </div>
  );
}