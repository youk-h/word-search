import { Injectable } from "@angular/core";

export class GenerateRegExpService {
  constructor() { }

  public escapeWhiteSpace(word: string): string {
    return word.replace(/^\s+/g, "").replace(/\s+$/g, "");
  }

  public convertWordsToRegExp(words: string[]): RegExp {
    if (Array.isArray(words) && !words.length) {
      return undefined;
    }

    const escapeWords = words.map((word) => this.escapeWhiteSpace(word));

    return new RegExp(escapeWords.join("|"), "gi");
  }
}

@Injectable({
  providedIn: "root",
})
export class SearchConditionService {
  wordList: string[] = [];
  regExp: RegExp;
  searchNumber: number;

  private generateRegExp = new GenerateRegExpService();

  constructor(
  ) { }

  public genRegExp(words: string[]) {
    this.regExp = this.generateRegExp.convertWordsToRegExp(words);
  }

  public inWordList(targetWord: string): boolean {
    return this.wordList.some((word: string) => word === targetWord);
  }

  public decideSearchNumber(num: number) {
    this.searchNumber = num;
  }

  public reset() {
    this.wordList = [];
    this.regExp = undefined;
    this.searchNumber = undefined;
  }

}
