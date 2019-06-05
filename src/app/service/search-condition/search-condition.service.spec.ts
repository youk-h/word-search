  describe("inWordList", () => {
    it("should return true when target word is in wordList", () => {
      // arrange
      component.wordList = ["import", "export"];
      const word = "import";
      const expected = true;

      // act
      const actual = component.inWordList(word);

      // assert
      expect(actual).toBe(expected);
    });

    it("should return false when target word is not in wordList", () => {
      // arrange
      component.wordList = ["import", "export"];
      const word = "domestic";
      const expected = false;

      // act
      const actual = component.inWordList(word);

      // assert
      expect(actual).toBe(expected);
    });
  });