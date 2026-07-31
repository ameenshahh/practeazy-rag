import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('questions')
export class QuestionEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  questionNumber!: number;

  @Column({
    type: 'text',
  })
  content!: string;

  @Column({
    type: 'vector',
    length: 1536,
  })
  embedding!: number[];
}
