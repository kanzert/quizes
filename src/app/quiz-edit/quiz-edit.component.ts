import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';

import { Question} from '../entities/question';
import { QuestionService } from '../question.service';
import { OptionService } from '../option.service';
import {Option} from '../entities/option';

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
    private optionService: OptionService,
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
    console.log(this.question.options);
    this.questionService.updateQuestion(this.question)
      .subscribe(() => this.goBack());
  }

  add(correct: boolean, text: string): void {
    if (this.question.options === undefined) {
      this.question.options = [];
    }
    this.optionService.add(correct, text, this.question.options);
  }

  update(correct: boolean, text: string, option: Option): void {
     this.optionService.updateOption(correct, text, this.question.options, option);
  }

  delete(option: Option): void {
    this.optionService.deleteOption(this.question.options, option);
  }
}
