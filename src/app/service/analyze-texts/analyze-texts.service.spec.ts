import { SearchTextsService } from "./analyze-texts.service";

import { LoadFile, SearchedTexts } from "../load-file/load-file.service.i";
import { Match } from "./analyze-texts.service.i";

describe("SearchService", () => {
  let target: SearchTextsService;

  beforeEach(() => {
    jest.restoreAllMocks();
    target = new SearchTextsService();
  });

  describe("makeSearchedResult", () => {
    it("", () => {
      const files: SearchedTexts[] = [
        {
          name: "file1",
          sentences: [
            "sentence1",
            "sentence2",
          ],
        },
        {
          name: "file2",
          sentences: [
            "sentence3",
            "sentence4",
          ],
        },
      ];

      const expected = {
        fileNumber: 2,
        charNumber: 32,
      };

      const actual = target.makeSearchedResult(files);

      expect(actual).toEqual(expected);
    });
  });

});
