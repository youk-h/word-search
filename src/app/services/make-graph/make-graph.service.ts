import { Injectable } from "@angular/core";

import { Graph, GraphElement, Index, Text } from "./make-graph.service.i";

@Injectable({
  providedIn: "root"
})
export class MakeGraphService {
  public graphData: Graph = [];

  constructor() { }

  public initializeGraphData(wordList: string[]) {
    this.graphData = wordList.map((word: string) => [word, 0] as GraphElement);
  }

  public makeGraphData(indexes: Index[]) {
    this.countGraphDataUsingMatches(this.graphData, indexes);
  }

  public countGraphDataUsingMatches(graphData: Graph, indexes: Index[]) {
    indexes.forEach((index: Index) => {
      this.addGraphDataMatchingWithWord(graphData, index.word);
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
