// services/githubService.js
import axios from 'axios';

const fetchUserData = async (username, location, minRepos) => {
  let query = username;

  if (location && location.trim()) {
    query += `+location:${location.trim()}`;
  }

  if (minRepos && minRepos.trim()) {
    query += `+repos:>=${minRepos.trim()}`;
  }


  try {
    const response = await axios.get(`https://api.github.com/search/users?q=${query}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};


export default fetchUserData;