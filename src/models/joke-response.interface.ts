// Generated by https://quicktype.io

export interface JokeResponse {
  type: string;
  value: JokeModel;
}

export interface JokeModel {
  id: number;
  joke: string;
  categories: string[];
}
