import { createHash } from "crypto";

export const createSha256Hash = (input) =>
  createHash("sha256").update(input).digest("hex");
