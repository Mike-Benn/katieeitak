import { apiClient } from './apiClient';
import type {
  User,
  AnxietyEvent,
  AnxietyEventBody,
  UpdateAnxietyEventBody,
  GeneralBooksSearchResults,
  DetailedBookResponse,
} from '@katieeitak/shared';
import type { SuccessResponse } from './types';
import type { AxiosResponse } from 'axios';

interface UpdateAnxietyEventParams {
  id: string;
  body: UpdateAnxietyEventBody;
}

interface SearchBooksByQueryStringParams {
  query: string;
  signal: AbortSignal;
}

interface GetBookByKeyParams {
  key: string;
  signal: AbortSignal;
}

// TODO - Error handling
export const api = {
  completeAuth: async (signal: AbortSignal) => {
    const response = await apiClient.get<SuccessResponse<User>>('/auth', { signal });
    if (!response.data) {
      throw new Error('Auth failed, server did not return the completed user data.');
    }
    return response.data.data;
  },
  submitAnxietyEvent: async (body: AnxietyEventBody) => {
    const response = await apiClient.post<
      SuccessResponse<AnxietyEvent>,
      AxiosResponse<SuccessResponse<AnxietyEvent>>,
      AnxietyEventBody
    >('/anxiety', body);
    return response.data.data;
  },
  getAnxietyEvents: async (signal: AbortSignal) => {
    const response = await apiClient.get<SuccessResponse<AnxietyEvent[]>>('/anxiety', { signal });
    return response.data.data;
  },
  updateAnxietyEvent: async ({ id, body }: UpdateAnxietyEventParams) => {
    const response = await apiClient.patch<
      SuccessResponse<AnxietyEvent>,
      AxiosResponse<SuccessResponse<AnxietyEvent>>,
      UpdateAnxietyEventBody
    >(`/anxiety/${id}`, body);
    return response.data.data;
  },
  searchBooksByQueryString: async ({ query, signal }: SearchBooksByQueryStringParams) => {
    const params = new URLSearchParams({ q: query, limit: '20' });
    const response = await apiClient.get<SuccessResponse<GeneralBooksSearchResults>>(
      `/books/search?${params}`,
      {
        signal,
      },
    );
    return response.data.data;
  },
  getBookByKey: async ({ key, signal }: GetBookByKeyParams) => {
    const response = await apiClient.get<SuccessResponse<DetailedBookResponse>>(`/books/${key}`, {
      signal,
    });
    return response.data.data;
  },
};
