import { Injectable } from "@angular/core";

import { LoadFile } from "../file-management/file-management.i";
import { SearchedTexts } from "./analyze-texts.service.i";
import { Match, SearchedNumber, Text } from "./analyze-texts.service.i";

import { SearchTextsService } from "../search-texts/search-texts.service";

@Injectable({
  providedIn: "root"
})
export class AnalyzeTextsService {
  public searchedTexts: SearchedTexts = [];

  constructor(
    private searchTextSvc: SearchTextsService,
  ) { }

  public analyzeTextOfFiles(files: LoadFile[], regExp: RegExp): SearchedNumber {
    const texts: Text[] = this.extractTextFromFiles(files);

    texts.forEach((text) => {
      const matches: Match[] = this.searchTextSvc.searchMatchesFromText(text, regExp);
      console.log(matches);
      this.searchedTexts = this.searchedTexts.concat(this.searchTextSvc.searchTexts(text, matches));
      // this.graphData = this.makeGraphService.makeGraphData(text, matches);
    });

    return this.makeSearchedResult(this.searchedTexts);
  }

  public makeSearchedResult(texts: SearchedTexts): SearchedNumber {
    return texts.length;
  }

  public extractTextFromFiles(files: LoadFile[]): Text[] {
    return files.map((file) => file.loadText);
  }

  public reset() {
    this.searchedTexts = [];
  }
}
