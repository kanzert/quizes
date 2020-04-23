import {Option} from './option';
import {QuestionType} from './question-type';

export interface Question {
  id: number;
  text: string;
  options: Option[];
  type: QuestionType;
  quizId: number;
}
