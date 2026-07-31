import {
    Controller,
    Get,
    Post,
    Query,
  } from '@nestjs/common';
  
  import { RagService } from './rag.service';
  
  @Controller('rag')
  export class RagController {
  
    constructor(
      private readonly ragService: RagService,
    ) {}
  
    @Post('ingest')
    async ingest() {
      return this.ragService.ingestPdf(
        './documents/maths.pdf',
      );
    }
  
    @Get('search')
    async search(
      @Query('query') query: string,
    ) {
      return this.ragService.search(
        query,
        5,
      );
    }
  }