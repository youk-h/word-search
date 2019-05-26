import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SearchConditionService {
  regExp: RegExp;
  searchNumber: number;

  private generateRegExp = new GenerateRegExpService();

  constructor(
  ) { }

  public genRegExp(words: string[]) {
    this.regExp = this.generateRegExp.convertWordsToRegExp(words);
  }

  public decideSearchNumber(num: number) {
    this.searchNumber = num;
  }

}

export class GenerateRegExpService {
  constructor() { }

  public escapeWhiteSpace(word: string): string {
    return word.replace(/^\s+/g, "").replace(/\s+$/g, "");
  }

  public convertWordsToRegExp(words: string[]): RegExp {
    const escapeWords = words.map((word) => this.escapeWhiteSpace(word));

    return new RegExp(escapeWords.join("|"), "gi");
  }

}