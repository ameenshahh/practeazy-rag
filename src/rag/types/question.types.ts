export interface ParsedQuestion {
    questionNumber: number;
    content: string;
  }
  
  export interface EmbeddedQuestion
    extends ParsedQuestion {
    embedding: number[];
  }
  
  export interface SearchResult
    extends ParsedQuestion {
    similarity: number;
  }