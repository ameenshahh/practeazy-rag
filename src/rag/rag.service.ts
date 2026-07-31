import { Injectable } from '@nestjs/common';

import { PdfLoaderService } from './ingestion/pdf-loader.service';
import { QuestionParserService } from './ingestion/question-parser.service';
import { EmbeddingService } from './embeddings/embedding.service';
import { VectorSearchService } from './retrieval/vector-search.service';

import {
  EmbeddedQuestion,
} from './types/question.types';

@Injectable()
export class RagService {

  private questions: EmbeddedQuestion[] = [];

  constructor(
    private readonly pdfLoaderService: PdfLoaderService,
    private readonly questionParserService: QuestionParserService,
    private readonly embeddingService: EmbeddingService,
    private readonly vectorSearchService: VectorSearchService,
  ) {}

  async ingestPdf(filePath: string) {

    // 1. Extract PDF text
    const text =
      await this.pdfLoaderService.extractText(
        filePath,
      );

    // 2. Extract individual questions
    const parsedQuestions =
      this.questionParserService.parse(text);

    // 3. Generate embedding for every question
    const embeddedQuestions: EmbeddedQuestion[] =
      [];

    for (const question of parsedQuestions) {

      const embedding =
        await this.embeddingService.embed(
          question.content,
        );

      embeddedQuestions.push({
        ...question,
        embedding,
      });
    }

    // temporary in-memory storage
    this.questions = embeddedQuestions;

    return {
      questionsProcessed:
        embeddedQuestions.length,
    };
  }

  async search(
    query: string,
    limit = 5,
  ) {

    if (this.questions.length === 0) {
      throw new Error(
        'No questions have been ingested',
      );
    }

    return this.vectorSearchService.search(
      query,
      this.questions,
      limit,
    );
  }
}