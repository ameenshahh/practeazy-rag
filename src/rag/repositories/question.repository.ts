import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { QuestionEntity } from '../entities/question.entity';

@Injectable()
export class QuestionRepository {

  constructor(
    @InjectRepository(QuestionEntity)
    private readonly repository:
      Repository<QuestionEntity>,
  ) {}

  async create(
    data: Partial<QuestionEntity>,
  ): Promise<QuestionEntity> {

    const question =
      this.repository.create(data);

    return this.repository.save(question);
  }

  async findAll(): Promise<QuestionEntity[]> {
    return this.repository.find();
  }
}