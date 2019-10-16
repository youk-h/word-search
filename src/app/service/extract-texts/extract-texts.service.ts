import { Injectable } from "@angular/core";
import { Match, ExtractedTexts, Text, LoadFile } from "./extract-text.service.i";
import { SearchConditionService } from "../search-condition/search-condition.service";

@Injectable({
  providedIn: "root",
})
export class ExtractTextsService {
  public extractedTexts: ExtractedTexts = [];

  constructor(private searchCondtionSvc: SearchConditionService) { }

  public extractTextsFromFile(file: LoadFile, matches: Match[]) {
    matches.forEach((match) => {
      this.extractedTexts.push(this.extractTextUsingIndex(file.loadText, match));
    });
  }

  public extractTextUsingIndex(text: Text, match: Match): Text {
    const calcTextLenSvc = new CalculateTextlengthService();
    const { start, end } = calcTextLenSvc.calculateTextLength(this.searchCondtionSvc.searchNumber, match);

    return text.substring(start, end);
  }
}

export class SearchMatchService {
  public searchMatch(text: Text, regExp: RegExp): Match[] {
    let temp: RegExpExecArray;
    const indices: Match[] = [];

    // tslint:disable-next-line:no-conditional-assignment
    while (temp = regExp.exec(text)) {
      indices.push({
        index: temp.index,
        word: temp[0],
      });
    }

    return indices;
  }
}

export class CalculateTextlengthService {
  constructor() { }

  public calculateTextLength(searchNumber: number, match: Match) {
    const searchWordLength = match.word.length;
    const searchNum = this.adjustSearchNumber(searchNumber, searchWordLength);
    const halfSearchedNumber = this.calculateHalfSearchNumber(searchNum, searchWordLength);

    let start = match.index - halfSearchedNumber;
    let end = match.index + (searchWordLength + halfSearchedNumber);

    if (start < 0) {
      end -= start;
      start -= start;
    }

    return { start, end };
  }

  public adjustSearchNumber(searchNumber: number, searchWordLength: number): number {
    if (searchNumber < searchWordLength) {
      searchNumber = searchWordLength;
    }

    return searchNumber;
  }

  public calculateHalfSearchNumber(searchNumber: number, searchWordLength: number): number {
    return (searchNumber - searchWordLength) / 2;
  }
}
