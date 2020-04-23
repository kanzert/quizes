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

  add(correct: boolean, text: string, options: Option[]): Option {
    if (options === undefined) {
      options = [];
    }
    this.option.correct = correct;
    this.option.text = text;
    options.push(this.option);
    return this.option;
  }
  // updateOption(options: Option[], option: Option): void {
  //
  // }
  deleteOption(options: Option[], option: Option): void {
    const index = options.indexOf(option, 0);
    if (index > -1) {
      options.splice(index, 1);
    }
  }


}

