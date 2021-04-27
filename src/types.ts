export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export type SearchResult = Movie[];

export interface ApiResult {
  Search: Movie[]
}