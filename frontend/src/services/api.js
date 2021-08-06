export const search = async ({ qry, accessToken }) => {
  try {
    console.log({ qry });
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

export const getUserPlaylists = async ({ accessToken }) => {
  try {
    const result = await fetch(
      `https://api.spotify.com/v1/me/playlists?limit=50`,
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
