// Here we are gonna store the three things we get back from our server after we Login
import { useState, useEffect } from "react";

import axios from "axios";

const useAuth = (authCode) => {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:5000/login", {
        code: authCode,
      })
      .then((res) => {
        console.log(res.data);
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        // setExpiresIn(61); just to check if it triggered the refresh every second

        // pushes the root url into history, so it clears the authCode from the url
        window.history.pushState({}, null, "/");
      })
      .catch((error) => {
        console.log(error);
        // redirects the user to the homepage
        window.location = "/";
      });
  }, [authCode]);

  useEffect(() => {
    // This prevents the effect to run before having a refreshToken and expiresIn. Or, in other words, this condition prevents this effect from running if the previous effect hasn't finished running
    if (!refreshToken || !expiresIn) return;

    // Our refreshToken and expiresIn are technically never refreshing. So the setTimeout is only being run once. If we want to run the refresh every time refreshToken or expiresIn change, we have to use setInterval instead of setTimeout.

    // It makes sure this refresh only runs right before our refreshToken expires (for example, one min before)
    const interval = setInterval(() => {
      axios
        .post("http://localhost:5000/refresh", {
          refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
          // setExpiresIn(61); just to check if it triggered the refresh every second
        })
        .catch(() => {
          // redirects the user to the homepage
          window.location = "/";
        });
      // Subtracts 60 seconds from expiresIn, and then converts seconds to miliseconds
    }, (expiresIn - 60) * 1000);

    // It clears the interval if there's some error. In other words, if for some reason the refreshToken or expiresIn changes before an actual refresh, it prevents to make a refresh with an incorrect refreshToken
    return () => clearInterval(interval);

    // whenever refreshToken or expiresIn changes
  }, [refreshToken, expiresIn]);

  return accessToken;
};

export default useAuth;
