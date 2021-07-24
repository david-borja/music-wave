export const requestAccessToken = async () => {
  // I thought I could install dotenv and create an .env file to store these variables, but
  // dotenv only works server-side.

  const clientId = "notmyactualspotifyclientid";
  const clientSecret = "notmyactualspotifyclientsecret";

  // We could use webpack to create some sort of environment for dotenv to store the variables, as explained in this article (Method 2) https://trekinbami.medium.com/using-environment-variables-in-react-6b0a99d83cf5

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      // "Content-Type" must have quotes
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      // "btoa" converts a binary data string to base64-encoded ASCII string. Authorization parameter must match this format for the Spotify API
    },
    body: "grant_type=client_credentials",
  });

  const data = await result.json();
  console.log(data);
  return data.access_token;
};
