"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Summarizer = void 0;
const youtube_1 = require("@langchain/community/document_loaders/web/youtube");
const textsplitters_1 = require("@langchain/textsplitters");
const openai_1 = require("@langchain/openai");
const prompts_1 = require("@langchain/core/prompts");
const combine_documents_1 = require("langchain/chains/combine_documents");
const output_parsers_1 = require("@langchain/core/output_parsers");
class Summarizer {
    constructor() {
        this.combinePromptTemplate = `Create a detailed summary of the YouTube video based on these transcript:
        "{context}"
        
        Please structure the summary as follows:
        1. Main Topic/Theme
        2. Key Points
        3. Conclusions/Takeaways
        
        Answer as a valid JSON that matches the given schema: \`\`\`json\n{schema}\n\`\`\`. Make sure to wrap the answer in \`\`\`json and \`\`\` tags`;
        this.textSplitter = new textsplitters_1.RecursiveCharacterTextSplitter({
            chunkOverlap: 1000,
            chunkSize: 10000,
        });
        this.llm = new openai_1.ChatOpenAI({ model: "gpt-3.5-turbo", temperature: 0.4 });
    }
    async summarize(url) {
        const transcript = await youtube_1.YoutubeLoader.createFromUrl(url).load();
        const chain = await (0, combine_documents_1.createStuffDocumentsChain)({
            llm: this.llm,
            outputParser: new output_parsers_1.JsonOutputParser(),
            prompt: prompts_1.PromptTemplate.fromTemplate(this.combinePromptTemplate),
        });
        return await chain.invoke({
            context: transcript,
            schema: `topic: "string", keyPoints: "string[]", conclusion: "string"`,
        });
    }
}
exports.Summarizer = Summarizer;
