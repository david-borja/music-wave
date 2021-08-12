import { useEffect, useContext } from "react";
import { useLocation } from "wouter";

import UserContext from "../contexts/UserContext";
import auth from "../utils/SpotifyAuth";

export const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}/login&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

const getCredentials = async (spotifyToken, setLocation, setNewCredentials) => {
    try {
        const data = await auth(spotifyToken);
        if (data.accessToken) {
            setNewCredentials({
                spotifyToken: data.accessToken,
                spotifyRefreshToken: data.refreshToken,
            });
            localStorage.setItem("spotifyToken", data.accessToken);
            localStorage.setItem("spotifyrefreshToken", data.refreshToken);
            setLocation("/");
        }
    } catch (e) {
        setLocation("/login");
    }
};

const useLogin = (spotifyToken) => {
    const [, setLocation] = useLocation();
    const { accessToken, setNewCredentials } = useContext(UserContext);
    useEffect(() => {
        if (spotifyToken && !accessToken) {
            getCredentials(spotifyToken, setLocation, setNewCredentials);
        }
    }, [spotifyToken, setNewCredentials, setLocation, accessToken]);
};

export default useLogin;
