// <reference path="./file-reader-sync.d.ts" />
import { Injectable } from "@angular/core";

import { from, Observable } from "rxjs";
import { map, mergeMap, toArray, tap } from "rxjs/operators";

import * as encoding from "encoding-japanese";

import { Buffer } from "buffer";
import { LoadFile, LoadResult } from "./load-file.service.i";

@Injectable({
  providedIn: "root",
})
export class LoadFileService {
  public loadFiles: LoadFile[] = [];
  public loadResult: LoadResult = { fileNumber: 0, charNumber: 0 };

  constructor() {}

  public loadTextFromEachFiles$(files: File[]): Observable<LoadFile[]> {
    return from(files).pipe(
      mergeMap((file: File) =>
        this.loadTextFromFile$(file).pipe(
          map((text) => this.saveLoadedText(file, text))
        )
      ),
      toArray(),
      map((loadFiles: LoadFile[]) => (this.loadFiles = loadFiles))
    );
  }

  public loadTextFromFile$(file: File): Observable<string> {
    return from(this.loadArrayBuffer(file)).pipe(
      map((arrayBuffer: ArrayBuffer) => {
        return this.convertArrayBufferToUnicodeString(arrayBuffer);
      })
    );
  }

  public loadArrayBuffer(file: File): Promise<string | ArrayBuffer> {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    return new Promise((resolve, reject) => {
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = () => {
        reject(reader.error);
      };
    });
  }

  convertArrayBufferToUnicodeString(arrayBuffer: ArrayBuffer): string {
    const buffer = Buffer.from(arrayBuffer);
    const charCodes = encoding.convert(buffer, "UNICODE");
    return encoding.codeToString(charCodes);
  }

  public saveLoadedText(file: File, text: string): LoadFile {
    return {
      name: file.name.split(".")[0],
      loadText: text,
      lastModified: file.lastModified,
      size: file.size,
      type: file.type,
      slice: file.slice,
    };
  }

  public convertObjectToArray(obj: { [key: number]: File }): File[] {
    const array = [];

    Object.keys(obj).forEach((key) => {
      array.push(obj[key]);
    });

    return array;
  }

  public saveLoadResult(loadFiles: LoadFile[]) {
    this.loadResult = {
      fileNumber: loadFiles.length,
      charNumber: loadFiles.reduce(
        (charNum, file) => charNum + file.loadText.length,
        0
      ),
    };
  }

  public reset() {
    this.loadFiles = [];
    this.loadResult = { fileNumber: 0, charNumber: 0 };
  }
}
