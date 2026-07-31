import { Injectable } from '@nestjs/common';

import { PdfLoaderService } from './ingestion/pdf-loader.service';
import { QuestionParserService } from './ingestion/question-parser.service';
import { EmbeddingService } from './embeddings/embedding.service';
import { VectorSearchService } from './retrieval/vector-search.service';

import {
  EmbeddedQuestion,
} from './types/question.types';
import { QuestionRepository } from './repositories/question.repository';

@Injectable()
export class RagService {

  private questions: EmbeddedQuestion[] = [];

  constructor(
    private readonly pdfLoaderService: PdfLoaderService,
    private readonly questionParserService: QuestionParserService,
    private readonly embeddingService: EmbeddingService,
    private readonly vectorSearchService: VectorSearchService,
    private readonly questionRepository: QuestionRepository,
  ) {}

  async ingestPdf(
    filePath: string,
  ) {

    const text =
      await this.pdfLoaderService.extractText(
        filePath,
      );

    const questions =
      this.questionParserService.parse(text);

    for (const question of questions) {

      const embedding =
        await this.embeddingService.embed(
          question.content,
        );

      await this.questionRepository.create({
        questionNumber:
          question.questionNumber,

        content:
          question.content,

        embedding,
      });
    }

    return {
      questionsProcessed:
        questions.length,
    };
  }

  async search(
    query: string,
    limit = 5,
  ) {
  
    return this.vectorSearchService.search(
      query,
      limit,
    );
  }


}