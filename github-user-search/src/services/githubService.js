// services/githubService.js
import axios from 'axios';

const fetchUserData = async (username, location, minimumRepositories) => {
  let query = username;

  if (location && location.trim()) {
    query += `+location:${location.trim()}`;
  }

  if (minimumRepositories && minimumRepositories.trim()) {
    query += `+repos:>=${minimumRepositories.trim()}`;
  }


  try {
    const response = await axios.get(`https://api.github.com/search/users?q=${query}`);
    return response.data;
  } catch (error) {
    console.error("Error from GitHub:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};


export default fetchUserData;