import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { JsonOutputParser } from "@langchain/core/output_parsers";

import { SummarizeResponse } from "../../shared";

export class Summarizer {
  textSplitter: RecursiveCharacterTextSplitter;
  llm: any;

  combinePromptTemplate = `Create a detailed summary of the YouTube video based on these transcript:
        "{context}"
        
        Please structure the summary as follows:
        1. Main Topic/Theme
        2. Key Points
        3. Conclusions/Takeaways
        
        Answer as a valid JSON that matches the given schema: \`\`\`json\n{schema}\n\`\`\`. Make sure to wrap the answer in \`\`\`json and \`\`\` tags`;

  constructor() {
    this.textSplitter = new RecursiveCharacterTextSplitter({
      chunkOverlap: 1000,
      chunkSize: 10000,
    });

    this.llm = new ChatOpenAI({ model: "gpt-4o", temperature: 0.4 });
  }

  public async summarize(url: string): Promise<SummarizeResponse> {
    console.log("start processing");
    const transcript = await YoutubeLoader.createFromUrl(url).load();

    console.log("transcript is obtained");

    const chain = await createStuffDocumentsChain({
      llm: this.llm,
      outputParser: new JsonOutputParser(),
      prompt: PromptTemplate.fromTemplate(this.combinePromptTemplate),
    });

    console.log("LLM is accessible");
    console.log("chain is built");

    return await chain.invoke({
      context: transcript,
      schema: `topic: "string", keyPoints: "string[]", conclusion: "string"`,
    });
  }
}
