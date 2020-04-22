import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';

import { Question} from '../entities/question';
import { QuestionService} from '../question.service';

@Component({
  selector: 'app-quiz-edit',
  templateUrl: './quiz-edit.component.html',
  styleUrls: ['./quiz-edit.component.css']
})
export class QuizEditComponent implements OnInit {
  @Input() question: Question;
  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getQuestion();
  }
  getQuestion(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.questionService.getQuestion(id)
      .subscribe(question => this.question = question);
  }
  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.questionService.updateQuestion(this.question)
      .subscribe(() => this.goBack());
  }
}