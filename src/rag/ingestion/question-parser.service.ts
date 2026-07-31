import { Injectable } from '@nestjs/common';

export interface ParsedQuestion {
  questionNumber: number;
  content: string;
}

@Injectable()
export class QuestionParserService {

  parse(text: string): ParsedQuestion[] {

    const questions: ParsedQuestion[] = [];

    const regex = /Q\.(\d+)\s+([\s\S]*?)(?=Q\.\d+|$)/g;

    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {

      questions.push({
        questionNumber: Number(match[1]),
        content: match[2].trim(),
      });

    }

    return questions;
  }
}