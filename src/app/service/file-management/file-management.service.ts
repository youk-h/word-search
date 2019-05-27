// <reference path="./file-reader-sync.d.ts" />
import { Injectable } from "@angular/core";
import { LoadFile } from "./file-management.i";
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";
import * as encoding from "encoding-japanese";

@Injectable({
  providedIn: "root"
})
export class FileManagementService {
  public loadFiles: LoadFile[] = [];
  public loaded = { fileNumber: 0, charNumber: 0 };

  constructor() { }

  public loadText(file: File): Observable<any> {
    return from(this.loadTextFromFile(file)).pipe(
      map((arrayBuffer: ArrayBuffer) => {
        const text = this.convertAnyCharCodeToUnicode(arrayBuffer);
        this.loadFiles.push(this.addLoadTextToFile(file, text));
        this.loaded.fileNumber = this.loadFiles.length;
        this.loaded.charNumber += text.length;
        return this.loaded;
      }),
    );
  }

  public loadTextFromFile(file: File): Promise<string | ArrayBuffer> {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    return new Promise((resolve, reject) => {
      reader.onload = () => { resolve(reader.result); };
      reader.onerror = () => { reject(reader.error); };
    });

  }

  convertAnyCharCodeToUnicode(arrayBuffer: ArrayBuffer): string {
    const buffer = Buffer.from(arrayBuffer);
    const charCodes = encoding.convert(buffer, "UNICODE");
    return encoding.codeToString(charCodes);
  }

  public addLoadTextToFile(file: File, text: string): LoadFile {
    return { ...file, loadText: text };
  }

  public convertObjectToArray(obj: object): Array<any> {
    const array = [];

    Object.keys(obj).forEach((key) => {
      array.push(obj[key]);
    });

    return array;
  }

  public reset() {
    this.loadFiles = [];
    this.loaded = { fileNumber: 0, charNumber: 0 };
  }
}
