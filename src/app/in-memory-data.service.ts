import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Question} from './entities/question';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const questions = [
      { id: 1,
        text: 'What is Java',
        options: [
          { id: 1,
            correct: true,
            text: 'Programming language'
          }],
        type: {
          id: 1,
          name: 'Select option'
        }},
      { id: 2,
        text: 'What is Angular',
        options: [
          { id: 1,
            correct: true,
            text: 'Framework'
          }],
        type: {
          id: 1,
          name: 'Math'
        }},
      { id: 3,
        text: 'What is Sql',
        options: [
          { id: 1,
            correct: true,
            text: 'Query language'
          }],
        type: {
          id: 1,
          name: 'True/False'
        }},
    ];
    return {questions};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(questions: Question[]): number {
    return questions.length > 0 ? Math.max(...questions.map(question => question.id)) + 1 : 1;
  }
}
