import { Injectable } from "@angular/core";

import { LoadFile } from "../load-file/load-file.service.i";
import { Match, SearchedNumber } from "./analyze-texts.service.i";

import { ExtractTextsService, SearchMatchService } from "../extract-texts/extract-texts.service";
import { MakeGraphService } from "../make-graph/make-graph.service";
import { SearchConditionService } from "../search-condition/search-condition.service";

@Injectable({
  providedIn: "root"
})
export class AnalyzeTextsService {
  constructor(
    private extractTextSvc: ExtractTextsService,
    private searchConditionSvc: SearchConditionService,
    private makeGraphSvc: MakeGraphService,
  ) { }

  public analyzeTextOfFiles(files: LoadFile[], regExp: RegExp): SearchedNumber {
    this.makeGraphSvc.initializeGraphData(this.searchConditionSvc.wordList);

    files.forEach((file: LoadFile) => {
      const searchMatch = new SearchMatchService();
      const matches: Match[] = searchMatch.searchMatch(file.loadText, regExp);

      this.extractTextSvc.extractTextsFromFile(file, matches);
      this.makeGraphSvc.makeGraphData(matches);
    });

    this.makeGraphSvc.addAllNumberToGraph(this.extractTextSvc.extractedTexts);
    return this.extractTextSvc.extractedTexts.length;
  }

  public reset() {
    this.extractTextSvc.extractedTexts = [];
    this.makeGraphSvc.graphData = [];
  }
}
