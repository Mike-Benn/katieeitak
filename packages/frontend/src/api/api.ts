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
  type CompleteAnxietyEventByIdResponse,
  type CompleteAnxietyEventByIdPayload,
  type AnxietyEventCursor,
  type AnxietyEventStatus,
  type UncompleteAnxietyEventByIdResponse,
  type DeleteAnxietyEventByIdResponse,
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
  pageParam: AnxietyEventCursor | null;
  status: AnxietyEventStatus;
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

interface CompleteAnxietyEventByIdParams {
  id: string;
  payload: CompleteAnxietyEventByIdPayload;
}

interface UncompleteAnxietyEventByIdParams {
  id: string;
}

interface DeleteAnxietyEventByIdParams {
  id: string;
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
  getAnxietyEventsById: async ({ pageParam, status, signal }: GetAnxietyEventsParams) => {
    const params = new URLSearchParams({ limit: '5' });
    if (pageParam) {
      params.set('cursorDate', pageParam.date);
      params.set('cursorId', pageParam.id);
    }
    params.set('status', status);
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
  completeAnxietyEventById: async ({ id, payload }: CompleteAnxietyEventByIdParams) => {
    const response = await apiClient.patch<
      SuccessResponse<CompleteAnxietyEventByIdResponse>,
      AxiosResponse<SuccessResponse<CompleteAnxietyEventByIdResponse>>,
      CompleteAnxietyEventByIdPayload
    >(`/anxiety/${id}/complete`, payload);
    return response.data.data;
  },
  uncompleteAnxietyEventById: async ({ id }: UncompleteAnxietyEventByIdParams) => {
    const response = await apiClient.delete<
      SuccessResponse<UncompleteAnxietyEventByIdResponse>,
      AxiosResponse<SuccessResponse<UncompleteAnxietyEventByIdResponse>>
    >(`/anxiety/${id}/complete`);
    return response.data.data;
  },

  deleteAnxietyEventById: async ({ id }: DeleteAnxietyEventByIdParams) => {
    const response = await apiClient.delete<
      SuccessResponse<DeleteAnxietyEventByIdResponse>,
      AxiosResponse<SuccessResponse<DeleteAnxietyEventByIdResponse>>
    >(`/anxiety/${id}`);
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
