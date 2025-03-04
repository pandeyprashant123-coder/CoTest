import { language } from "tree-sitter-javascript";
import { z } from "zod";

export const repoSchema = z.object({
  link: z
    .string()
    .url("Invalid URL format")
    .startsWith("https://github.com/", "Only GitHub URLs are allowed"),
});
