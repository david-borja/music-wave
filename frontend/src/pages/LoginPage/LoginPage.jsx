import { authUrl } from "../../hooks/useLogin";
import useLogin from "../../hooks/useLogin";

const LoginPage = () => {
  // moved accessUrlSearchParam into the hook
  useLogin();

  return (
    <div>
      <a href={authUrl}>Login With Spotify</a>
    </div>
  );
};
export default LoginPage;
