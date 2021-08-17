import React from "react";

import { useAuthenticatedFetch } from "./useAuthenticatedFetch";

import UserContext from "../contexts/UserContext";

const USER_PROFILE_URL = "me";

export const useUserProfile = () => {
  const { accessToken, setNewProfile } = React.useContext(UserContext);
  const { fetchWithAuth } = useAuthenticatedFetch();

  React.useEffect(() => {
    if (accessToken) {
      fetchWithAuth(USER_PROFILE_URL)
        .then((data) => {
          console.log(data);
          setNewProfile(data);
        })
        .catch((err) => console.log(err));
    }
  }, [accessToken]);
};

export default useUserProfile;
