export interface SummarizeDto {
  url: string;
}

export interface SummarizeResponse {
  topic: string;
  keyPoints: string[];
  conclusion: string;
}

export interface SummarizeError {
  message: string;
}
