import { SearchResult } from "../../../types";

export interface UserReducerType {
  queryString: string;
  searchResults: SearchResult;
  nominated: SearchResult;
  noResult: boolean;
}