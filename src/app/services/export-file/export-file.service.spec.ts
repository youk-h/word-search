import { ExportFileService } from "./export-file.service";

describe("ExportFileService", () => {
  const target = new ExportFileService();

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe("formatFileName", () => {
    it("should call removeDotTxt", () => {
      // arrange
      const fileName = "";
      jest.spyOn(ExportFileService.prototype, "removeDotTxt");

      // act
      target.formatFileName(fileName);

      // assert
      expect(ExportFileService.prototype.removeDotTxt).toHaveBeenCalledWith(
        fileName
      );
    });

    it("should return string with .txt in end", () => {
      // arrange
      const fileName = "file.txt";
      jest
        .spyOn(ExportFileService.prototype, "removeDotTxt")
        .mockReturnValue("file");

      const expected = "file.txt";

      // act
      const actual = target.formatFileName(fileName);

      // assert
      expect(actual).toBe(expected);
    });
  });

  describe("removeDotTxt", () => {
    it("should remove .txt of string end", () => {
      // arrange
      const fileName = "file.txt";

      const expected = "file";

      // act
      const actual = target.removeDotTxt(fileName);

      // assert
      expect(actual).toBe(expected);
    });
    it("should not remove .txt of string middle", () => {
      // arrange
      const fileName = "file.txt.txtm";

      const expected = fileName;

      // act
      const actual = target.removeDotTxt(fileName);

      // assert
      expect(actual).toBe(expected);
    });
  });
});
