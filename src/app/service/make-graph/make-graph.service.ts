import { Injectable } from "@angular/core";

import { Graph, GraphElement, Match, Text } from "./make-graph.service.i";

@Injectable({
  providedIn: "root"
})
export class MakeGraphService {
  public graphData: Graph = [];

  constructor() { }

  public initializeGraphData(wordList: string[]) {
    this.graphData = wordList.map((word: string) => [word, 0] as GraphElement);
  }

  public makeGraphData(matches: Match[]) {
    this.countGraphDataUsingMatches(this.graphData, matches);
  }

  public countGraphDataUsingMatches(graphData: Graph, matches: Match[]) {
    matches.forEach((match: Match) => {
      this.addGraphDataMatchingWithWord(graphData, match.word);
    });
  }

  public addGraphDataMatchingWithWord(graphData: Graph, word: string) {
    graphData.forEach((graphElement: GraphElement) => {
      if (word === graphElement[0]) {
        graphElement[1]++;
      }
    });
  }

  public addAllNumberToGraph(texts: Text[]) {
    this.graphData = [["全件数", texts.length], ...this.graphData];
  }

  reset() {
    this.graphData = [];
  }
}
