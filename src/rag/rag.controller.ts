import { Controller, Get } from '@nestjs/common';
import { PdfLoaderService } from './ingestion/pdf-loader.service';

@Controller('rag')
export class RagController {
  constructor(
    private readonly pdfLoaderService: PdfLoaderService,
  ) {}

  @Get('test-pdf')
  async testPdf() {
    const text = await this.pdfLoaderService.extractText(
      './documents/maths.pdf',
    );

    return {
      characters: text.length,
      preview: text,
    };
  }
}