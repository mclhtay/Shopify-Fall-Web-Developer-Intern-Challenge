import axios from 'axios';
import { ApiResult } from 'src/types';
import secrets from './secrets.json';

export const search = async (queryString: string) => {

  const response = await axios.get<ApiResult>(`${secrets.apiLink}/?apiKey=${secrets.apiToken}&s=${queryString}`);
  return response;

}