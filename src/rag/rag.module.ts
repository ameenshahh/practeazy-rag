import { Module } from '@nestjs/common';
import { RagController } from './rag.controller';
import { RagService } from './rag.service';
import { PdfLoaderService } from './ingestion/pdf-loader.service';

@Module({
  controllers: [RagController],
  providers: [RagService, PdfLoaderService]
})
export class RagModule {}
