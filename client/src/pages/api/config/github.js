import axios from "axios";
export const githubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `token ${process.env.PERSONAL_ACCESS_TOKEN}`,
  },
});
