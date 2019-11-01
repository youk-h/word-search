export interface LoadFile extends File {
  loadText: string;
}

export interface Index {
  index: number;
  word: string;
}

export type Text = string;

export interface ExtractedText {
  fileName: string;
  text: Text;
}

export type ExtractedTexts = ExtractedText[];
