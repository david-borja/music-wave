// Here we are gonna store the three things we get back from our server after we Login
import { useState, useEffect, useContext } from "react";
import UserContext from "./contexts/UserContext";

const useAuth = ({ authCode }) => {
  // Now accessToken and setAccessToken refer to the global state that we get from consuming UserContext
  const { accessToken, setAccessToken } = useContext(UserContext);

  // const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [expiresIn, setExpiresIn] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        // Accept header specifies what media types are acceptable as a response
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: authCode }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        // setExpiresIn(61); just to check if it triggered the refresh every second
        // setExpiresIn(61);
        setExpiresIn(data.expiresIn);
        // history.push("/playlists")
        window.history.pushState({}, null, "/");
      })
      .catch((error) => {
        console.log(error);
        // redirects the user to the homepage
        window.location = "/";
      });
  }, [authCode, setAccessToken]);

  useEffect(() => {
    // This prevents the effect to run before having a refreshToken and expiresIn. Or, in other words, this condition prevents this effect from running if the previous effect hasn't finished running
    if (!refreshToken || !expiresIn) return;

    // Our refreshToken and expiresIn are technically never refreshing. So the setTimeout is only being run once. If we want to run the refresh every time refreshToken or expiresIn change, we have to use setInterval instead of setTimeout.

    // It makes sure this refresh only runs right before our accessToken expires (for example, one min before)
    const interval = setInterval(() => {
      fetch("http://localhost:5000/refresh", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setAccessToken(data.accessToken);
          // setExpiresIn(61); just to check if it triggered the refresh every second
          // setExpiresIn(61);
          setExpiresIn(data.expiresIn);
        })
        .catch((error) => {
          console.log(error);
          // redirects the user to the homepage
          window.location = "/";
        });

      // Subtracts 60 seconds from expiresIn, and then converts seconds to miliseconds
    }, (expiresIn - 60) * 1000);

    // It clears the interval if there's some error. In other words, if for some reason the refreshToken or expiresIn changes before an actual refresh, it prevents to make a refresh with an incorrect refreshToken
    return () => clearInterval(interval);

    // whenever refreshToken or expiresIn changes
  }, [refreshToken, expiresIn, setAccessToken]);

  return accessToken;
};

export default useAuth;
