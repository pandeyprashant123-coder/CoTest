import NextAuth from "next-auth";
import { authOptions } from "./authoptions.js";

export default NextAuth.default(authOptions);
