import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ExportFileService {
  public formatFileName(name: string): string {
    let fileName = name;
    const expand = ".txt";

    fileName = this.removeDotTxt(fileName);

    return `${fileName}${expand}`;
  }

  public removeDotTxt(str: string): string {
    let fileName = str;
    const dotTxt = /.txt$/;

    if (dotTxt.test(fileName)) {
      fileName = fileName.replace(dotTxt, "");
    }

    return fileName;
  }
}
