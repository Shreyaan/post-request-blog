// api/post-url.ts

import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const body = req.body || "{}";
    const name = body.name || "John Doe";
    const protocol = "https";
    const url = `${protocol}://${
      req.headers.host
    }/api/get?name=${encodeURIComponent(name)}`;
    res.status(200).send(url);
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
