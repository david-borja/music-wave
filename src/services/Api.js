export const requestAccessToken = async () => {
  try {
    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(
          `${process.env.REACT_APP_SPOTIFY_CLIENT_ID}:${process.env.REACT_APP_SPOTIFY_CLIENT_SECRET}`
        )}`,
      },
      body: "grant_type=client_credentials",
    });

    const data = await result.json();
    console.log(data);
    return data.access_token;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const search = async ({ qry, accessToken }) => {
  try {
    const result = await fetch(
      `https://api.spotify.com/v1/search?q=${qry}&type=album,artist,track`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await result.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
