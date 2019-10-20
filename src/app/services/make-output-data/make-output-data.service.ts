import { Injectable } from "@angular/core";

import { Text, ExtractedTexts } from "./make-output.service.i";

@Injectable({
  providedIn: "root",
})
export class MakeOutputDataService {
  constructor() { }

  public makeOutputData(extractedTexts: ExtractedTexts = []): Text {
    let section: Text = "";

    extractedTexts.forEach((extractedText) => {
      section += extractedText.fileName;
      section += "\r\n";
      section += "\r\n";
      section += this.separateByPartition(extractedText.text);
    });

    return section;
  }

  public separateByPartition(text: Text): Text {
    let section = "";

    section += this.joinNewLine(text);
    section += this.addPartition();

    return section;
  }

  public joinNewLine(text: Text): Text {
    return text + "\r\n";
  }

  public addPartition(): Text {
    return "**************************************************" + "\r\n";
  }
}
