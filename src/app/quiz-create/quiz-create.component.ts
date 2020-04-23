import {Component, OnInit} from '@angular/core';
import {Quiz} from '../entities/quiz';
import {QuizService} from '../quiz.service';

@Component({
  selector: 'app-quiz-create',
  templateUrl: './quiz-create.component.html',
  styleUrls: ['./quiz-create.component.css']
})
export class QuizCreateComponent implements OnInit {
  quizes: Quiz[];

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.getQuizes();
  }

  getQuizes(): void {
    this.quizService.getQuizes()
      .subscribe(quizes => this.quizes = quizes);
  }

  add(title: string): void {
    if (this.quizes === undefined) {
      this.quizes = [];
    }
    title = title.trim();
    if (!title) { return; }
    this.quizService.addQuiz({ title } as Quiz)
      .subscribe(quiz => {
        this.quizes.push(quiz);
      });
  }

  delete(quiz: Quiz): void {
    this.quizes = this.quizes.filter(q => q !== quiz);
    this.quizService.deleteQuiz(quiz).subscribe();
  }
}
