import express, { Request, Response } from "express";

import { Summarizer } from "./summarizer";

const app = express();
const port = process.env.PORT || 3666;

app.use(express.json());

app.get("/summarize", async (req: Request, res: Response) => {
  try {
    const result = await new Summarizer().summarize(req.body.url);

    res.send(result);
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
