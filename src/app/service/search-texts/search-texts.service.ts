import { Injectable } from "@angular/core";
import { LoadFile, Match, SearchedTexts, Text } from "./search-text.service.i";
import { SearchConditionService } from "../search-condition/search-condition.service";

@Injectable({
  providedIn: "root",
})
export class SearchTextsService {
  constructor(private searchCondtionSvc: SearchConditionService) { }

  public searchTextsFromFile(file: LoadFile, matches: Match[]): SearchedTexts {
    return this.searchTexts(file.loadText, matches);
  }

  public searchTexts(text: string, matches: Match[]): SearchedTexts {
    const searchedTexts: SearchedTexts = [];

    matches.forEach((match) => {
      searchedTexts.push(this.searchTextUsingMatch(text, match));
    });

    return searchedTexts;
  }

  public searchTextUsingMatch(text: string, match: Match): string {
    const calcTextLenSvc = new CalculateTextlengthService();

    const { start, end } = calcTextLenSvc.calculateTextLength(this.searchCondtionSvc.searchNumber, match);
    return text.substring(start, end);
  }

  public searchMatchesFromText(text: Text, regExp: RegExp): Match[] {
    let temp: RegExpExecArray;
    const matches: Match[] = [];

    // tslint:disable-next-line:no-conditional-assignment
    while (temp = regExp.exec(text)) {
      matches.push({
        index: temp.index,
        word: temp[0],
      });
    }
    return matches;
  }
}

export class CalculateTextlengthService {
  constructor() { }

  public calculateTextLength(searchNum: number, match: Match) {
    const targetWordLength = match.word.length;
    const searchNumber = this.adjustSearchNumber(searchNum, targetWordLength);
    const halfSearchedNumber = this.decideHalfSearchNumber(searchNumber, targetWordLength);

    let start = match.index - halfSearchedNumber;
    let end = match.index + (targetWordLength + halfSearchedNumber);

    if (start < 0) {
      end -= start;
      start -= start;
    }

    return { start, end };
  }

  public adjustSearchNumber(searchNumber: number, targetWordLength: number): number {
    if (searchNumber < targetWordLength) {
      searchNumber = targetWordLength;
    }

    return searchNumber;
  }

  public decideHalfSearchNumber(searchNumber: number, targetWordLength: number): number {
    return (searchNumber - targetWordLength) / 2;
  }

}
