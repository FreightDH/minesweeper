export type Source = Record<string, string>;
export type Article = Record<string, string> & { source: Record<string, string> };

export type DataSources = {
  status: string;
  sources: Source[];
};

export type DataNews = {
  status: string;
  totalResults: number;
  articles: Article[];
};

export type Data = DataSources | DataNews | undefined;

export enum Endpoint {
  Sources = 'sourses',
  Everything = 'everything',
}
