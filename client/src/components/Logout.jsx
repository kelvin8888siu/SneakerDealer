import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import Loading from './Loading';

export default function () {
    const {isLoading} = useAuth0();
    const {logout} = useAuth0();

    if (isLoading) {
        return <div className="loading"><Loading /></div>;
      }

  return (
    <div>
        {logout({ returnTo: window.location.origin })}
    </div>
  )
}
