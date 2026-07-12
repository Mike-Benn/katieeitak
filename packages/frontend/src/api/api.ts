import { apiClient } from './apiClient';
import {
  type User,
  type AnxietyEvent,
  type AnxietyEventBody,
  type UpdateAnxietyEventBody,
  type GeneralBooksSearchResults,
  type DetailedBookResponse,
  type GetAnxietyEventsResponse,
  type MarkedBookReadResponse,
  type GetMarkedBookResponse,
  type MarkedBookReadPayload,
  type PatchReadBookByIdPayload,
  type PatchReadBookByIdResponse,
} from '@katieeitak/shared';
import type { SuccessResponse } from './types';
import type { AxiosResponse } from 'axios';

interface UpdateAnxietyEventParams {
  id: string;
  body: UpdateAnxietyEventBody;
}

interface GetBookByKeyParams {
  key: string;
  signal: AbortSignal;
}

interface GetAnxietyEventsParams {
  pageParam: number;
  signal: AbortSignal;
}

interface SearchBooksByQueryStringParams {
  pageParam: number;
  query: string;
  signal: AbortSignal;
}

interface GetMarkedBookParams {
  key: string;
  signal: AbortSignal;
}

interface PatchMarkedBookParams {
  id: string;
  payload: PatchReadBookByIdPayload;
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
  getAnxietyEvents: async ({ pageParam, signal }: GetAnxietyEventsParams) => {
    const params = new URLSearchParams({ limit: '5', offset: `${pageParam}` });
    const response = await apiClient.get<SuccessResponse<GetAnxietyEventsResponse>>(
      `/anxiety?${params}`,
      { signal },
    );
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
  patchReadBookById: async ({ id, payload }: PatchMarkedBookParams) => {
    const response = await apiClient.patch<
      SuccessResponse<PatchReadBookByIdResponse>,
      AxiosResponse<SuccessResponse<PatchReadBookByIdResponse>>,
      PatchReadBookByIdPayload
    >(`/library/${id}`, payload);
    return response.data.data;
  },

  searchBooksByQueryString: async ({
    query,
    pageParam,
    signal,
  }: SearchBooksByQueryStringParams) => {
    const params = new URLSearchParams({ q: query, limit: '20', offset: `${pageParam}` });
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
  markBookRead: async (body: MarkedBookReadPayload) => {
    const response = await apiClient.post<SuccessResponse<MarkedBookReadResponse>>(
      '/library',
      body,
    );
    return response.data.data;
  },
  getMarkedBook: async ({ key, signal }: GetMarkedBookParams) => {
    const response = await apiClient.get<SuccessResponse<GetMarkedBookResponse>>(
      `/library/book/${key}`,
      { signal },
    );
    return response.data.data;
  },
};
