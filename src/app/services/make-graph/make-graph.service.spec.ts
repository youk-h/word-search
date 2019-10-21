import { TestBed } from "@angular/core/testing";

import { MakeGraphService } from "./make-graph.service";

describe("MakeGraphService", () => {
  let target: MakeGraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MakeGraphService],
    });

    target = TestBed.get(MakeGraphService);
  });

  describe("initializeGraphData", () => {
    it("should return array of [word, 0] when receive wordList", () => {
      // arrange
      const wordList: string[] = ["import", "export"];

      const expected: [string, number][] = [["import", 0], ["export", 0]];

      // act
      target.initializeGraphData(wordList);

      // assert
      expect(target.graphData).toEqual(expected);
    });
  });
});
