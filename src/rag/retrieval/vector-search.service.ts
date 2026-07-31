import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { QuestionEntity } from '../entities/question.entity';

import { EmbeddingService } from '../embeddings/embedding.service';

@Injectable()
export class VectorSearchService {

  constructor(

    @InjectRepository(QuestionEntity)
    private readonly repository:
      Repository<QuestionEntity>,

    private readonly embeddingService:
      EmbeddingService,
  ) {}

  async search(
    query: string,
    limit = 5,
  ) {

    const queryEmbedding =
      await this.embeddingService.embed(
        query,
      );

    const vector =
      `[${queryEmbedding.join(',')}]`;

    return this.repository
      .createQueryBuilder('question')

      .select([
        'question.id',
        'question.questionNumber',
        'question.content',
      ])

      .addSelect(
        'question.embedding <=> :embedding',
        'distance',
      )

      .setParameter(
        'embedding',
        vector,
      )

      .orderBy(
        'question.embedding <=> :embedding',
        'ASC',
      )

      .limit(limit)

      .getRawMany();
  }
}