import { Injectable } from '@angular/core';
import {Option} from './entities/option';

@Injectable({
  providedIn: 'root'
})
export class OptionService {
  option: Option = new class implements Option {
    correct: boolean;
    id: number;
    text: string;
  };
  add(correct: boolean, text: string, options: Option[]) {
    this.option.correct = correct;
    this.option.text = text;
    options.push(this.option);
  }
  updateOption(correct: boolean, text: string, options: Option[], option: Option) {
    const index = options.indexOf(option, 0);
    if (index > -1) {
      options[index].correct = correct;
      options[index].text = text;
    }
  }
  deleteOption(options: Option[], option: Option): void {
    const index = options.indexOf(option, 0);
    if (index > -1) {
      options.splice(index, 1);
    }
  }
}

