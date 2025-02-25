import axios from "axios";
// const accessToken = req.headers.authorization?.split(" ")[1];
export const githubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `token ${process.env.PERSONAL_ACCESS_TOKEN}`,
  },
});
