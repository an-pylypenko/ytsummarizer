import express, { Request, Response } from "express";
import cors from "cors";

import { Summarizer } from "./summarizer";
import { SummarizeError, SummarizeDto, SummarizeResponse } from "../../shared";

const app = express();
const port = process.env.PORT || 3666;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.post(
  "/summarize",
  async (
    req: Request<{}, SummarizeResponse, SummarizeDto>,
    res: Response<SummarizeResponse | SummarizeError>
  ) => {
    try {
      const result = await new Summarizer().summarize(req.body.url);

      res.send(result);
    } catch (e) {
      const { message } = e as Error;
      res.status(400).send({ message });
    }
  }
);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
