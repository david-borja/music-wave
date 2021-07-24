export const requestAccessToken = async () => {
  // After my last commit where I couldn't access
  // the variables from my .env file, I tried restarting the server, and it seems that worked.

  // Now I can access what I have in the .env file through process.env but I don't really understand why it works, because:
  // -I did not install dotenv
  // -Dotenv is supposed to work only on the server, and here I'm accessing environment variables from the front
  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      // "Content-Type" must have quotes
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(
        `${process.env.REACT_APP_SPOTIFY_CLIENT_ID}:${process.env.REACT_APP_SPOTIFY_CLIENT_SECRET}`
      )}`,
      // "btoa" converts a binary data string to base64-encoded ASCII string. Authorization parameter must match this format for the Spotify API
    },
    body: "grant_type=client_credentials",
  });

  const data = await result.json();
  console.log(data);
  return data.access_token;
};
