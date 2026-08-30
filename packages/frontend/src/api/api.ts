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
  type AnxietyEventOccurrenceType,
  type MarkPlateSeenResponse,
  type UnmarkPlateSeenResponse,
  type CreatePlateRaceByUserIdRequestBody,
  type PlateRaceDescriptionsCursor,
  type CreatePlateRaceByUserIdResponse,
  type GetPlateRaceDataResponse,
  type CompletePlateRaceResponse,
  type GetPastPlateRaceDescriptionsResponse,
  type GetCurrentPlateRaceDescriptionResponse,
  type GetStatesSeenResponse,
  type MarkStateSeenResponse,
  type MarkCapitolSeenResponse,
  type UnmarkStateSeenResponse,
  type UnmarkCapitolSeenResponse,
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
  occurrenceType: AnxietyEventOccurrenceType;
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

interface CreatePlateRaceByUserIdParams {
  body: CreatePlateRaceByUserIdRequestBody;
}

interface MarkPlateSeenParams {
  plateRaceId: string;
  stateId: number;
}

interface UnmarkPlateSeenParams {
  plateRaceId: string;
  stateId: number;
}

interface CompletePlateRaceParams {
  plateRaceId: string;
}

interface GetPlateRaceDataParams {
  plateRaceId: string;
  signal: AbortSignal;
}

interface GetCurrentPlateRaceDescriptionParams {
  signal: AbortSignal;
}

interface GetPastPlateRaceDescriptionsParams {
  signal: AbortSignal;
  pageParam: PlateRaceDescriptionsCursor | null;
}

interface GetStatesSeenParams {
  signal: AbortSignal;
}

interface MarkStateSeenParams {
  stateId: number;
}

interface MarkCapitolSeenParams {
  stateId: number;
}

interface UnmarkStateSeenParams {
  stateId: number;
}

interface UnmarkCapitolSeenParams {
  stateId: number;
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
  getAnxietyEventsById: async ({
    pageParam,
    status,
    signal,
    occurrenceType,
  }: GetAnxietyEventsParams) => {
    const params = new URLSearchParams({ limit: '5' });
    if (pageParam) {
      params.set('cursorDate', pageParam.date);
      params.set('cursorId', pageParam.id);
    }
    params.set('status', status);
    params.set('occurrenceType', occurrenceType);
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
  createPlateRaceByUserId: async ({ body }: CreatePlateRaceByUserIdParams) => {
    const response = await apiClient.post<SuccessResponse<CreatePlateRaceByUserIdResponse>>(
      `/plate-races`,
      body,
    );
    return response.data.data;
  },
  getPlateRaceData: async ({ plateRaceId, signal }: GetPlateRaceDataParams) => {
    const response = await apiClient.get<SuccessResponse<GetPlateRaceDataResponse>>(
      `/plate-races/${plateRaceId}`,
      {
        signal,
      },
    );
    return response.data.data;
  },

  markPlateSeen: async ({ stateId, plateRaceId }: MarkPlateSeenParams) => {
    const response = await apiClient.post<SuccessResponse<MarkPlateSeenResponse>>(
      `/plate-races/${plateRaceId}/seen-plates/`,
      {
        stateId,
      },
    );
    return response.data.data;
  },

  unmarkPlateSeen: async ({ stateId, plateRaceId }: UnmarkPlateSeenParams) => {
    const response = await apiClient.delete<SuccessResponse<UnmarkPlateSeenResponse>>(
      `/plate-races/${plateRaceId}/seen-plates/${stateId}`,
    );
    return response.data.data;
  },
  completePlateRace: async ({ plateRaceId }: CompletePlateRaceParams) => {
    const response = await apiClient.patch<
      SuccessResponse<CompletePlateRaceResponse>,
      AxiosResponse<SuccessResponse<CompletePlateRaceResponse>>
    >(`/plate-races/${plateRaceId}/complete`);
    return response.data.data;
  },
  getPastPlateRaceDescriptions: async ({
    pageParam,
    signal,
  }: GetPastPlateRaceDescriptionsParams) => {
    const params = new URLSearchParams({ limit: '5' });
    if (pageParam) {
      params.set('cursorDate', pageParam.date);
      params.set('cursorId', pageParam.id);
    }
    const response = await apiClient.get<SuccessResponse<GetPastPlateRaceDescriptionsResponse>>(
      `/plate-races/past?${params}`,
      { signal },
    );
    return response.data.data;
  },
  getCurrentPlateRaceDescription: async ({ signal }: GetCurrentPlateRaceDescriptionParams) => {
    const response = await apiClient.get<SuccessResponse<GetCurrentPlateRaceDescriptionResponse>>(
      '/plate-races/current',
      { signal },
    );
    return response.data.data;
  },
  getStatesSeen: async ({ signal }: GetStatesSeenParams) => {
    const response = await apiClient.get<SuccessResponse<GetStatesSeenResponse>>('/states/seen', {
      signal,
    });
    return response.data.data;
  },
  markStateSeen: async ({ stateId }: MarkStateSeenParams) => {
    const response = await apiClient.post<SuccessResponse<MarkStateSeenResponse>>('/states/seen', {
      stateId,
    });
    return response.data.data;
  },
  markCapitolSeen: async ({ stateId }: MarkCapitolSeenParams) => {
    const response = await apiClient.post<SuccessResponse<MarkCapitolSeenResponse>>(
      '/states/capitols/seen',
      {
        stateId,
      },
    );
    return response.data.data;
  },
  unmarkStateSeen: async ({ stateId }: UnmarkStateSeenParams) => {
    const response = await apiClient.delete<SuccessResponse<UnmarkStateSeenResponse>>(
      `/states/seen/${stateId}`,
    );
    return response.data.data;
  },
  unmarkCapitolSeen: async ({ stateId }: UnmarkCapitolSeenParams) => {
    const response = await apiClient.delete<SuccessResponse<UnmarkCapitolSeenResponse>>(
      `/states/capitols/seen/${stateId}`,
    );
    return response.data.data;
  },
};
