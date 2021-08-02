const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=fa6bc7992e274e30a0eef18cc2e2805d&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

const LoginPage = () => {
  return (
    <div>
      <a href={AUTH_URL}>Login With Spotify</a>
    </div>
  );
};
export default LoginPage;
