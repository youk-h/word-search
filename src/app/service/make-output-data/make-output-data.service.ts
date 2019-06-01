import { Injectable } from "@angular/core";

import { Text } from "./edit-word.i";

@Injectable({
  providedIn: "root",
})
export class MakeOutputDataService {
  constructor() { }

  public makeOutputData(texts: Text[] = []): Text {
    let section: Text = "";

    texts.forEach((text) => {
      section += this.separateByPartition(text);
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
