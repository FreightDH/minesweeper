export type Data = DataSources | DataNews | undefined;

export type DataSources = {
  status: string;
  sources: Source[];
};

// record <string, string> ??
export type Source = {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
};

export type DataNews = {
  status: string;
  totalResults: number;
  articles: Article[];
};

// record <string, string>  & source: record <string, string> ??
export type Article = {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: Record<string, string>;
  title: string;
  url: string;
  urlToImage: string;
};

export type Endpoint = 'sources' | 'everything';
