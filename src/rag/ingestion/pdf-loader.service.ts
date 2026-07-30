import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { PDFParse } from 'pdf-parse';

@Injectable()
export class PdfLoaderService {
  async extractText(filePath: string): Promise<string> {
    const buffer = fs.readFileSync(filePath);
    const parser = new PDFParse({ data: buffer });

    try {
      const data = await parser.getText();
      return data.text;
    } finally {
      await parser.destroy();
    }
  }
}
