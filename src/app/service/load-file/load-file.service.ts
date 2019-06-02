// <reference path="./file-reader-sync.d.ts" />
import { Injectable } from "@angular/core";

import { from, Observable } from "rxjs";
import { map, mergeMap, toArray } from "rxjs/operators";

import * as encoding from "encoding-japanese";

import { Buffer } from "buffer";
import { LoadFile } from "./load-file.service.i";

@Injectable({
  providedIn: "root"
})
export class loadFileService {
  public loadFiles: LoadFile[] = [];

  constructor() { }

  public loadTextOfEachFiles$(files: File[]): Observable<LoadFile[]> {
    return from(files).pipe(
      mergeMap((file: File) => this.loadTextOfFile$(file).pipe(
        map((text) => this.addLoadTextToFile(file, text)),
      )),
      toArray(),
      map((loadFiles: LoadFile[]) => this.loadFiles = loadFiles),
    );
  }

  public loadTextOfFile$(file: File): Observable<string> {
    return from(this.loadArrayBuffer(file)).pipe(
      map((arrayBuffer: ArrayBuffer) => {
        return this.convertArrayBufferToUnicodeString(arrayBuffer);
      }),
    );
  }

  public loadArrayBuffer(file: File): Promise<string | ArrayBuffer> {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    return new Promise((resolve, reject) => {
      reader.onload = () => { resolve(reader.result); };
      reader.onerror = () => { reject(reader.error); };
    });

  }

  convertArrayBufferToUnicodeString(arrayBuffer: ArrayBuffer): string {
    const buffer = Buffer.from(arrayBuffer);
    const charCodes = encoding.convert(buffer, "UNICODE");
    return encoding.codeToString(charCodes);
  }

  public addLoadTextToFile(file: File, text: string): LoadFile {
    return { ...file, loadText: text };
  }

  public convertObjectToArray(obj: { [key: number]: File }): File[] {
    const array = [];

    Object.keys(obj).forEach((key) => {
      array.push(obj[key]);
    });

    return array;
  }

  public reset() {
    this.loadFiles = [];
  }
}
