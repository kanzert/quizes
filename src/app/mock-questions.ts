import {Question} from './entities/question';

export const QUESTIONS: Question[] = [
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
        text: 'Type answer'
      }],
    type: {
      id: 1,
      name: 'True/False'
    }},
];
