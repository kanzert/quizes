import {Component, OnInit} from '@angular/core';
import {Question} from '../entities/question';
import { QuestionType } from '../entities/question-type';
import {QuestionService} from '../question.service';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-quizes',
  templateUrl: './quizes.component.html',
  styleUrls: ['./quizes.component.css']
})
export class QuizesComponent implements OnInit {
  questions: Question[];
  questionTypeName: string;
  // selectedQuestion: Question;

  constructor(private questionService: QuestionService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getQuestions();
  }

  // onSelect(question: Question): void {
  //   this.selectedQuestion = question;
  //   this.messageService.add(`QuestionService: Selected question id=${question.id}`);
  // }

  getQuestions(): void {
    this.questionService.getQuestions()
      .subscribe(questions => this.questions = questions);
  }
  add(text: string, typeName: string): void {
    text = text.trim();
    if (!text) { return; }
    this.questionService.addQuestion({text, type: {name: typeName}} as Question)
      .subscribe(question => {
        this.questions.push(question);
      });
  }

  // getQuestions(): void {
  //   this.questions = this.questionService.getQuestions();
  // }

  delete(question: Question): void {
    this.questions = this.questions.filter(q => q !== question);
    this.questionService.deleteQuestion(question).subscribe();
  }
}
