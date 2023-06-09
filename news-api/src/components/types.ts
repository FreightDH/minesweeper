export type Data =
  | {
      status: string;
      sources: Source;
    }
  | undefined;

type Source = {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
};

export type Endpoint = 'sources' | 'everything';
