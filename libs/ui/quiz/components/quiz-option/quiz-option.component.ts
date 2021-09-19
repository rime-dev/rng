import {Component, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';
import {QuestionOption} from '../../models/quiz.model';

@Component({
  selector: 'rng-quiz-option',
  templateUrl: './quiz-option.component.html',
  styleUrls: ['./quiz-option.component.scss'],
})
export class QuizOptionComponent {
  @Input()
  get option(): QuestionOption {
    return this._option;
  }
  set option(value: QuestionOption) {
    this._option = value;
  }
  private _option: QuestionOption = {text: '', state: false};

  @Input()
  get index(): number {
    return this._index;
  }
  set index(value: number) {
    this._index = value;
  }
  private _index = 0;

  @HostBinding('option-selected') get valid() {
    if (this.option) {
      return this.option.response;
    } else {
      return;
    }
  }

  @Output() selected: EventEmitter<QuestionOption> = new EventEmitter<QuestionOption>();

  @HostListener('click', ['$event'])
  _handleClick(event: Event) {
    event.preventDefault();
    this.selectOption();
  }
  @HostListener('keydown.space', ['$event'])
  @HostListener('keydown.enter', ['$event'])
  _handleKeydown(event: Event) {
    event.preventDefault();
    this.selectOption();
  }

  constructor() {}

  selectOption() {
    this.selected.next({...this.option, index: this.index, response: true});
  }
}
