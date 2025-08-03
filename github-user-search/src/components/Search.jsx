import React, { useState } from "react";
import fetchUserData from "../services/githubService";

const Search = () => {
  const [username, setUsername] = useState("");
  const [userLocation, setUserLocation] = useState(""); // <-- Input state
  const [minimumRepositories, setMinimumRepositories] = useState(""); // <-- Input state
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      setUsers([]);
      setError("");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const userData = await fetchUserData(trimmedUsername, userLocation, minimumRepositories);
      setUsers(userData.items);

          console.log("Raw data from GitHub API:", userData);
    } catch (err) {
      console.error("Looks like we cant find the user");
      setUsers([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} style={{ padding: "20px" }}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)} // <-- Track input
        placeholder="Search for a GitHub user..."
        style={{ width: "100%", padding: "10px", fontSize: "16px" }}
      />

      <input
        type="text"
        value={userLocation}
        onChange={(e) => setUserLocation(e.target.value)}
        placeholder="Enter user location (optional)"
        style={{ width: "100%", padding: "10px", fontSize: "16px", marginTop: "10px" }}
      />

      <input
        type="number"
        value={minimumRepositories}
        onChange={(e) => setMinimumRepositories(e.target.value)}
        placeholder="Enter minimum repositories (optional)"
        style={{ width: "100%", padding: "10px", fontSize: "16px", marginTop: "10px" }}
      />
      <br />

      <button
        type="button"
        onClick={handleSearch} // <-- No need to pass event
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          marginLeft: "10px",
          cursor: "pointer",
        }}
      >
        Search
      </button>

      <h2>Search Results:</h2>

      <ul id="search-results">
        {loading && <li>Loading...</li>}
        {error && <li style={{ color: "red" }}>{error}</li>}
        {!loading &&
          !error &&
          users.length > 0 &&
          users.map((user, index) => (
            <li key={`${user.id}-${index}`}>
              <img
                src={user.avatar_url}
                alt={user.login}
                width={32}
                style={{ borderRadius: "50%", marginRight: "10px" }}
              />
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                {user.login}
              </a>
            </li>
          ))}
      </ul>
    </form>
  );
};

export default Search;