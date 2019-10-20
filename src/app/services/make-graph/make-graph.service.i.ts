export type Graph = GraphElement[];

export type GraphElement = [string, number];

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
