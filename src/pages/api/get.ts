import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";
const pipe = promisify(pipeline);
const __dirname = path.resolve();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const filePath = path.resolve(__dirname, "src/pages/api/file.zip");

    const readStream = fs.createReadStream(filePath);

    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", "attachment; filename=file.zip");

    await pipe(readStream, res);
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
