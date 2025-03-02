import NextAuth from "next-auth";
import { authOptions } from "./authoptions";

export default NextAuth.default(authOptions);
