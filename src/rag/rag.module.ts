import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RagController } from './rag.controller';
import { RagService } from './rag.service';

import { PdfLoaderService } from './ingestion/pdf-loader.service';
import { QuestionParserService } from './ingestion/question-parser.service';

import { EmbeddingService } from './embeddings/embedding.service';

import { SimilarityService } from './retrieval/similarity.service';
import { VectorSearchService } from './retrieval/vector-search.service';

import { QuestionEntity } from './entities/question.entity';

import { QuestionRepository } from './repositories/question.repository';

@Module({

  imports: [
    TypeOrmModule.forFeature([
      QuestionEntity,
    ]),
  ],

  controllers: [
    RagController,
  ],

  providers: [
    RagService,

    PdfLoaderService,
    QuestionParserService,

    EmbeddingService,
    SimilarityService,
    VectorSearchService,

    QuestionRepository,
  ],
})
export class RagModule {}