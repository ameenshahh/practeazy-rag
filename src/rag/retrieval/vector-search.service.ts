import { Injectable } from '@nestjs/common';

import { EmbeddingService } from '../embeddings/embedding.service';
import { SimilarityService } from './similarity.service';

import {
  EmbeddedQuestion,
  SearchResult,
} from '../types/question.types';

@Injectable()
export class VectorSearchService {
  constructor(
    private readonly embeddingService: EmbeddingService,
    private readonly similarityService: SimilarityService,
  ) {}

  async search(
    query: string,
    questions: EmbeddedQuestion[],
    limit = 5,
  ): Promise<SearchResult[]> {

    // 1. Convert search query into vector
    const queryEmbedding =
      await this.embeddingService.embed(query);

    // 2. Compare query vector against every question
    const results = questions.map((question) => {
      const similarity =
        this.similarityService.cosineSimilarity(
          queryEmbedding,
          question.embedding,
        );

      return {
        questionNumber: question.questionNumber,
        content: question.content,
        similarity,
      };
    });

    // 3. Highest similarity first
    results.sort(
      (a, b) => b.similarity - a.similarity,
    );

    // 4. Return Top K
    return results.slice(0, limit);
  }
}