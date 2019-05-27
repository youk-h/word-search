export interface LoadFile extends File {
  loadText: string;
}

export interface Match {
  index: number;
  word: string;
}

export type SearchedTexts = string[];

export type Text = string;
