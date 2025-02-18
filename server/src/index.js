"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const summarizer_1 = require("./summarizer");
const app = (0, express_1.default)();
const port = process.env.PORT || 3666;
app.use(express_1.default.json());
app.get("/summarize", async (req, res) => {
    try {
        const result = await new summarizer_1.Summarizer().summarize(req.body.url);
        res.send(result);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
