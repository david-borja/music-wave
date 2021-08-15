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
