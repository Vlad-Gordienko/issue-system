import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[commentText]'
})
export class CommentTextDirective implements OnInit {

  @Input()
  @HostBinding('innerHTML')
  textHTML: string = '';

  calcRe = /[0-9+*-\/]+[0-9]+/igm;

  constructor() { }

  public ngOnInit() {
    this.textHTML = this.textHTML.replace(this.calcRe, (value: string) => this.calc(value).toString())
  }

  private calc(value: string): number {
    const parseDivide = (exp: string): number => {
      if (!Number.isNaN(Number(exp))) {
        return Number(exp);
      }
      const numbers = exp.split('/')
      return parsePlus(numbers[0]) / numbers.slice(1).reduce((acc, val) => acc * parsePlus(val), 1.0);
    }

    const parseMultiple = (exp: string): number => {
      if (!Number.isNaN(Number(exp))) {
        return Number(exp);
      }
      const numbers = exp.split('*');
      return parseDivide(numbers[0]) * numbers.slice(1).reduce((acc, val) => acc * parseDivide(val), 1.0);
    }

    const parseMinus = (exp: string): number=> {
      if (!Number.isNaN(Number(exp))) {
        return Number(exp);
      }
      const numbers = exp.split('-');
      return parseMultiple(numbers[0]) - numbers.slice(1).reduce((acc, val) => acc + parseMultiple(val), 0.0);
    }

    const parsePlus = (exp: string): number=> {
      if (!Number.isNaN(Number(exp))) {
        return Number(exp);
      }
      const numbers = exp.split('+');
      return parseMinus(numbers[0]) + numbers.slice(1).reduce((acc, val) => acc + parseMinus(val), 0.0);
    }

    return parsePlus(value);
  }

}
