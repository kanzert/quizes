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

  add(correct: boolean, text: string): Option {
    this.option.id = 1;
    this.option.correct = correct;
    this.option.text = text;
    return this.option;
  }
}

