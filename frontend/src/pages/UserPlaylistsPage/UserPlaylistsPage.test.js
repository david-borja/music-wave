import { render, screen } from "@testing-library/react";

import UserPlaylistsPage from "./UserPlaylistsPage";

const fakeListOfPlaylists = [
  { name: "Random Playlist 1", id: "37RA0AI9il3lhSIXsKo8XE" },
  { name: "Random Playlist 2", id: "4oEp1Ab4PeqVepxEdJZ0lP" },
];

jest.mock("../../hooks/useAuthenticatedFetch", () => {
  // it has to return the same that the original function returns (an object in this case)
  return {
    useAuthenticatedFetch: () => ({
      loading: false,
      fetchWithAuth: jest.fn(() => Promise.resolve(fakeListOfPlaylists)),
    }),
  };
});

beforeEach(() => {
  render(<UserPlaylistsPage />);
});

describe("when UserPlaylistsPage is mounted", () => {
  it("should display the page title", () => {
    expect(
      screen.getByRole("heading", { name: /userplaylists page/i })
    ).toBeInTheDocument();
  });
});

describe("when userPlaylists are loaded", () => {
  // find methods are async
  it("should display the list of playlists", async () => {
    await screen.findByText(/random playlist 1/i);
  });
});
