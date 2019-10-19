export interface LoadFile extends File {
  loadText: string;
}

export interface Index {
  index: number;
  word: string;
}

export type Text = string;

export type ExtractedTexts = Text[];
