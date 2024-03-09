import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const schema = z.object({
  // ...
});

export default async function signUpHandler(
  req: NextApiRequest,
    // eslint-disable-next-line no-unused-vars
  res: NextApiResponse
) {
  const parsed = schema.parse(req.body);
  console.log(parsed);
} 
